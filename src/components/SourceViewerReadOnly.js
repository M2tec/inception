import React from 'react';
import Editor from "@monaco-editor/react";
import { useResizeDetector } from 'react-resize-detector';
import { AppContext } from '../AppContext';

const SourceViewerReadOnly = () => {
  const { context, setContext } = React.useContext(AppContext)
  const data = JSON.stringify(context.returnItems, null, 4)

  // const openItem = context.returnItems.find((item) => item.name === props.name);
  const { width, height, refs } = useResizeDetector();

  return (
      <Editor className="panel" refs={refs}
        theme="vs-dark"
        width={width}
        height={height}
        language="json"
        value={data}
        options={{readOnly:true}}
      />
  )
};

export default SourceViewerReadOnly;