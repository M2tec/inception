import React from "react";
import Button from 'react-bootstrap/Button';
import { useAppState, useStateDispatch } from '../AppContext.js';
import { GcConnect } from "./GameChangerAPI.js";

import {
  Files,
  PlayFill,
  CloudUploadFill,
  Download
} from 'react-bootstrap-icons';
import { transpile } from "../services/gcscript.js";

const gc = window.gc;

export default function SideView(props) {
  let { files, currentFileIndex } = useAppState();
  const dispatch = useStateDispatch();

  console.log({files:files})
  let fileList = files.filter((file) => file.id === currentFileIndex)
  let file = fileList[0]

  let isActiveAGCScript = false;
  if (file !== undefined) {
    isActiveAGCScript = file.name.endsWith('.gcscript');
  }

  // Detect when data is returned to master app 
  // by listening for localstorage event. 
  window.addEventListener("storage", () => {
    const data = (window.localStorage.getItem("DataIsHere"))
    console.log("Eventlistener: " + data);
    if (data !== '') {
      dispatch({
        type: 'load-from-storage',
      });
      window.localStorage.setItem("DataIsHere", "")
    }
  })


  async function handleClickRun(e) {

    console.log("Deploy");
    let gc_compile = file.data

    files.forEach(item => {

      if (!item.name.endsWith('.gcscript')) {

        if (item.name.endsWith('.json')) {
          let matchToken = '"--' + item.name + '--"'
          gc_compile = gc_compile.replace(matchToken, item.data)
        }

        if (item.name.endsWith('.hl')) {
          const Buffer = gc.utils.Buffer;
          let contractHex = Buffer.from(item.data).toString('hex')
          let matchToken = '--' + item.name + '--'

          gc_compile = gc_compile.replace(matchToken, contractHex)
        }
      }
    });

    const transpiled=await transpile({
      mainFileName:file.name,
      files,
    });
    //console.log({transpiled});
    console.log({transpiled:JSON.stringify(transpiled,null,2)});
    //GcConnect(transpiled);
    return false;
  }

  return (<div>

    <Button
      variant="primary">
      <Files size={"20px"} />
    </Button>

    <Button
      onClick={handleClickRun}
      disabled={!isActiveAGCScript}
      variant="primary">
      <PlayFill size={"20px"} />
    </Button>

    <Button
      variant="primary">
      <CloudUploadFill size={"20px"} />
    </Button>

    <Button
    onClick={() => {
      dispatch({
        type: 'download-project',
      });
    }}
      variant="primary">
      <Download size={"20px"} />
    </Button>
  </div>

  );
}
