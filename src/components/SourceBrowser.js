import React from "react";
import { ChevronDown, FiletypeJson } from 'react-bootstrap-icons';
import { AppContext } from '../AppContext';
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

export default function SourceBrowser() {
    // const [activeItem, setActiveItem] = React.useState(0);
    const { context, setContext } = React.useContext(AppContext)
    const [addFile, setAddFile] = React.useState(false);

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
        console.log("hi")
        setAddFile(true)
    }

    function handleAddFile() {
        console.log("hi")
        setAddFile(true)
    }

    function handleCancelAddFile() {
        console.log("hi")
        setAddFile(false)
    }

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
                            return { ...oldContext, active: filename, openFiles: openFiles }
                        })}
                    />
                );
            })}
            {addFile ?
                <Form>
                    <Form.Control className="ms-5 mt-2 w-50" placeholder="Enter filename..." />
                    <Button onClick={handleCreateFile} variant="success" className="rounded ms-5 mt-2">Add file</Button>
                    <Button onClick={handleCancelAddFile} variant="secondary" className="rounded mt-2 ms-1">Cancel</Button>
                </Form>
                :
                <Button onClick={handleAddFile} variant="primary" className="rounded ms-5 mt-2">+</Button>}

        </div>
    );
}