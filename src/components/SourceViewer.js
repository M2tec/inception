import React from 'react';
import Editor from "@monaco-editor/react";

import { heliosSyntax } from './HeliosSyntaxMonaco';
import { useAppState, useStateDispatch } from '../AppContext.js';
// import useResizeObserver from "use-resize-observer";

const SourceViewer = (props) => {
  const { theme } = useAppState();

  const element = React.useRef(null);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const [bodyHeight, setBodyHeight] = React.useState(0);

  let { files } = useAppState();
  const dispatch = useStateDispatch();

  const options = {
    autoIndent: 'full',
    contextmenu: true,
    fontFamily: 'monospace',
    fontSize: 20,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: 'always',
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };
  
  let fileList = files.filter((file) => file.id == props.id);
  let file = fileList[0]

  // Hack to get correct height for editor
  // For some reason the obeserver does not return the correct element heigth
  // Get the full body height and subtract het fixed elements 
  var ro = new ResizeObserver(entries => {
    for (let entry of entries) {
      const cr = entry.contentRect;
  
      console.log('Element:', entry.target);
      console.log(`Element size: ${cr.width}px x ${cr.height}px`);
      console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
      setBodyHeight(cr.height -95)
    }
  });
  
  // Observe one or multiple elements
  ro.observe(document.body);

  const observer = React.useMemo(
    () =>
      new ResizeObserver((entries) => {
        // console.log(entries[0].target.getBoundingClientRect().width - 1)
        setWidth(entries[0].target.getBoundingClientRect().width - 1);
        setHeight(entries[0].target.getBoundingClientRect().height - 30);
      }),
    []
  );

  const sizeRef = React.useCallback(
    (node) => {
      if (element !== null) {
        element.current = node;
        observer.observe(node);
      } else {
        observer.unobserve(element.current);
        element.current = null;
      }
    },
    [observer]
  );

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    monaco.languages.register({ id: 'helios' })
    monaco.languages.setMonarchTokensProvider('helios', heliosSyntax)
    // editorRef.current = editor;
  }

  function handleEditorChange(value, event) {
    // console.log('here is the current model value:', value);

    // dispatch({
    //   type: 'changed-data',
    //   file: {
    //     ...file,
    //     data: value
    //   }
    // });
  }

  return (
     <div className='DataView' ref={sizeRef}>
      <Editor
       theme={theme === "light" ? "light" : "vs-dark"}
       language={file.type}
       value={file.data}
       height={bodyHeight} 
       width={width}
       options={options}
      //  options={{readOnly: false}}
       onChange={handleEditorChange}
       onMount={handleEditorDidMount}
     /> 
    </div>
  )
};

export default SourceViewer;