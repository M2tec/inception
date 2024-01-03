import React, { useState } from "react";
import { 
    ChevronDown, 
    FiletypeJson,
    Trash
} from 'react-bootstrap-icons';

import { AppContext } from '../AppContext';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";


export default function SourceBrowser(props) {
    // const [activeItem, setActiveItem] = React.useState(0);
    const { context, setContext } = React.useContext(AppContext)
    const [ addFile, setAddFile] = React.useState(false);
    const [ fileName, setFileName] = React.useState("");
    
    const viewType = context.dataItems[props.type]

    function deleteItem (e,item, isActive) {
        console.log(item.name)

        if (!isActive) {
        setContext(oldContext => {

            let newContext = {...oldContext}

            // console.log(newContext.dataItems[props.type])
            
            const index = newContext.dataItems[props.type].items.map(e => e.name).indexOf(item.name);
            // console.log("Index: " + index)

            const openIndex = newContext.dataItems[props.type].openItems.indexOf(item.name);
            // console.log(newContext.dataItems[props.type].openItems)
            // console.log("item.name: " + item.name)
            // console.log("OpenIndex: " + openIndex)

            let newOpenItems = newContext.dataItems[props.type].openItems
            if (openIndex !== -1){
                newOpenItems = newOpenItems.splice(openIndex, 1)
            }
            // console.log({newOpenItems:newOpenItems})

            let newItems = newContext.dataItems[props.type].items
            // console.log(newItems)
            newItems = newItems.splice(index, 1)
            // console.log(newItems)
            // newContext.dataItems[props.type].items.splice(index, 1)
            localStorage.setItem('tempContext', JSON.stringify(newContext));

            return newContext
        })
    }
    }

    const File = ({
        item,
        isActive,
        onClick
    }) => {
        return (
            <div 
                className={isActive ? 'file-item-selected file-item' : 'file-item'} 
                >
                    <FiletypeJson size={"15px"} className="file-icon" />
                    <span 
                        onClick={onClick} 
                        className="file-name">{item.name}</span>
                    <Trash 
                        onClick={(e) => deleteItem(e,item, isActive)}
                        size={"15px"} 
                        className="trash-icon" />
            </div>
        );
    };
    
    function handleCreateFile(e, fileName) {
        console.log(e)
        console.log(fileName)

        setContext(oldContext => {

            let newContext = {...oldContext}
            
            let newItem = {
                "name": fileName,
                "type": "",
                "data": ``}
            
            newContext.dataItems[props.type].items.push(newItem)

            localStorage.setItem('tempContext', JSON.stringify(newContext));

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
                <Button onClick={handleAddFile} variant="primary" className="btn-add-file rounded ms-5 mt-2">+</Button>}

        </div>
    );
}