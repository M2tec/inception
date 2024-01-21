import React from "react";
import Button from 'react-bootstrap/Button';
import { useAppState, useStateDispatch } from '../AppContext.js';
import { GcConnect } from "./GameChangerAPI.js";
import { transpile } from "../services/gcscript.js";

import {
  Files,
  PlayFill,
  CloudUploadFill,
  Download,
  ArrowRepeat
} from 'react-bootstrap-icons';

export default function SideView(props) {
  let { files, currentFileIndex } = useAppState();
  const dispatch = useStateDispatch();

  // console.log({files:files})
  let fileList = files.filter((file) => file.id === currentFileIndex)
  let file = fileList[0]

  let isActiveCode = false;
  if (file !== undefined) {
    isActiveCode = file.name.endsWith('.code');
  }

  let isActiveGCScript = false;
  if (file !== undefined) {
    isActiveGCScript = file.name.endsWith('.gcscript');
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
 
    // console.log(currentFileIndex)
    // console.log({files})

    let [currentFile] = files.filter((file) => file.id === currentFileIndex)
    // console.log({currentFile})
    GcConnect(currentFile.data);
    
    return false;
  }

  async function handleClickGenerate(e) {
    let [extension] = file.name.split(".").slice(-1)

    // console.log("Transpile: " + file.name + " " + extension  + " " + file.id + " " + currentFileIndex )

    if (file.name && extension === "gcscript" && file.id === currentFileIndex) {
      
      (async () => {
        try{
          
          let topLevelFiles = files.filter((file) => file.parentId === -1)

          const transpiled = await transpile({
            fileUri:`ide://${file.name||""}`,
            files:topLevelFiles,
          });

          console.log("transpiled ----")
          dispatch({
            type: 'add-code',
            data: { file, transpiled }
          });

        }catch(err){
          const {
            type,
            fileUri,
            importTrace,
            path,
            message,
          }=err||{};
          console.error(`${type||"UnknownError"}:${message||"Unknown error"}`,{            
            type,
            fileUri,
            importTrace,
            path,
            message
          });
          dispatch({
            type: 'set-alert',
            message: message
          });


          console.log("Transpile: " + file.name + " " + extension  + " " + file.id + " " + currentFileIndex )
        }

        
      })()
    }


    console.log("Generate");
     

  }

  return (<div>

    <Button
      variant="primary">
      <Files size={"20px"} />
    </Button>

    <Button
      onClick={handleClickGenerate}
      disabled={!isActiveGCScript}
      variant="primary">
      <ArrowRepeat size={"20px"} />
    </Button>

    <Button
      onClick={handleClickRun}
      disabled={!isActiveCode}
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
