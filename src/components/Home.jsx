import React from "react";
import SearchAppBar from './SearchAppBar';
import SideMenu from "./SideMenu";
import { useAppState, useStateDispatch } from '../AppContext';
import SourceBrowser from "./SourceBrowser";
import TabComponent from "./TabComponent";

import {
    PanelGroup,
    Panel,
    PanelResizeHandle,
} from 'react-resizable-panels';

import {
    XSquare
} from 'react-bootstrap-icons';

export default function Home() {
    const { theme, currentFileIndex } = useAppState();

    document.querySelector("body").setAttribute('data-theme', theme)

    return (
        <div className="Home">
            <SearchAppBar />
            <div className="View">
                <SideMenu />
                <PanelGroup direction="horizontal">
                    <Panel>
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

    function handleClose() {
        dispatch({
            type: 'ad-visibility',
        });
    }
    return (<>
        {advertisement === true ?
            <div className="advertisement">

                <a href="https://cardano.ideascale.com/c/idea/120115">
                <img src="https://raw.githubusercontent.com/GameChangerFinance/gamechanger.wallet/main/catalyst/img/fund12/inception.jpg" 
                     alt="Gamechanger: Inception IDE" 
                     height="100px"
                    />
                </a>

                <XSquare className="advertisement-close"
                    onClick={(e) => handleClose()}
                    size={20} />
            </div>
            :
            null}
    </>)
}

