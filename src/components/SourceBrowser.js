import React from "react";
import { useAppState } from '../AppContext.js';
import {
    ChevronDown,
} from 'react-bootstrap-icons';

import FilesList from "./FileList";

export default function SourceBrowser(props) {

    let { menu } = useAppState();
    return (

        <div className="source-browser">

            <div className="folder-item">
                <ChevronDown />
                <span className="file-name">
                    {menu == "files" ? "source" : "returndata"}
                </span>
            </div>
            <FilesList />
        </div>
    );
}