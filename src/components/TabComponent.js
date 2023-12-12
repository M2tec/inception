import React from 'react';

import SourceViewer from './SourceViewer';
// import { IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { FiletypeJson } from 'react-bootstrap-icons';

// import project from "../data/Token_Locking/project.js";

import Tab from 'react-bootstrap/Tab'
// import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';


import { AppContext } from '../AppContext';

export default function TabComponent() {

    const { context, setContext } = React.useContext(AppContext)

    // function close() {
    //     console.log("Handle");
    // }

    const GcTab = ({
        item,
    }) => {
        return (
            <Nav.Item>
                <Nav.Link eventKey={item}>{item}</Nav.Link>
            </Nav.Item>
        )
    };

    const GcPane = ({
        item,
    }) => {
        return (
            <Tab.Pane className='panel' eventKey={item.name}> <SourceViewer data={item.data} />
            </Tab.Pane>
        )

    };
    return (
        <div className='panel'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">

                <Nav variant="pills">
                    {context.files.filter(x => x.open == true).map((item, index) => {
                        return (
                            <GcTab
                                key={index}
                                item={item.name}
                            />
                        );
                    })}
                </Nav>

                <Tab.Content className='panel'>
                    {context.files.filter(x => x.open == true).map((item, index) => {
                        return (
                            <GcPane
                                key={index}
                                item={item}
                            />
                        );
                    })}
                </Tab.Content>
            </Tab.Container>
        </div>
    );
};
