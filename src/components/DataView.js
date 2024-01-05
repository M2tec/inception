import React, { useEffect } from "react";
import SourceBrowser from './SourceBrowser';
import TabComponent from './TabComponent';


import {
  PanelGroup,
  Panel,
  PanelResizeHandle
} from 'react-resizable-panels';


export default function DataView(props) {
  // const { context, setContext } = React.useContext(AppContext)
  const [activeItem, setActiveItem] = React.useState("");

  // const viewType = context.dataItems[props.type]

  // useEffect(() => {
  //   setActiveItem(viewType.active)
  // }, [context]);

  const onCollapse = () => {
    console.log('collapse')
    // dispatch({ type: "toggleCollapsed", collapsed: false });
  };

  const onExpand = () => {
    console.log('expand')
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
          <SourceBrowser type={props.type} active={activeItem} />
        </Panel>

        <PanelResizeHandle style={{ width: "8px" }} />

        <Panel>
          <TabComponent type={props.type} active={activeItem} />
        </Panel>
      </PanelGroup>
    </div>
  );
}