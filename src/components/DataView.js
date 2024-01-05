import React, { useEffect } from "react";
import SourceBrowser from './SourceBrowser';
import TabComponent from './TabComponent';


import {
  PanelGroup,
  Panel,
  PanelResizeHandle
} from 'react-resizable-panels';


export default function DataView(props) {
  
  const onCollapse = () => {
    console.log('collapse')
    // dispatch({ type: "toggleCollapsed", collapsed: false });
  };

  const onExpand = () => {
    // console.log('expand')
    // dispatch({ type: "toggleCollapsed", collapsed: true });
  };

  return (
    <div className="DataView">
      <PanelGroup direction="horizontal">
        <Panel
          collapsedSize={15}
          collapsible={true}
          defaultSize={50}
          maxSize={5}
          minSize={30}
          onCollapse={onCollapse}
          onExpand={onExpand}
        >
          <SourceBrowser/>
        </Panel>

        <PanelResizeHandle style={{ width: "8px" }} />

        <Panel>
          <TabComponent/>
        </Panel>
      </PanelGroup>
    </div>
  );
}