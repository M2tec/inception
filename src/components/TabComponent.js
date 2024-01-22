import React from 'react';
import SourceViewer from './SourceViewer';
import Console from './Console';
import { useAppState, useStateDispatch } from '../AppContext.js';
import { X } from 'react-bootstrap-icons';

export default function TabComponent(props) {
    const dispatch = useStateDispatch();
    const { console, files, openFiles, currentFileIndex } = useAppState();

    const GcTab = ({
        id
    }) => {
        // console.log(id)
        // console.log(files)
        let currentFile = files.filter((file) => file.id === id);
        let name = currentFile[0].name
        return (
            <div className={id === currentFileIndex ? "TabItem TabItemActive" : "TabItem"}>
                <span
                    onClick={(e) => {
                        dispatch({
                            type: 'selected',
                            file: currentFile[0]
                        });
                    }}
                    className='me-2'>
                    {name}
                </span>

                <X name={name}
                    onClick={(e) => {
                        dispatch({
                            type: 'closed',
                            id: id
                        });
                    }}
                    size={"20px"} />
            </div>
        )
    };

    return (
        <div className="TabContainer">
            <div className='TabBar'>
                {/* {console.log({openfiles:openFiles})}
                {console.log({files:files})} */}
                {openFiles.map((id, index) => {
                    return (
                        <GcTab
                            index={index}
                            key={index}
                            id={id}
                        />
                    );
                })}
            </div>

            <div className={currentFileIndex ? "TabPane  TabPaneActive" : "TabPane"}>
                {/* {console.log(currentFileIndex)} */}
                <SourceViewer id={currentFileIndex} readOnly={false} />
            </div>

            {console?.length > 0 
                ? 
                (<Console console={console} clearConsole={()=>{
                    dispatch({
                        type: 'clear-console',           
                    });
                }}/>)
                :
            null}
        </div>
    );
};
