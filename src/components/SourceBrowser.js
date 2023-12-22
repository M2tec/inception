import React, { useState } from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';
import { AppContext } from '../AppContext';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";


export default function SourceBrowser() {
    // const [activeItem, setActiveItem] = React.useState(0);
    const { context, setContext } = React.useContext(AppContext)
    const [addFile, setAddFile] = React.useState(false);
    const [fileName, setFileName] = React.useState("");
    
    const [contextMenu, setContextMenu] = React.useState({
        position: {
            x: 0,
            y: 0
        },
        toggled: false
        })

    const File = ({
        item,
        isActive,
        onClick
    }) => {
        let cssSelected = ''

        // Highlight active file
        isActive ? cssSelected = 'file-item-selected' : cssSelected = 'file-item'

        return (
            <div onClick={onClick} className={cssSelected} tyle="cursor: pointer;" >
                <FiletypeJson className="file-icon" />
                <span className="file-name"> {item.name} </span>
            </div>
        );
    };
    
    function handleCreateFile() {
        console.log(fileName)

        let newItem = {
            "name": fileName,
            "type": "helios",
            "data": ``}
        
        let newItems = [...context.items, newItem]
        
        setContext({ ...context, items: newItems })
        // localStorage.setItem('tempContext', JSON.stringify(tempContext));
        
        setAddFile(false)
    }

    function handleAddFile() {
        console.log("hi")
        setAddFile(true)
    }

    function handleCancelAddFile() {
        console.log("hi")
        setAddFile(false)
    }

    // function handleOnContextMenu(e, item) {
    //     e.preventDefault();
    //     console.log(item)
    // }

    return (
        <div className="source-browser">
            <div className="folder-item">
                
                <ChevronDown className="file-expander" /> <span className="file-name">source</span></div>
                
                {context.items.map((item, index) => {
                return (
                    <File
                        isActive={context.active === context.items[index].name}
                        key={index}
                        item={item}
                        onClick={() => setContext(oldContext => {
                            const openFiles = oldContext.openFiles || [];
                            
                            let filename = oldContext.items[index].name
                            openFiles.indexOf(filename) === -1 ? openFiles.push(filename) : console.log("This item already exists");
                            
                            return { ...oldContext, active: filename, openFiles: openFiles }
                        })}
                    />
                );
            })}
            {addFile ?
                <Form>
                    <Form.Control 
                        className="ms-5 mt-2 w-50" 
                        placeholder="Enter filename..." 
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                    />
                    <Button onClick={handleCreateFile} variant="success" className="rounded ms-5 mt-2">Add file</Button>
                    <Button onClick={handleCancelAddFile} variant="secondary" className="rounded mt-2 ms-1">Cancel</Button>
                </Form>
                :
                <Button onClick={handleAddFile} variant="primary" className="rounded ms-5 mt-2">+</Button>}

        </div>
    );
}