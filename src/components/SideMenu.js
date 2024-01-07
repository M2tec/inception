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

export default function SideView(props) {
  const dispatch = useStateDispatch();

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
