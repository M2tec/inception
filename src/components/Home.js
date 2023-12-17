import React from "react";
import SourceBrowser from './SourceBrowser';
import GcSideBar from './GcSideBar';
import TabComponent from './TabComponent';
import SearchAppBar from './SearchAppBar';


import {
    PanelGroup,
    Panel,
    PanelResizeHandle
} from 'react-resizable-panels';

export default function Home() {
    return (
        <div className="panel-group">
                <SearchAppBar />

                <PanelGroup direction="horizontal">
                    <GcSideBar />

                    <Panel collapsible={true} collapsedSizePixels={35} minSizePercentage={10}>
                        <SourceBrowser className="source-browser" />
                    </Panel>

                    <PanelResizeHandle style={{ width: "8px" }} />

                    <Panel defaultSizePercentage={70}>
                        <TabComponent />
                    </Panel>

                </PanelGroup>
        </div>
    );
}