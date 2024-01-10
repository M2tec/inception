import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useAppState, useStateDispatch } from '../AppContext.js';
import { GcConnect } from "./GameChangerAPI.js";

import {
  Files,
  PlayFill,
  CloudUploadFill,
  ArrowReturnLeft,
} from 'react-bootstrap-icons';

const gc = window.gc;

export default function SideView(props) {
  let { files, currentFileIndex } = useAppState();
  const dispatch = useStateDispatch();

  // console.log({SideviewFiles:files})

  let fileList = files.filter((file) => file.id == currentFileIndex)
  let file = fileList[0]

  // let viewType = context.dataItems[type]
  const isActiveAGCScript = file.name.endsWith('.gcscript');

  window.addEventListener("storage", () => {
    // When local storage changes, dump the list to
    // the console.
    const data = (window.localStorage.getItem("DataIsHere"))
    console.log(data);
    if (data !== '') {
        dispatch({
            type: 'menu-change',
            id: "returndata"
        });
        window.localStorage.setItem("DataIsHere", "")
    }
  })


  function handleClickRun(e) {

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

    // console.log(gc_compile);
    // let gc_script = JSON.parse(gc_compile);

    GcConnect(gc_compile);

    return false;
  }

  return (<div>

    <Button
      onClick={(e) => {
        dispatch({
          type: 'menu-change',
          id: "files"
        });
      }}
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
      onClick={(e) => {
        dispatch({
          type: 'menu-change',
          id: "returndata"
        });
      }}

      variant="primary">
      <ArrowReturnLeft size={"20px"} />
    </Button>

    <Button
      variant="primary">
      <CloudUploadFill size={"20px"} />
    </Button>
  </div>

  );
}
