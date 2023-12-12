import React from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';

import project from "../data/Token_Locking/project.js";

export default function SourceBrowser() {
    const [activeItem, setActiveItem] = React.useState(0);

    const File = ({ 
            item, 
            isActive, 
            onClick 
        }) => {
        return isActive ? (

        <div onClick={onClick} className="file-item-selected" tyle="cursor: pointer;" >
            <FiletypeJson className="file-icon"/>
            <span className="file-name"> {item.name} </span>
        </div>

        ) : (

        <div onClick={onClick} className="file-item" tyle="cursor: pointer;" >
            <FiletypeJson className="file-icon"/>
            <span className="file-name"> {item.name} </span>
        </div>

        );
    };

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