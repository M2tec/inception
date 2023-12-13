import React from 'react';
import Editor from "@monaco-editor/react";
import { useResizeDetector } from 'react-resize-detector';
// import { data } from '../data/datum'
import { heliosSyntax } from './HeliosSyntaxMonaco';
import { AppContext } from '../AppContext';

const SourceViewer = (props) => {
  const { context, setContext } = React.useContext(AppContext)

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
    console.log('here is the current model value:', value);
    setContext(oldContext => {
      let openIndex = -1;
      const openItem = context.items.find((item, index) => {
        const isOpen = item.name === props.name
        if (isOpen)
          openIndex = index;
        return isOpen;
      });
      const { items } = oldContext;
      items[openIndex].data = value
      return { ...oldContext, items };
    });
  }

    const openItem = context.items.find((item) => item.name === props.name);
    const data = openItem.data;

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