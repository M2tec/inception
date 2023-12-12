import React, { useEffect } from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';
import project from "../data/Token_Locking/project.js";
import { AppContext } from '../AppContext';

export default function SourceBrowser() {
    // const [activeItem, setActiveItem] = React.useState(0);
    const { context, setContext } = React.useContext(AppContext)
    console.log(context)

    const File = ({
        item,
        isActive,
        onClick
    }) => {
        let cssSelected = ''

        // context.file[index].open = true
        // Highlight active file
        isActive ? cssSelected = 'file-item-selected' : cssSelected = 'file-item'

        return (
            <div onClick={onClick} className={cssSelected} tyle="cursor: pointer;" >
                <FiletypeJson className="file-icon" />
                <span className="file-name"> {item.name} </span>
            </div>
        );
    };

    // useEffect(() => {

    //     updateFileList("test");
    //   }, []);

    // useEffect(() => { 
    // Add file to openFileList when clicked
    // let clickedFile = project.items[activeItem].name
    // let flist = openFileList
    // flist.indexOf(clickedFile) === -1 ? flist.push(clickedFile) : console.log("already open")
    // updateFileList(flist)
    // console.log("Browse: " + openFileList)
    // 
    // }, [ openFileList, updateFileList])

    return (
        <div className="source-browser">
            <div className="folder-item">
                <ChevronDown className="file-expander" /> <span className="file-name">source</span></div>

            {context.files.map((item, index) => {
                return (
                    <File
                        isActive={context.active === index}
                        key={index}
                        item={item}
                        onClick={() => setContext(oldContext => {
                            const files = oldContext.files || [];
                            files[index].open = true;
                            return { ...oldContext, active: index, files}
                        })}
                    />
                );
            })}
        </div>
    );
}