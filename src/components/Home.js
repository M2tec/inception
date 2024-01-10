import React from "react";
import SearchAppBar from './SearchAppBar';
import SideMenu from "./SideMenu";
import { useAppState } from '../AppContext.js';
import SourceBrowser from "./SourceBrowser.js";
import TabComponent from "./TabComponent.js";

import {
    PanelGroup,
    Panel,
    PanelResizeHandle
  } from 'react-resizable-panels';

export default function Home() {
    const { theme } = useAppState();

    document.querySelector("body").setAttribute('data-theme', theme)

    return (
        <div className="Home">
            <SearchAppBar />
            <div className="View">
                <SideMenu />

                <PanelGroup autoSaveId="example" direction="horizontal">
                    <Panel defaultSizePercentage={25}>
                        <SourceBrowser />
                    </Panel>
                    <PanelResizeHandle style={{ width: "8px" }}/>
                    <Panel defaultSizePercentage={75}>
                        <TabComponent />
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}
