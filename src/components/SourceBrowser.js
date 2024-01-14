import React from "react";
import { useAppState, useStateDispatch } from '../AppContext.js';
import {
    ChevronDown,
    Stickies
} from 'react-bootstrap-icons';

import FilesList from "./FileList";

export default function SourceBrowser(props) {

    let { name } = useAppState();
    const dispatch = useStateDispatch();

    return (
        <div className="source-browser">
            <div className="project-item">
                <ChevronDown />
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
            </div>
            <FilesList />
        </div>
    );
}