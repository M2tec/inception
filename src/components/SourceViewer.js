import React from 'react';
import Editor from "@monaco-editor/react";

import { heliosSyntax } from './HeliosSyntaxMonaco';
import { AppContext } from '../AppContext';

import useResizeObserver from "use-resize-observer";

import _debounce from 'lodash/debounce';

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}


const SourceViewer = (props) => {
  const { context, setContext } = React.useContext(AppContext)
  const [ height1, setHeight1] = React.useState(1)
  const [ width1, setWidth1] = React.useState(1)
  
  // const { ref, width = 1, height = 1 } = useResizeObserver();
  
  const { ref } = useResizeObserver({
    onResize: ({ width, height }) => {
      console.log(height)// do something here.
      setHeight1(height)
      setWidth1(width)
      // const debounceFn = React.useCallback(_debounce(setHeight1(height), 1000), []);
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
      {console.log("Height1: " + height1)}
      <Editor
       theme="vs-dark"
       language={openItem.type}
       value={data}
      //  width={Math.floor(width - 2)}
      //  height={Math.floor(height - 2)}
      //  width={width}
       height={height1} 
       width={width1}
      //  height={600}
       options={{readOnly: false}}
       onChange={handleEditorChange}
       onMount={handleEditorDidMount}
     /> 
    </div>
  )
};

export default SourceViewer;