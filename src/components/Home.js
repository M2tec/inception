import React from "react";
import SearchAppBar from './SearchAppBar';
import SideMenu from "./SideMenu";
import { useAppState, useStateDispatch } from '../AppContext.js';
import SourceBrowser from "./SourceBrowser.js";
import TabComponent from "./TabComponent.js";

import {
    PanelGroup,
    Panel,
    PanelResizeHandle,
} from 'react-resizable-panels';

import {
    XSquare
  } from 'react-bootstrap-icons';

export default function Home() {
    const { theme } = useAppState();

    document.querySelector("body").setAttribute('data-theme', theme)

    return (
        <div className="Home">
            <SearchAppBar />
            <div className="View">
                <SideMenu />

                <PanelGroup direction="horizontal">

                    <Panel defaultSizePercentage={35}>
                        <SourceBrowser />
                    </Panel>
                    <PanelResizeHandle style={{ width: "8px" }} />
                    <Panel>
                        <TabComponent />
                    </Panel>
                </PanelGroup>
            </div>
            <Advertisement />

        </div>
    );
}

function Advertisement() {
    const { advertisement } = useAppState();
    const dispatch = useStateDispatch();


    function handleClose () {
        dispatch({
            type: 'ad-visibility',
          });
    }
    return (<>
        {advertisement === true ?
            <div className="advertisement">
                <a href="https://cardano.ideascale.com/c/idea/112215" rel="nofollow" data-target="animated-image.originalLink">
                    <img src="gc-pbl.gif"
                        alt="Andamio - Gamechanger Helios dAPP and application backend course"
                        data-target="animated-image.originalImage" />
                </a>
           
        <XSquare className="advertisement-close"
        onClick={(e) => handleClose()}
        size={20} />
         </div>
            :
            null}
    </>)
}
