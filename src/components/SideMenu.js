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
  Upload,
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
        try {

          let topLevelFiles = files.filter((file) => file.parentId === -1)
          const fileUri=`ide://${file.name || ""}`;
          const transpiled = await transpile({
            fileUri,
            files: topLevelFiles,
          });

          console.log("transpiled ----")
          dispatch({
            type: 'add-code',
            data: { file, transpiled }
          });
          dispatch({
            type: 'console',
            item:{
              type:"success",
              message:`Build successfull: ${fileUri}`,
              extra:{
                type:"TranspilerSuccess"
              }
            }            
          });
        } catch (err) {
          const {
            type,
            fileUri,
            importTrace,
            path,
            message,
          } = err || {};
          console.error(`${type || "UnknownError"}:${message || "Unknown error"}`, {
            type,
            fileUri,
            importTrace,
            path,
            message
          });
          dispatch({
            type: 'console',
            item:{
              type:"error",
              message:message,
              extra:{
                type,
                fileUri,
                importTrace,
                path,
              }
            }            
          });


          console.log("Transpile: " + file.name + " " + extension + " " + file.id + " " + currentFileIndex)
        }


      })()
    }


    console.log("Generate");


  }

  function handleStateUpload(e) {
    console.log({e})
    console.log(e.target.files[0])


    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    
    reader.onload = function() {
        console.log(reader.result);  // prints file contents
        let uploadData = JSON.parse(reader.result)
        console.log({uploadData})

        let projectKeys = Object.keys(localStorage).filter((project) => project.includes('data_'))
        let keyIdArray = projectKeys.map((key) => parseInt(key.split("_")[1]))
        let largest = Math.max.apply(0, keyIdArray);
        let newProjectIndex = largest + 1

        dispatch({
          type: 'upload-project',
          project: {newProjectIndex, uploadData}
        });
    };


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

    <input 
        accept=".json" 
        id="icon-button-file"
        type="file" 
        style={{ display: 'none' }} 
        onChange={handleStateUpload}
        />
    <label className="uploadInput" htmlFor="icon-button-file">
      <Upload size={"20px"} />
    </label>

  </div>

  );
}
