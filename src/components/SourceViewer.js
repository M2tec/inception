import React from 'react';
import Editor from "@monaco-editor/react";
import { useResizeDetector } from 'react-resize-detector';
// import { data } from '../data/datum'
import { heliosSyntax } from './HeliosSyntaxMonaco';
import { AppContext } from '../AppContext';

const SourceViewer = (props) => {
  const { context, setContext } = React.useContext(AppContext)

  const openItem = context.items.find((item) => item.name === props.name);

  const data = openItem.data;

  const editorRef = React.useRef(null);

  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    monaco.languages.register({ id: 'helios' })
    monaco.languages.setMonarchTokensProvider('helios', heliosSyntax)
    editorRef.current = editor;
  }

  const { width, height, ref } = useResizeDetector();

  function handleEditorChange(value, event) {
    // console.log('here is the current model value:', value);

    // let tempStorage = { name: props.name, data: value }

    console.log(props.name)


    let saveIndex = -1;
    const saveItem = context.items.find((item, index) => {
      const isStorageItem = item.name == props.name;
      if (isStorageItem)
        saveIndex = index;

      return isStorageItem;
    });

    console.log(saveIndex)
    console.log(saveItem)

    let newItems = [...context.items]


    newItems[saveIndex].data = value
    console.log(newItems[saveIndex].data)

    let tempContext = {...context, items:newItems}

    // let oldItems = { ...newContext.items }
    // oldItems[saveIndex].data = filedata.data

    //     let newContext2 = {...newContext, items:oldItems}
    //     console.log(newContext2.items[saveIndex].data)
    //     console.log(newContext.items[saveIndex].data)
    localStorage.setItem('tempContext', JSON.stringify(tempContext));

  }

  return <div className="panel" ref={ref}>

    <Editor
      theme="vs-dark"
      width={width}
      height={height}
      language={openItem.type}
      value={data}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
  </div>;
};

export default SourceViewer;