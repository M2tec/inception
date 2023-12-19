import React from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';
import { AppContext } from '../AppContext';

export default function SourceBrowser() {
    // const [activeItem, setActiveItem] = React.useState(0);
    const { context, setContext } = React.useContext(AppContext)
    
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
                            // const files = oldContext.files || [];
                            // files[index].open = true;
                            const openFiles = oldContext.openFiles || [];
                            let filename = oldContext.items[index].name
                            openFiles.indexOf(filename) === -1 ? openFiles.push(filename) : console.log("This item already exists");
                            // console.log(filename)
                            return { ...oldContext, active: filename, openFiles: openFiles}
                        })}
                    />
                );
            })}
        </div>
    );
}