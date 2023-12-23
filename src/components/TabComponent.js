import React from 'react';
import { AppContext } from '../AppContext';
import SourceViewer from './SourceViewer';

import { X } from 'react-bootstrap-icons';

export default function TabComponent(props) {
    const { context, setContext } = React.useContext(AppContext)

    const [activeTab, setActiveTab] = React.useState(0);

    console.log(props.active)

    function closeTab(e) {
        console.log("close tab")
        console.log(context.active)
        console.log(context.openFiles)

        let fileIndex = context.openFiles.indexOf(context.active)
        console.log(fileIndex)

        // Remove the file from the openFiles list
        let newOpenFiles = context.openFiles
        newOpenFiles.splice(fileIndex,1)

        // Change the active file index
        if (fileIndex > 0) {
            fileIndex -= 1
        }

        console.log(fileIndex)
        console.log(context.openFiles[fileIndex])

        let newContext = {...context, active: context.openFiles[fileIndex], openFiles: newOpenFiles}
        localStorage.setItem('tempContext', JSON.stringify(newContext));

        setContext(oldContext => { return {...oldContext, active: context.openFiles[fileIndex], openFiles: newOpenFiles}  })
        
        console.log("-------------------")

        console.log("newcontext")
        console.log(newContext)
        console.log(newContext.active)
        console.log(newContext.openFiles)
    }

    function toggleTab (name) {
        setContext({...context, active:name})
    }

    const GcTab = ({ 
        index, 
        name
    }) => {

        return (
           <div 
                className={name === props.active ? "TabItem TabItemActive" : "TabItem"}
                onClick={() => toggleTab(name)}
                >
                    <span className='me-2'>{name}</span><X name={name} onClick={(e) => closeTab(e)} size={"20px"} /></div>
        )
    };

    const GcPane = ({
        index,
        name,
    }) => {
        console.log("Pane render: " + name)
        return (
            <div 
                className={name === props.active ? "TabPane  TabPaneActive" : "TabPane" }
                // className="TabPane  TabPaneActive"
                > 
                <SourceViewer name={name} readOnly={false} />
            </div>
        )
    };

    function tabSelect(k) {

        console.log(k)
        // setContext(oldContext => {
        //     return { ...oldContext, active: k }
        // })
        let newContext = { ...context, active: k }
        localStorage.setItem('tempContext', JSON.stringify(newContext));
        setContext({...context})
    }

    return (
            <div className="TabContainer">
                {/* activeKey={context.active}
                onSelect={(k) => tabSelect(k) } */}

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
