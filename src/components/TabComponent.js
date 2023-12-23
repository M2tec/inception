import React from 'react';
import { AppContext } from '../AppContext';
import SourceViewer from './SourceViewer';

import { X } from 'react-bootstrap-icons';

export default function TabComponent(props) {
    const { context, setContext } = React.useContext(AppContext)

    function closeTab(e) {
        setContext(oldContext => {
            let fileIndex = oldContext.openFiles.indexOf(oldContext.active)
            console.log(fileIndex)

            // Remove the file from the openFiles list
            let newOpenFiles = oldContext.openFiles || [];
            newOpenFiles.splice(fileIndex,1)

            if (fileIndex > 0) {
                fileIndex -= 1
            }

            let newActive = oldContext.openFiles[fileIndex]
            return { ...oldContext, newActive:newActive, active: newActive, openFiles: newOpenFiles }
        })

    }

    function toggleTab (name) {
        setContext(oldContext => {           
            return { ...oldContext, active: name }
        })
    }

    const GcTab = ({ 
        index, 
        name
    }) => {

        return (
           <div 
                className={name === props.active ? "TabItem TabItemActive" : "TabItem"}
                >
            <span onClick={() => toggleTab(name)} className='me-2'>{name}</span><X name={name} onClick={(e) => closeTab(e)} size={"20px"} /></div>
        )
    };

    const GcPane = ({
        index,
        name,
    }) => {
        return (
            <div 
                className={name === props.active ? "TabPane  TabPaneActive" : "TabPane" }
                > 
                <SourceViewer name={name} readOnly={false} />
            </div>
        )
    };

    return (
            <div className="TabContainer">
                 <div className='TabBar'>
                    {context.openFiles.map((name, index) => {
                        return (
                            <GcTab
                                index={index}
                                key={index}
                                name={name}
                            />
                        );
                    })}
                </div>

                 {context.openFiles.map((name, index) => {
                        return (
                            <GcPane
                                index={index}
                                key={index}
                                name={name}
                            />
                        );
                    })}
                            {/* <GcPane
                                index="0"
                                key="0"
                                name="contract.hl"
                            /> */}
                </div>
        // </div>
    );
};
