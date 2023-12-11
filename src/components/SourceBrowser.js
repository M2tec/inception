import React from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';
// import SourceViewer from "./SourceViewer";

import project from "../data/Always_Succeed/project.js";

// const files = [
//     {
//         name: "contract.hl",
//         type: "helios"
//     },
//     {
//         name: "gc_script_template.json",
//         type: "json"
//     },
//     {
//         name: "datum.json",
//         type: "json"
//     },
//     {
//         name: "redeemer.json",
//         type: "json"
//     }
// ]

const File = ({ name, type }) => (
    <div className="file-item">
        <FiletypeJson className="file-icon"/>
        <span className="file-name"> {name} </span>
    </div>
);

export default function SourceBrowser() {

    console.log(project)

    return (
        <div className="source-browser">
            <div className="folder-item">
            <ChevronDown className="file-expander"/> <span className="file-name">source</span></div>
            {project.items.map((f, i) => (
                <File {...f} key={i} />
            ))}
        </div>
    );
}