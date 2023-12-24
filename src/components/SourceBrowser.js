import React, { useState } from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';
import { AppContext } from '../AppContext';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";


export default function SourceBrowser(props) {
    // const [activeItem, setActiveItem] = React.useState(0);
    const { context, setContext } = React.useContext(AppContext)
    const [ addFile, setAddFile] = React.useState(false);
    const [ fileName, setFileName] = React.useState("");
    
    const [contextMenu, setContextMenu] = React.useState({
        position: {
            x: 0,
            y: 0
        },
        toggled: false
        })

    const viewType = context.dataItems[props.type]
    // console.log({Viewtype:viewType})
    // console.log(context)
    // console.log(props.type)
    // console.log(context.dataItems[props.type])

    const File = ({
        item,
        isActive,
        onClick
    }) => {
        let cssSelected = ''

        // Highlight active file
        

        return (
            <div 
                onClick={onClick} 
                className={isActive ? 'file-item-selected' : 'file-item'} 
                >
                <FiletypeJson className="file-icon" /><span className="file-name">{item.name}</span>
            </div>
        );
    };
    
    function handleCreateFile(e, fileName) {
        console.log(e)
        console.log(fileName)

        

        
        // setContext({ ...context, items: newItems })
        // localStorage.setItem('tempContext', JSON.stringify(tempContext));

        setContext(oldContext => {

            let newContext = {...oldContext}
            
            let newItem = {
                "name": fileName,
                "type": "",
                "data": ``}
            
            newContext.dataItems[props.type].items.push(newItem)

            return newContext
        })
        setAddFile(false)
    }

    function handleAddFile() {
        setAddFile(true)
    }

    function handleCancelAddFile() {
        setAddFile(false)
    }

    function setActive(item, index){
        // console.log("setActive")
        // console.log(item.name)
        // console.log(index)

        setContext(oldContext => {
            const dataItem = oldContext.dataItems[props.type] || [];
            
            const openItems = dataItem.openItems || [];
            let filename = dataItem.items[index].name
            openItems.indexOf(filename) === -1 ? openItems.push(filename) : console.log("This item already exists");
            
            dataItem.active = item.name;

            let newDataItems = oldContext.dataItems
            newDataItems[props.type] = dataItem
                        
            return { ...oldContext, dataItems:newDataItems }
        })
    }
    // function handleOnContextMenu(e, item) {
    //     e.preventDefault();
    //     console.log(item)
    // }

    return (
        <div className="source-browser">
            <div className="folder-item">
                
                <ChevronDown className="file-expander" /> <span className="file-name">{props.type}</span></div>
                
                {viewType.items.map((item, index) => {
                return (
                    <File
                        isActive={props.active === viewType.items[index].name}
                        key={index}
                        item={item}
                        onClick={() => setActive(item, index)}
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
                    <Button onClick={(e) => handleCreateFile(e, fileName)} variant="success" className="rounded ms-5 mt-2">Add file</Button>
                    <Button onClick={handleCancelAddFile} variant="secondary" className="rounded mt-2 ms-1">Cancel</Button>
                </Form>
                :
                <Button onClick={handleAddFile} variant="primary" className="rounded ms-5 mt-2">+</Button>}

        </div>
    );
}