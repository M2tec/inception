import React from "react";
import GcSideBar from './GcSideBar';
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
    const isActiveAGCScript = context.active && context.active.endsWith('.gcscript');

    const [menuActive, setMenuActive] = React.useState("home");
    const [type, setType] = React.useState("source")

    function handleClickHome(e) {
        // let url = window.location.origin;
        // console.log(url)
        // window.location.replace(url)
        setType("source")
    }

    // Script construction
    function handleClickRun(e) {

        console.log("Deploy");

        let contract = context.items[0].data;
        let datum = context.items[1].data;
        let redeemer = context.items[2].data;
        let gc_script_template = context.items[3].data;

        const Buffer = gc.utils.Buffer;
        let contractHex = Buffer.from(contract).toString('hex')

        let gc_compile = gc_script_template
            .replace("--contract.hl--", contractHex)
            .replace('"--datum.json--"', datum)
            .replace('"--redeemer.json--"', redeemer)

        let gc_script = JSON.parse(gc_compile)
        gc_script.returnURLPattern = window.location.origin + window.location.pathname + "return-data/{result}";

        localStorage.setItem('gc_script', JSON.stringify(gc_script));

        let url = window.location.origin + "/connect"

        let sessionID = 1
        let newwindow = window.open(url, "Gamechanger connect id: " + sessionID, 'height=875,width=755');

        if (window.focus) { newwindow.focus() }
        return false;

    }

    function handleClickData(e) {
        // let url = window.location.origin + window.location.pathname + "return-data";
        // console.log(url)
        // let testUrl = "http://localhost:3000/return-data/1-H4sIAAAAAAAAA11QTU8rMQz8Lzn3kDhfm94Q7_CQEFxAQkJPyGtnW2iz201SaLfqf3_bInHAt5mxx_acRDzshlyLWJ7E_UCbtz8xDRewncHz08ujWMrFFYjl60nshu07He9YLAUyioXAUmJ9wBR_mHGPfX2vx5mw8lri_G8hSsJcb4e-ZqR60Zy1Ul1kALBaa-u1cS4qYnaNVKpFllIrExrbKPHL4C-W9WxCMHdYhQ4btLbF2EHUrCW4IOcxNEDWxpZbz8rIiByVR6vlb7sb5hxLuf7A-a3GUtWUd-MhrBxDCPVrLQP5fuxsKZtwDBr8epNwKg0kqg4-A49fH7DX_JFxJVPsI1AKcbu3icdEU5gI8rQaPdmVG-2BepPFd7BPh3lvG6h10rCi-UqF3RwCBSM1YTRKgTatCrEjT-QbUiSdxM4Fb1zHAJpAnM_n_6NIvcTNAQAA"
        // window.location.replace(url)
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
                    <Button onClick={handleClickHome} variant="primary"><Files size={"20px"} /></Button>
                    <Button onClick={handleClickRun} disabled={!isActiveAGCScript} variant="primary"><PlayFill size={"20px"} /></Button>
                    <Button onClick={handleClickData} variant="primary"><ArrowReturnLeft size={"20px"} /></Button>
                    <Button onClick={handleClickPopup} variant="primary"><CloudUploadFill size={"20px"} /></Button>
                </div>
                {/* <GcSideBar /> */}
                <DataView type={type} />
            </div>
        </div>
    );
}