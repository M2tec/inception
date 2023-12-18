import React from 'react';
import Editor from "@monaco-editor/react";
import { useResizeDetector } from 'react-resize-detector';
import { AppContext } from '../AppContext';

const SourceViewerReadOnly = (props) => {
  const { context, setContext } = React.useContext(AppContext)

  console.log(props.name)
  console.log(context.returnItems)

  const openItem = context.returnItems.find((item) => item.name === props.name);
  const data = openItem.data;

  console.log(props.readOnly)

  const { width, height, refs } = useResizeDetector();

  return (
      <Editor className="panel" refs={refs}
        theme="vs-dark"
        width={width}
        height={height}
        language={openItem.type}
        value={data}
        options={{readOnly:true}}
      />
  )
};

export default SourceViewerReadOnly;