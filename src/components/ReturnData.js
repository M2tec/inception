import React from "react";
import SourceViewer from "./SourceViewer";
import SearchAppBar from './SearchAppBar';
import { useParams } from 'react-router-dom';

import {
    PanelGroup,
    Panel,
} from 'react-resizable-panels';


export default function ReturnData() {
    let { scriptData } = useParams();
    console.log("Return data: " + scriptData)

    return (
        <div className="panel-group">
            <SearchAppBar />
            <PanelGroup direction="horizontal">
                <Panel>
                    {/* <SourceViewer className="source-browser" /> */}
                    <div>{scriptData}</div>
                </Panel>
            </PanelGroup>
        </div>
    );
}