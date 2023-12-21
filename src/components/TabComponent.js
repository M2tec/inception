import React from 'react';
import { AppContext } from '../AppContext';
import SourceViewer from './SourceViewer';

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { X } from 'react-bootstrap-icons';

export default function TabComponent() {
    const { context, setContext } = React.useContext(AppContext)

    const GcTab = ({
        item,
    }) => {
        return (
            <Nav.Item>
                <Nav.Link eventKey={item}><span className='me-2'>{item}</span><X size={"20px"}/></Nav.Link>
            </Nav.Item>
        )
    };

    const GcPane = ({
        name,
    }) => {
        // let items = context.items
        return (
            <Tab.Pane className='panel' eventKey={name}> <SourceViewer name={name} readOnly={false} />
            </Tab.Pane>
        )
    };

    return (
        <div className='panel'>
            <Tab.Container id="left-tabs-example" activeKey={context.active} 
                onSelect={(k) => setContext(oldContext => {
                return { ...oldContext, active: k}
            })}>

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

                <Tab.Content className='panel'>
                    {context.openFiles.map((name,index) => {
                        return (
                            <GcPane
                                key={index}
                                name={name}
                            />
                        );
                    })}
                </Tab.Content>
            </Tab.Container> 
        </div>
    );
};
