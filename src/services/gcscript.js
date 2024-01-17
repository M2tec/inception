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

export const getFileAs=async (fileStr,as)=>{
    const Buffer = window.gc.utils.Buffer;
    if(as==="string")
        return Promise.resolve(fileStr)
    if(as==="json")
        return Promise.resolve(JSON.parse(fileStr))
    if(as==="hex")
        return Promise.resolve(Buffer.from(fileStr).toString("hex"))
    if(as==="base64")
        return Promise.resolve(Buffer.from(fileStr).toString("base64"))
    throw new Error('Missing valid output encoding on "as" property');
}

const macroHandlers={
    "$importAsScript":async({node,path,key,index,context})=>{
        const {type,args,argsByKey,from}=node||{};
        const {files}=context||{};
        const newNode={...node};
        throw new Error("Not implemented yet")
    },
    "$importAsData":async({node,path,key,index,context})=>{
        const {type,toType,as,from}=node||{};
        const {files}=context||{};
        if(toType==="data"){
            const kvFrom=toKVList(from);
            for (let index = 0; index < kvFrom.length; index++) {
                const [key,fileUri] = kvFrom[index];
                const file=files.find(file=>`ide://${file?.name||""}`===fileUri);
                const data=file?.data;
                const solvedData=await getFileAs(data,as);
                kvFrom[index]=[key,solvedData];
            }           
            const solvedFrom=isArray(from)
                ?kvList2Array(kvFrom)
                :kvList2Object(kvFrom);
            return Promise.resolve({
                type:toType,
                value:solvedFrom,
            });
        }else
        if(toType==="macro"){
            throw new Error("Not implemented yet")
        }

        throw new Error('Missing a valid "toType" property')
    },
};

export const transpile = async ({
    mainFileName, //main gcscript file
    files,
})=>{
    const mainFile=files.find(file=>file?.name===mainFileName);
    const code=JSON.parse(mainFile?.data||{});
    const transpiled=await gcScriptWalker({
        code,
        onNode:async({node,path,key,index})=>{
            const pathStr=path.join('/');
            const {type}=node||{};
            const context={files,mainFileName};
            //console.log(`${pathStr} = `,{node,context});
            if(macroHandlers[type])
                return await macroHandlers[type]({node,path,key,index,context});
            return Promise.resolve(node);
        }
    });
    return transpiled;
}