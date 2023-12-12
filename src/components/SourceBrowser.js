import React, { useEffect } from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';
import project from "../data/Token_Locking/project.js";
import { useApp, useAppUpdate } from '../AppContext';

export default function SourceBrowser() {
    const [activeItem, setActiveItem] = React.useState(0);

    const openFileList = useApp()
    const updateFileList = useAppUpdate()

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
            <FiletypeJson className="file-icon"/>
            <span className="file-name"> {item.name} </span>
        </div>
        );
    };

    useEffect(() => { 
        // Add file to openFileList when clicked
        let clickedFile = project.items[activeItem].name
        let flist = openFileList
        flist.indexOf(clickedFile) === -1 ? flist.push(clickedFile) : console.log("already open")
        updateFileList(flist)
        console.log("Browse: " + openFileList)

    }, [activeItem, openFileList, updateFileList])

    return (
        <div className="source-browser">
            <div className="folder-item">
            <ChevronDown className="file-expander"/> <span className="file-name">source</span></div>

            {project.items.map((item , index) => {
                return (
                <File 
                    isActive={activeItem === index}
                    key={index} 
                    item={item} 
                    onClick={() => setActiveItem(index)}
                />
                );
            })}
        </div>
    );
}