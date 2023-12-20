import React from "react";
import SourceViewerReadOnly from "./SourceViewerReadOnly";
import SearchAppBar from './SearchAppBar';
import { useParams } from 'react-router-dom';
import GcSideBar from './GcSideBar';
import { AppContext } from '../AppContext';

import {
    PanelGroup,
    Panel,
} from 'react-resizable-panels';

const { encodings } = window.gc;

// let return_link1 = "http://localhost:3000/return-data/1-H4sIAAAAAAAAA11QTU8rMQz8Lzn3kDhfm94Q7_CQEFxAQkJPyGtnW2iz201SaLfqf3_bInHAt5mxx_acRDzshlyLWJ7E_UCbtz8xDRewncHz08ujWMrFFYjl60nshu07He9YLAUyioXAUmJ9wBR_mHGPfX2vx5mw8lri_G8hSsJcb4e-ZqR60Zy1Ul1kALBaa-u1cS4qYnaNVKpFllIrExrbKPHL4C-W9WxCMHdYhQ4btLbF2EHUrCW4IOcxNEDWxpZbz8rIiByVR6vlb7sb5hxLuf7A-a3GUtWUd-MhrBxDCPVrLQP5fuxsKZtwDBr8epNwKg0kqg4-A49fH7DX_JFxJVPsI1AKcbu3icdEU5gI8rQaPdmVG-2BepPFd7BPh3lvG6h10rCi-UqF3RwCBSM1YTRKgTatCrEjT-QbUiSdxM4Fb1zHAJpAnM_n_6NIvcTNAQAA"

export default function ReturnData() {
    const { context, setContext } = React.useContext(AppContext)
    const [data, setData] = React.useState("");
    let { scriptData } = useParams();

    React.useEffect(() => {
        async function decodeActionUrl(scriptData) {
            const resultObj = await encodings.msg.decoder(scriptData);
            setData(resultObj);
        }

        if (scriptData !== undefined){           
            decodeActionUrl(scriptData);
        }

    }, [scriptData])

    React.useEffect(() => {
        if (data === "") {
            console.log("No data")
            return
        }

        let time = new Date().toLocaleString();
        let newDataItem = { timeReceived:time, data:data }

        console.log({current:context.returnItems})

        let newItems = [newDataItem, ...context.returnItems]

        console.log({newItems:newItems})

        let tempContext = { ...context, returnItems: newItems }

        localStorage.setItem('tempContext', JSON.stringify(tempContext));

    }, [data, context])

    return (
        <div className="panel-group">
            <SearchAppBar />
            <PanelGroup direction="horizontal">
                <GcSideBar />
                <Panel>
                    <SourceViewerReadOnly className="source-browser"/>
                </Panel>
            </PanelGroup>
        </div>
    );
}