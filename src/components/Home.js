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
    

    // const [menuActive, setMenuActive] = React.useState("home");
    const [type, setType] = React.useState("source")

    let viewType = context.dataItems[type]
    const isActiveAGCScript = viewType.active && viewType.active.endsWith('.gcscript');

    function handleClickHome(e) {
        setType("source")
    }

    // Script construction
    function handleClickRun(e) {

        console.log("Deploy");

        // console.log(viewType.items);

        let activeScript = viewType.active
        // console.log(viewType.active)

        viewType.items.forEach(item => {
        
        const activeItem = viewType.items.find((item) => item.name === activeScript);
        console.log(activeItem)
        // let itemIndex = viewType.items.name.indexOf(activeScript)

            if (!item.name.endsWith('.gcscript')) {

                if (item.name.endsWith('.json')){
                    console.log(item.name)

                    let matchToken = "--" + item.name + "--"

                    activeItem.data.replace(matchToken, item.data)
                }


            }
            console.log(JSON.parse(activeItem.data))

        });

        


        // let contract = context.items[0].data;
        // let datum = context.items[1].data;
        // let redeemer = context.items[2].data;
        // let gc_script_template = context.items[3].data;

        // const Buffer = gc.utils.Buffer;
        // let contractHex = Buffer.from(contract).toString('hex')

        // let gc_compile = gc_script_template
        //     .replace("--contract.hl--", contractHex)
        //     .replace('"--datum.json--"', datum)
        //     .replace('"--redeemer.json--"', redeemer)

        // let gc_script = JSON.parse(gc_compile)
        // gc_script.returnURLPattern = window.location.origin + window.location.pathname + "return-data/{result}";

        // localStorage.setItem('gc_script', JSON.stringify(gc_script));

        // let url = window.location.origin + "/connect"

        // let sessionID = 1
        // let newwindow = window.open(url, "Gamechanger connect id: " + sessionID, 'height=875,width=755');

        // if (window.focus) { newwindow.focus() }
        // return false;
    }

    function handleClickData(e) {
        setType("returndata")
    }

    function handleClickPopup(e) {
        let url = window.location.origin;
        console.log(url)
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