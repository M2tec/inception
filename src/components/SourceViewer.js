import React from 'react';
import Editor from "@monaco-editor/react";

import { heliosSyntax } from './HeliosSyntaxMonaco';
import { AppContext } from '../AppContext';

import useResizeObserver from "use-resize-observer";

const SourceViewer = (props) => {
  const { context, setContext } = React.useContext(AppContext)
  const [ manualHeight, setManualHeight] = React.useState(1)
  const [ manualWidth, setManualWidth] = React.useState(1)
  
  // const { ref, width = 1, height = 1 } = useResizeObserver();
  
  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      console.log("Observer height:\t" + height)// do something here.
      console.log("Window height:\t" + window.innerHeight)

      // Hack to manually calculate size from css values 
      // Height falls back to total height sometimes for some reason during resize
      setManualHeight( window.innerHeight - 56 - 32 )
      setManualWidth( width)

    },
  });

  const openItem = context.items.find((item) => item.name === props.name);
  const data = openItem.data;
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
    let saveIndex = -1;
    const saveItem = context.items.find((item, index) => {
      const isStorageItem = item.name === props.name;
      if (isStorageItem)
        saveIndex = index;

      return isStorageItem;
    });

    let newItems = [...context.items]
    newItems[saveIndex].data = value

    // Store the temporary context in the browser local storage.
    // On a save event the context gets swapped. To save permanently.
    // See AppContext.js
    let tempContext = { ...context, items: newItems }
    localStorage.setItem('tempContext', JSON.stringify(tempContext));
  }

  return (
    <div className='testing' ref={ref}>
      {/* {console.log("Editor: " + width + " x " + height)} */}
      <Editor
       theme="vs-dark"
       language={openItem.type}
       value={data}
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