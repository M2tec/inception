import React, { useEffect } from "react";
import SourceBrowser from './SourceBrowser';
import TabComponent from './TabComponent';
import { AppContext } from '../AppContext';

import {
    PanelGroup,
    Panel,
    PanelResizeHandle
} from 'react-resizable-panels';
import { set } from "lodash";

export default function DataView(props) {
    const { context, setContext } = React.useContext(AppContext)
    const [activeItem, setActiveItem] = React.useState("");

    const viewType = context.dataItems[props.type]

    useEffect(() => {
        // console.log("setActiveItem: " + viewType.active)
        setActiveItem(viewType.active)
      }, [context]);

    return (
        <div className="DataView">
        <PanelGroup direction="horizontal">
            <Panel collapsible={true} collapsedSizePixels={35} minSizePercentage={10}>
                <SourceBrowser type={props.type} active={activeItem} />
            </Panel>

            <PanelResizeHandle style={{ width: "8px" }} />

            <Panel defaultSizePercentage={70}>
                <TabComponent type={props.type} active={activeItem} />
            </Panel>
          </PanelGroup>
        {/* <SourceViewer name="contract.hl" readOnly={false} /> */}
        </div>
    );
}