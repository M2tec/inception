import React from 'react';
import Editor from "@monaco-editor/react";

import { heliosSyntax } from './HeliosSyntaxMonaco';
import { useFiles } from '../AppContext.js';
import useResizeObserver from "use-resize-observer";

const SourceViewer = (props) => {
  const { theme } = useFiles();

  let file = props.file

  const [ manualHeight, setManualHeight] = React.useState(1);
  const [ manualWidth, setManualWidth] = React.useState(1);

  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      // console.log("Observer height:\t" + height)
      // console.log("Window height:\t" + window.innerHeight)

      // Hack to manually calculate size from css values 
      // Height falls back to total height sometimes for some reason during resize
      setManualHeight( height - 35)
      setManualWidth( width -3)
    },
  });

  // const editorRef = React.useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    monaco.languages.register({ id: 'helios' })
    monaco.languages.setMonarchTokensProvider('helios', heliosSyntax)
    // editorRef.current = editor;
  }

  function handleEditorChange(value, event) {
    // console.log('here is the current model value:', value);
  }

  return (
    <div className='DataView' ref={ref}>
      <Editor
       theme={theme === "light" ? "light" : "vs-dark"}
       language={file.type}
       value={file.data}
       height={manualHeight} 
       width={manualWidth}
       options={{readOnly: false}}
       onChange={handleEditorChange}
       onMount={handleEditorDidMount}
     /> 
    </div>
  )
};

export default SourceViewer;