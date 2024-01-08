import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import { useAppState, useStateDispatch } from '../AppContext.js';
import SourceViewer from "./SourceViewer.js";
import {
  Files,
  PlayFill,
  CloudUploadFill,
  ArrowReturnLeft,
} from 'react-bootstrap-icons';

const gc = window.gc;

export default function SideView(props) {
  const dispatch = useStateDispatch();
  let { files, currentFileIndex } = useAppState();
  // console.log(files)


  let fileList = files.filter((file) => file.id == currentFileIndex)
  let file = fileList[0]

  // let viewType = context.dataItems[type]
  const isActiveAGCScript = file.name.endsWith('.gcscript');

  // Following two useEffect hooks are setup to refresh the view when data
  // is returned from the connect popup
  const stateKey = "gc_return_data"
  const d = ''
  const [state, setState] = React.useState(d)
  const isNewSession = React.useRef(true)

  React.useEffect(() => {
      if (isNewSession.current) {
          const currentState = localStorage.getItem(stateKey)
          if (currentState) {
              setState(JSON.parse(currentState))
          } else {
              setState(d)
          }
          isNewSession.current = false
          return
      }
      try {
          localStorage.setItem(stateKey, JSON.stringify(state))
      } catch (error) { }
  }, [state, stateKey, d])

  React.useEffect(() => {
    console.log("data received")
    console.log({stateKey:stateKey})
    const onReceieveMessage = (e) => {
      
      console.log({stateKey2:stateKey})
      const { key, newValue } = e
      if (key === stateKey) {
          setState(JSON.parse(newValue))
      }
    }
    window.addEventListener('storage', onReceieveMessage)
    return () => window.removeEventListener('storage', onReceieveMessage)
  }, [stateKey, setState])


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

    console.log(gc_compile)
    let gc_script = JSON.parse(gc_compile)
    
    gc_script.returnURLPattern = window.location.origin + window.location.pathname + "connect/{result}";

    localStorage.setItem('gc_script', JSON.stringify(gc_script));

    let url = window.location.origin + "/connect"

    let newwindow = window.open(url, "Gamechanger connect", 'height=875,width=755');

    if (window.focus) { newwindow.focus() }
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
