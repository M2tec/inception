export const dataEncoders=['string','json','base64','hex'];

export const isArray=(maybeArray)=>Array.isArray(maybeArray);

//Based on GC function: 
//export const toSortedTaggedArray=(maybeArray:Array<any>|{[tag:string]:any},options?:any):Array<{key:string,value:any}>=>{
export const toKVList=(maybeArray,options)=>{
    const sort=options?.sort;
    let res=[];
    if(!maybeArray)
        return res;
    if(isArray(maybeArray)){ //is Array.isArray() failing on some iterables?
        //no sorting needed, as order is inferred from natural array order
        res = maybeArray.map((item,index)=>([String(index),item]))
    } else {
        // require sorting by keys
        let keys=Object.keys(maybeArray)||[];
        // check if all keys are numeric
        const numericKeys=keys.every( (key)=>!isNaN(parseInt(key)) )
        if(sort){
            if(numericKeys)
                keys=keys.sort((a,b)=>parseInt(a)-parseInt(b))
            else 
                keys=keys.sort();
        }
        res = keys.map((key,index)=>([String(key),maybeArray[key]]));
    }
    return res;    
}

export const kvList2Array=(kvMap)=>{
    // sorted by key, all keys must be numbers
    const sortedKvMap=kvMap.sort(([aKey,aValue],[bKey,bValue])=>
        //numerically
        parseInt(aKey)-parseInt(bKey)
        //alphabetically
        //(aKey < bKey) ? -1 : (aKey > bKey) ? 1 : 0
    )
    return sortedKvMap.map(([key,value])=>value);
}
export const kvList2Object=(kvMap)=>{
    return Object.fromEntries(kvMap.map(([key,value])=>[key,value]));
}

export const gcScriptWalker=async ({code, onNode, maxLevel,maxChildren})=>{
    const rootPath="/";
    const isParentNode  =(node)=>node?.type==="script" && node?.run!==undefined;
    const getChildren   =(node)=>node?.run;
    const walker=async ({node,key,index,path})=>{      
        // console.log({node,key,index,path});  
        const solvedNode=await onNode({
            node,
            index,
            key,
            path,
        });

        if(isParentNode(solvedNode)){

            const children=getChildren(solvedNode)||[];
            const kvMap=toKVList(children);
            const solvedKvMap=[];
            for (let childIndex = 0; childIndex < kvMap.length; childIndex++) {
                // console.log({children,kvMap,solvedKvMap,childIndex});
                const [childKey,childNode] = kvMap[childIndex];
                const solvedChild = await walker({
                    node:childNode,
                    index:childIndex,
                    key:childKey,
                    path:[...path,childKey],
                });
                solvedKvMap.push([childKey,solvedChild])
            }
            return Promise.resolve({
                ...solvedNode,
                run:isArray(children)//if children was array, 
                    ?kvList2Array(solvedKvMap)//lets return results as array
                    :kvList2Object(solvedKvMap)//otherwise as an object
            });

        }else{
            return Promise.resolve(solvedNode);
        }
    }
    const processedNode=await walker({
        node:code,
        key:rootPath,
        index:0,
        path:[rootPath]
    });
    return processedNode;
}
export const getResource=async (fileURI,options)=>{
    const Buffer = window.gc.utils.Buffer;
    const {files}=options||{};
    const file=[...(files||[])].find(file=>`ide://${file?.name||""}`===fileURI);
    if(file?.data!==undefined)
        return Promise.resolve(Buffer.from(file.data||""));
    else 
        throw new Error(`Resource '${fileURI}' not found`);
}
export const getBufferAs=async (fileBuff,as)=>{
    if(as==="string")
        return Promise.resolve(fileBuff.toString('utf8'))
    if(as==="json")
        return Promise.resolve(JSON.parse(fileBuff.toString('utf8')))
    if(as==="hex")
        return Promise.resolve(fileBuff.toString('hex'))
    if(as==="base64")
        return Promise.resolve(fileBuff.toString('base64'))
    throw new Error(`Unknown encoding provided '${as||""}'. (must be one of '${dataEncoders.join(', ')}') `);
}

export const path2Str=(path)=>[...(path||[])].join('/');

const macroHandlers={
    "$importAsScript":async({node,path,key,index,context})=>{
        const {type,args,argsByKey,from,...props}=node||{};
        const {files}=context||{};
        const kvFrom     =toKVList(from);
        const kvArgsByKey=toKVList(argsByKey);

        if(!kvFrom?.length>0)
            throw new Error(`At least one valid resource URI must be provided in 'from' list/map in '${type}'`);
        if(argsByKey!==undefined && !kvArgsByKey?.length>0)
            throw new Error(`At least one argument must be provided in 'argsByKey' list/map in '${type}' `);
        if(args && kvArgsByKey.length>0)
            throw new Error(`Only one argument passing method must be used. You provided 'args' and 'argsByKey' in '${type}' `);

        const fromKeysDict={};
        for (let index = 0; index < kvFrom.length; index++) {
            const [key,fileUri] = kvFrom[index];
            const fileBuff  =await getResource(fileUri,{files});
            const solvedData=await getBufferAs(fileBuff,"json");
            //TODO: consider cleanning imported scripts to remove root-only script properties like returnURLPattern to avoid errors
            //      reasons not to do so could be to let devs use this to restrict code destination/reusability
            //      probably a flag for enabling this would be wise
            kvFrom[index]=[key,solvedData];
            fromKeysDict[key]=fileUri;
        }            
        for (let index = 0; index < kvArgsByKey.length; index++) {
            const [key,arg] = kvFrom[index];
            if(!fromKeysDict[key])
                throw new Error(`Argument provided in 'argsByKey' for an unknown resource key '${key}' in '${type}'`)
        }
        
        const solvedFrom=isArray(from)
            ?kvList2Array(kvFrom)
            :kvList2Object(kvFrom);    
                
        const newNode={
            ...props, // allow to pass props directly into transpiled type
            type:"script",
            run:solvedFrom,
        };

        if(args)
            newNode.args=args;
        if(argsByKey)
            newNode.argsByKey=argsByKey;

        return Promise.resolve(newNode);
    },
    "$importAsData":async({node,path,key,index,context})=>{
        const {type,as,from,...props}=node||{};
        const {files}=context||{};
        const kvFrom=toKVList(from);

        if(!dataEncoders.includes(as))
            throw new Error(`Missing encoder in 'as' value in '${type}' (must be one of '${dataEncoders.join(', ')}')`);
        if(!kvFrom?.length>0)
            throw new Error(`At least one valid resource URI must be provided in 'from' list/map in '${type}'`);

        for (let index = 0; index < kvFrom.length; index++) {
            const [key,fileUri] = kvFrom[index];
            const fileBuff  =await getResource(fileUri,{files});
            const solvedData=await getBufferAs(fileBuff,as);
            kvFrom[index]=[key,solvedData];
        }           
        const solvedFrom=isArray(from)
            ?kvList2Array(kvFrom)
            :kvList2Object(kvFrom);            
        return Promise.resolve({
            ...props, // allow to pass props directly into transpiled type. Currently this case would trigger wallet-side validation errors
            type:"data",
            value:solvedFrom,
        });

    },
};

export const transpile = async ({
    mainFileName, //main gcscript file
    files,
})=>{
    const fileUri   =`ide://${mainFileName||""}`
    const fileBuff  =await getResource(fileUri,{files});
    const code      =await getBufferAs(fileBuff,'json');
    const transpiled=await gcScriptWalker({
        code,
        onNode:async({node,path,key,index})=>{
            const pathStr=path.join('/');
            const {type}=node||{};
            const context={files,mainFileName};
            //console.log(`${pathStr} = `,{node,context});
            if(macroHandlers[type]){
                try{
                    return await macroHandlers[type]({node,path,key,index,context});
                }catch(err){
                    throw new Error(`MacroError: ${err?.message||"unknown"} [${path2Str(path)}]`)
                }
            }
            return Promise.resolve(node);
        }
    });
    return transpiled;
}