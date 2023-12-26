import React from "react";
import SearchAppBar from './SearchAppBar';
import DataView from "./DataView";
import {
    Files,
    PlayFill,
    CloudUploadFill,
    ArrowReturnLeft,
} from 'react-bootstrap-icons';
import { AppContext } from '../AppContext';
import Button from 'react-bootstrap/Button';

const gc = window.gc;

export default function Home() {
    const { context, setContext } = React.useContext(AppContext)
    const [type, setType] = React.useState("source")

    let viewType = context.dataItems[type]
    const isActiveAGCScript = viewType.active && viewType.active.endsWith('.gcscript');


    const stateKey = "gc_return_data"
    const d = ''
    const [state, setState] = React.useState(d)
    const isNewSession = React.useRef(true)


    React.useEffect(() => {
        if (isNewSession.current) {
            const currentState = localStorage.getItem(stateKey)
            if (currentState) {
                setState(JSON.parse(currentState))
            } else {
                setState(d)
            }
            isNewSession.current = false
            return
        }
        try {
            localStorage.setItem(stateKey, JSON.stringify(state))
        } catch (error) { }
    }, [state, stateKey, d])

    React.useEffect(() => {
        const onReceieveMessage = (e) => {
            console.log("data received")

            const tempContextTxt = localStorage.getItem('tempContext');
            let tempContext = JSON.parse(tempContextTxt)
    
            if (tempContextTxt !== null) {
                localStorage.setItem('gcide', tempContextTxt);
            }

            setContext(oldContext => {  
                viewType = tempContext.dataItems.returndata
                // console.log(viewType)

                let latestItem = viewType.items[0].name
                viewType.active = latestItem                
                viewType.openItems = [latestItem]

                let newDataItems = tempContext.dataItems
                newDataItems.returndata = viewType
                console.log(newDataItems)


                return { ...tempContext, dataItems:newDataItems }
            })

            // setContext(oldContext => {
            //     viewType = oldContext.dataItems.returndata
            //     console.log(viewType)

            //     let latestItem = viewType.items[0].name
            //     viewType.active = latestItem                
            //     viewType.openItems = [latestItem]

            //     let newDataItems = oldContext.dataItems
            //     newDataItems.returndata = viewType
            //     console.log(newDataItems)
    
            //     return { ...oldContext, dataItems:newDataItems }
            // })


            handleClickData(e)

            const { key, newValue } = e
            if (key === stateKey) {
                setState(JSON.parse(newValue))
            }
        }
        window.addEventListener('storage', onReceieveMessage)
        return () => window.removeEventListener('storage', onReceieveMessage)
    }, [stateKey, setState])


    function handleClickHome(e) {
        setType("source")
    }

    // Script construction
    function handleClickRun(e) {

        console.log("Deploy");

        // console.log(viewType.items);

        let activeScript = viewType.active
        // console.log(viewType.active)
        const activeItem = viewType.items.find((item) => item.name === activeScript);
        // console.log(activeItem)

        let gc_compile = activeItem.data

        viewType.items.forEach(item => {

            if (!item.name.endsWith('.gcscript')) {

                if (item.name.endsWith('.json')) {
                    // console.log(item.name)

                    let matchToken = '"--' + item.name + '--"'
                    // console.log("Token: " + matchToken)

                    gc_compile = gc_compile.replace(matchToken, item.data)
                    // console.log(gc_compile)
                }

                if (item.name.endsWith('.hl')) {
                    // console.log(item.name)

                    const Buffer = gc.utils.Buffer;
                    let contractHex = Buffer.from(item.data).toString('hex')

                    let matchToken = '--' + item.name + '--'
                    // console.log("Token: " + matchToken)

                    gc_compile = gc_compile.replace(matchToken, contractHex)
                }
            }

        });

        let gc_script = JSON.parse(gc_compile)
        gc_script.returnURLPattern = window.location.origin + window.location.pathname + "connect/{result}";

        localStorage.setItem('gc_script', JSON.stringify(gc_script));

        let url = window.location.origin + "/connect"

        let newwindow = window.open(url, "Gamechanger connect", 'height=875,width=755');

        if (window.focus) { newwindow.focus() }
        return false;
    }

    function handleClickData(e) {
        setType("returndata")
    }

    function handleClickPopup(e) {
        let url = window.location.origin;
        // console.log(url)
        window.location.replace(url)
    }

    return (
        <div className="Home">
            <SearchAppBar />

            <div className="View">

                <div className='GcSideBar'>
                    <Button
                        className={type === "source" ? "btn-active" : ""}
                        onClick={handleClickHome}
                        variant="primary">
                        <Files size={"20px"} />
                    </Button>

                    <Button
                        onClick={handleClickRun}
                        disabled={!isActiveAGCScript}
                        variant="primary">
                        <PlayFill size={"20px"} />
                    </Button>

                    <Button
                        className={type === "returndata" ? "btn-active" : ""}
                        onClick={handleClickData}
                        variant="primary">
                        <ArrowReturnLeft size={"20px"} />
                    </Button>

                    <Button
                        onClick={handleClickPopup}
                        variant="primary">
                        <CloudUploadFill size={"20px"} />
                    </Button>

                </div>
                {/* <GcSideBar /> */}
                <DataView type={type} />
            </div>
        </div>
    );
}

