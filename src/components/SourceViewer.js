import { useState } from 'react';
import Editor from "@monaco-editor/react";
import { useResizeDetector } from 'react-resize-detector';
// import { data } from '../data/datum'

const SourceViewer = () => {
    const { width, height, ref } = useResizeDetector();
    const [code,setCode]=useState("testing\n\n\n");
    const [errors,setErrors]=useState({});
    const handleEditorChange=(value, e)=>{
      setCode(value);
    }

    const  handleEditorValidation=(markers)=> {
        if(markers.length<=0){
          setErrors({...errors,code:errors.code || undefined})
          return;
        }
        // markers.forEach(marker => cfg.logger.warn("Playground validation:", marker.message));
        setErrors({...errors,code:markers[0].message})
      }

    // handleEditorChange(data);

    return <div className="editor" ref={ref}>
              {/* {`dimensions = ${width}x${height}`} */}
              <Editor
                theme="vs-dark"
                width={width}
                height={height}
                language="json"
                //defaultLanguage="json"
                //defaultValue={code}
                value={code}
                onValidate={handleEditorValidation}
                onChange={handleEditorChange}
                //onMount={handleEditorMount}
                //onSubmit={onEditorSubmit}
              />
    </div>;
  };

  export default SourceViewer;