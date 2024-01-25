import React from "react";
import Button from 'react-bootstrap/Button';
import { useAppState, useStateDispatch } from '../AppContext';
import { GcConnect } from "./GameChangerAPI";
import { transpile } from "../services/gcscript";
import JSZip from "jszip";

import {
  Files,
  PlayFill,
  // CloudUploadFill,
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

  // let isActiveCode = false;
  // if (file !== undefined) {
  //   isActiveCode = file.name.endsWith('.code');
  // }

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

    let [currentFile] = files.filter((file) => file.id === currentFileIndex);
    let transpiled
    (async () => {
      try {
        console.log({currentFile})
        let topLevelFiles = files.filter((file) => file.parentId === -1)

        const fileUri=`ide://${currentFile.name || ""}`;
        transpiled = await transpile({
          fileUri,
          files: topLevelFiles,
        });
        dispatch({
          type: 'console',
          item:{
            type:"success",
            message:`Build successfull: ${fileUri}`,
            extra:{
              type:"TranspileSuccess"
            }
          }            
        });
        // console.log(transpiled)
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


        console.log("Transpile: " + file.name + " " + file.id + " " + currentFileIndex)
      }

      return transpiled
    })().then(transpiled => {
        console.log({transpiled})
        GcConnect(transpiled)})

    // GcConnect(transpiled);
    // console.log({currentFile})


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
                type:"TranspileSuccess"
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

  async function handleStateUpload(e) {
    console.log({ e })
    console.log(e.target.files[0])

    let projectKeys = Object.keys(localStorage).filter((project) => project.includes('data_'))
    let keyIdArray = projectKeys.map((key) => parseInt(key.split("_")[1]))
    let largest = Math.max.apply(0, keyIdArray);
    let newProjectIndex = largest + 1

    let reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    let fileName = e.target.files[0].name
    console.log({ fileName })

    let [extension] = fileName.split(".").slice(-1)

    console.log({extension})

    switch (extension) {
      case "json":

        reader.onload = function () {
          console.log(reader.result);  // prints file contents
          let uploadData = JSON.parse(reader.result)
          console.log({ uploadData })

          dispatch({
            type: 'upload-project',
            project: { newProjectIndex, uploadData }
          });
        };
        break;

      // case "zip":
      //   const zip = new JSZip();

      //   reader.onload = async function () {
          
      //     console.log(typeof(reader.result))
      //     console.log(reader.result)
      //     // const unzippedFiles = await zip.loadAsync(file);

      //     zip.loadAsync(reader.result).then(function(contents) {
      //       Object.keys(contents.files).forEach(function(filename) {
      //           zip.file(filename).async('nodebuffer').then(function(content) {
      //               // var dest = path + filename;
      //               console.log({content})
      //           });
      //       });
      //     });

      //     // console.log(reader.result);  // prints file contents
      //     // let uploadData = JSON.parse(reader.result)
      //     // console.log({ uploadData })

      //     // dispatch({
      //     //   type: 'upload-project',
      //     //   project: { newProjectIndex, uploadData }
      //     // });
      //   };
      //   break;
      default:
        console.log("Wrong file type");
    }

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
      disabled={!isActiveGCScript}
      variant="primary">
      <PlayFill size={"20px"} />
    </Button>

    {/* <Button
      variant="primary">
      <CloudUploadFill size={"20px"} />
    </Button> */}

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
