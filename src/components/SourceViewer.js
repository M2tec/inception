import React from 'react';
import Editor from "@monaco-editor/react";

import { heliosSyntax } from './HeliosSyntaxMonaco';
import { AppContext } from '../AppContext';

import useResizeObserver from "use-resize-observer";

const SourceViewer = (props) => {
  const { context, setContext } = React.useContext(AppContext)
  const [ manualHeight, setManualHeight] = React.useState(1)
  const [ manualWidth, setManualWidth] = React.useState(1)
  
  const viewType = context.dataItems[props.type]
  const openItem = viewType.items.find((item) => item.name === props.name);

  console.log(props.name)
  console.log(openItem)
  const data = openItem.data;

  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      // console.log("Observer height:\t" + height)
      // console.log("Window height:\t" + window.innerHeight)

      // Hack to manually calculate size from css values 
      // Height falls back to total height sometimes for some reason during resize
      setManualHeight( window.innerHeight - 56 - 32 )
      setManualWidth( width)
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
    let saveIndex = -1;
    const saveItem = viewType.items.find((item, index) => {
      const isStorageItem = item.name === props.name;
      if (isStorageItem)
        saveIndex = index;

      return isStorageItem;
    });

    let newItems = [...viewType.items]
    newItems[saveIndex].data = value

    // Store the temporary context in the browser local storage.
    // On a save event the context gets swapped. To save permanently.
    // See AppContext.js
    viewType.items = newItems
    
    let newDataItems = context.dataItems
    newDataItems[props.type] = viewType

    let tempContext = { ...context, dataItems: newDataItems}
    localStorage.setItem('tempContext', JSON.stringify(tempContext));
  }

  return (
    <div className='testing' ref={ref}>
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