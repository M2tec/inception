import React, { useState } from "react";
import {
    ChevronDown,
    FiletypeJson,
    Trash,
    PlusSquare
} from 'react-bootstrap-icons';

import { AppContext } from '../AppContext';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import FilesList from "./FileList";

export default function SourceBrowser(props) {
    const [addFile, setAddFile] = React.useState(false);
    const [fileName, setFileName] = React.useState("");

    function handleCreateFile(e, fileName) {
        console.log(e)
        console.log(fileName)

        setAddFile(false)
    }

    function handleAddFile() {
        setAddFile(true)
    }

    function handleCancelAddFile() {
        setAddFile(false)
    }

    return (

        <div className="source-browser">

            <div className="folder-item">
                <ChevronDown className="file-expander" /> <span className="file-name">{props.type}</span>
            </div>
            
                <FilesList />

            {addFile ?
                <Form>
                    <Form.Control
                        className="ms-5 mt-2 w-50"
                        placeholder="Enter filename..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleCreateFile(e, fileName);
                        }}
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    <Button onClick={(e) => handleCreateFile(e, fileName)} variant="success" className="rounded ms-5 mt-2">Add file</Button>
                    <Button onClick={handleCancelAddFile} variant="secondary" className="rounded mt-2 ms-1">Cancel</Button>
                </Form>
                :
                <PlusSquare size={20} onClick={handleAddFile} className="ms-5 mt-0" />}

        </div>
    );
}