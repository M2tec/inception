const logClasses={
    "log"       :"text-muted",
    "success"   :"text-success",
    "info"      :"text-info",
    "warning"   :"text-warning",
    "error"     :"text-danger",
}


const Console=({console,clearConsole})=>{
    const handleClear=(e)=>{
        e && e.preventDefault();
        clearConsole();
    }
    const filteredConsole=[...(console||[])];
    return(<div className="alert-warning">
            <button className="btn btn-sm btn-secondary m-2 position-absolute end-0" onClick={handleClear}>Clear</button>
            <div style={{height:"100%",overflowY:"scroll",overflowX:"auto"}} className="inner-shadowed p-3 bg-dark">
            {filteredConsole.map(({message,type,extra},index)=>{
                const key=`console_msg_${type}_${index}`
                const logClass=logClasses[type];

                try{
                    let text="";
                    if(typeof message==="string")
                        text=message;
                    else 
                        text=JSON.stringify(message,null,2);
                    const indexStr=filteredConsole.length-index;
                    const {                
                        type:msgType,
                        importTrace,
                        path,
                    }=extra||{};
                    const fileUri=importTrace?.length>0
                        ?importTrace[importTrace?.length-1]
                        :undefined;
                    const importTraceStr=importTrace
                        ?importTrace.map(x=>`\t${x}\n`)
                        :'';
                    return <div style={{fontSize:"0.7em"}} title={type} key={key} className={`p-0 m-0 bg-dark ${logClass}`}>
                        {<b>{indexStr}: {msgType||type}</b>}
                        <pre style={{fontSize:"1em"}} className="m-0">{text}</pre>
                        <div style={{fontSize:".8em"}} className="m-0">
                        {fileUri && <i >
                        <span>{"in"} <u>{fileUri}</u></span>
                            {path && <b>{" -> "}{path}</b>}
                        </i>}
                        {importTraceStr && <div >
                            <b>Trace:</b>
                            <pre>{importTraceStr}</pre>
                        </div>}
                        </div>
                    </div>
                }catch(err){
                    return <pre title={type} key={key} className={`p-0 m-0 bg-dark text-small ${logClasses["error"]}`}>{`console(): unable to serialize as JSON: ${err||"Unknown error"}`}</pre>;
                }
            })}
            </div>
            </div>
    )
}

export default Console;