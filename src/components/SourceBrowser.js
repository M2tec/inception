import React from "react";
import { useAppState, useStateDispatch } from '../AppContext.js';
import {
    ChevronDown,
    Pencil,
    Save,
    Stickies
} from 'react-bootstrap-icons';

import FilesList from "./FileList";

export default function SourceBrowser(props) {

    let { name } = useAppState();
    console.log({name:name})
    const dispatch = useStateDispatch();
    const [isEditing, setIsEditing] = React.useState(false);

    const [projectName, setProjectName] = React.useState(name)

    React.useEffect(() => {
        setProjectName(name)
    }, [name] )

    let projectItem;

    function handleSave(){
        dispatch({
            type: 'rename-project',
            name: projectName
          });
        setIsEditing(false)
    }

    if (isEditing) {
        projectItem = (
            <>
            <input
              value={projectName}
              onChange={e => {
                console.log({e:e.target.value})
                setProjectName(e.target.value)
              }} />
            <Save size={12} onClick={() => handleSave()} />
            </>
        );
    } else {
        projectItem = (<>
            {name}
            <Stickies
            className='project-icon'
            onClick={(e) => {

                dispatch({
                    type: 'duplicate-project',
                    // file: file
                });
                
                
            }}
            size={12} />
            <Pencil size={12} className='project-icon' onClick={() => setIsEditing(true)} />
            </>
        );
    }

    return (
        <div className="source-browser">
            <div className="project-item">
                <ChevronDown />
                {projectItem}
            </div>
            <FilesList />
        </div>
    );
}