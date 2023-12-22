import React from 'react';
import { AppContext } from '../AppContext';
import SourceViewer from './SourceViewer';

import { X } from 'react-bootstrap-icons';

export default function TabComponent() {
    const { context, setContext } = React.useContext(AppContext)

    const [activeTab, setActiveTab] = React.useState(0);

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

    function toggleTab (index) {
        setActiveTab(index)
    }

    const GcTab = ({ 
        index, 
        item 
    }) => {
        return (
           <div 
                className={activeTab === index ? "TabItem TabItemActive" : "TabItem"}
                onClick={() => toggleTab(index)}
                >
                    <span className='me-2'>{item}</span><X name={item.name} onClick={(e) => closeTab(e)} size={"20px"} /></div>
        )
    };

    const GcPane = ({
        index,
        name,
    }) => {
        return (
            <div 
                className={activeTab === index ? "TabPane  TabPaneActive" : "TabPane" }
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
                                item={name}
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
                </div>
        // </div>
    );
};
