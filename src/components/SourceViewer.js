import React from 'react';
import Editor from "@monaco-editor/react";
import { useResizeDetector } from 'react-resize-detector';
// import { data } from '../data/datum'
import { heliosSyntax } from './HeliosSyntaxMonaco';


const SourceViewer = (props) => {
    
    const editorRef = React.useRef(null);

    function handleEditorDidMount(editor, monaco) {
      // here is the editor instance
      // you can store it in `useRef` for further usage

      monaco.languages.register({id:'helios'})

      monaco.languages.setMonarchTokensProvider('helios', heliosSyntax)

      editorRef.current = editor;
    }

    const { width, height, ref } = useResizeDetector();
    // const [code,setCode]=useState(props.data);
    // const [errors,setErrors] = React.useState({});
    // // const handleEditorChange=(value, e)=>{
    // //   setCode(value);
    // // }

    // const  handleEditorValidation=(markers)=> {
    //     if(markers.length<=0){
    //       setErrors({...errors,code:errors.code || undefined})
    //       return;
    //     }
    //     // markers.forEach(marker => cfg.logger.warn("Playground validation:", marker.message));
    //     setErrors({...errors,code:markers[0].message})
    //   }

    return <div className="panel" ref={ref}>
            <Editor
              theme="vs-dark"
              width={width}
              height={height}
              language={props.data.type}
              //defaultLanguage="json"
              //defaultValue={code}
              value={props.data.data}
              // onValidate={handleEditorValidation}
              // onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              //onSubmit={onEditorSubmit}
            />
    </div>;
  };

  export default SourceViewer;