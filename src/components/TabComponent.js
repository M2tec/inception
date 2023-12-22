import React from 'react';
import { AppContext } from '../AppContext';
import SourceViewer from './SourceViewer';

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav';

import { X } from 'react-bootstrap-icons';

export default function TabComponent() {
    const { context, setContext } = React.useContext(AppContext)


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

    const GcTab = ({
        item,
    }) => {
        return (
            <Nav.Item>
                <Nav.Link eventKey={item}><span className='me-2'>{item}</span><X name={item.name} onClick={(e) => closeTab(e)} size={"20px"} /></Nav.Link>
            </Nav.Item>
        )
    };

    const GcPane = ({
        name,
    }) => {
        // let items = context.items
        return (
            <Tab.Pane className='TabPane' eventKey={name}> <SourceViewer name={name} readOnly={false} />
            </Tab.Pane>
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
        // <div className='TabComponent'>

            <Tab.Container id="tabContainer" activeKey={context.active}
                onSelect={(k) => tabSelect(k) }>

                <Nav variant="pills">
                    {context.openFiles.map((name, index) => {
                        return (
                            <GcTab
                                key={index}
                                item={name}
                            />
                        );
                    })}
                </Nav>

                <Tab.Content>
                    {context.openFiles.map((name, index) => {
                        return (
                            <GcPane
                                key={index}
                                name={name}
                            />
                        );
                    })}
                </Tab.Content>
            </Tab.Container>
        // </div>
    );
};
