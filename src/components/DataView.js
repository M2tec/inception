import React, { useEffect } from "react";
import SourceBrowser from './SourceBrowser';
import TabComponent from './TabComponent';
import Button from 'react-bootstrap/Button';
import { useAppState, useStateDispatch } from '../AppContext.js';
import SourceViewer from "./SourceViewer.js";
import {
  Files,
  PlayFill,
  CloudUploadFill,
  ArrowReturnLeft,
} from 'react-bootstrap-icons';

import {
  PanelGroup,
  Panel,
  PanelResizeHandle
} from 'react-resizable-panels';


export default function DataView(props) {
  const dispatch = useStateDispatch();

  const onCollapse = () => {
    console.log('collapse')
    // dispatch({ type: "toggleCollapsed", collapsed: false });
  };

  const onExpand = () => {
    // console.log('expand')
    // dispatch({ type: "toggleCollapsed", collapsed: true });
  };


  return (<>

      <div className="no-overflow">
        <Button
          onClick={(e) => {
            dispatch({
              type: 'menu-change',
              id: "files"
            });
          }}
          variant="primary">
          <Files size={"20px"} />
        </Button>

        <Button
          variant="primary">
          <PlayFill size={"20px"} />
        </Button>

        <Button
          onClick={(e) => {
            dispatch({
              type: 'menu-change',
              id: "returndata"
            });
          }}

          variant="primary">
          <ArrowReturnLeft size={"20px"} />
        </Button>

        <Button
          variant="primary">
          <CloudUploadFill size={"20px"} />
        </Button>
      </div>
      <div id="source-viewer" className="TabContainer">
      <SourceViewer /> 
      </div>
    
    </>
  );
}

// return (
// <PanelGroup direction="horizontal">
// <Panel
//   Size={50}
//   minSize={50}
// >
//   <Button
//     onClick={(e) => {
//       dispatch({
//         type: 'menu-change',
//         id: "files"
//       });
//     }}
//     variant="primary">
//     <Files size={"20px"} />
//   </Button>

//   <Button
//     variant="primary">
//     <PlayFill size={"20px"} />
//   </Button>

//   <Button
//     onClick={(e) => {
//       dispatch({
//         type: 'menu-change',
//         id: "returndata"
//       });
//     }}

//     variant="primary">
//     <ArrowReturnLeft size={"20px"} />
//   </Button>

//   <Button
//     variant="primary">
//     <CloudUploadFill size={"20px"} />
//   </Button>


// </Panel>

// <Panel
//   collapsedSize={15}
//   collapsible={true}
//   defaultSize={50}
//   maxSize={5}
//   minSize={30}
//   onCollapse={onCollapse}
//   onExpand={onExpand}
// >
//   <SourceBrowser />
// </Panel>

// <PanelResizeHandle style={{ width: "8px" }} />

// <Panel>
//   <TabComponent />
// </Panel>
// </PanelGroup>
//   );
// }