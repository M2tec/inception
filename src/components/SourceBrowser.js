import { Padding } from "@mui/icons-material";
import React from "react";
import { ChevronDown, FiletypeJson, FiletypeJs, ArrowRight } from 'react-bootstrap-icons';
import SourceViewer from "./SourceViewer";

const files = [
    {
        name: "contract.hl",
        type: "helios"
    },
    {
        name: "gc_script_template.json",
        type: "json"
    },
    {
        name: "datum.json",
        type: "json"
    },
    {
        name: "redeemer.json",
        type: "json"
    }
]

const people = [
    { firstName: "John", lastName: "Smith" },
    { firstName: "Bill", lastName: "Jones" },
    { firstName: "Roger", lastName: "Moore" }
];

const File = ({ name, type }) => (
    <div className="file-item">
        <FiletypeJson className="file-icon"/>
        <span className="file-name"> {name} </span>
    </div>
);

export default function SourceBrowser() {
    return (
        <div className="source-browser">
            <div className="folder-item">
            <ChevronDown className="file-expander"/> <span className="file-name">source</span></div>
            {files.map((f, i) => (
                <File {...f} key={i} />
            ))}
        </div>
    );
}