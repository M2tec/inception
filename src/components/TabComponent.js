import React from 'react';

// import SourceViewer from './SourceViewer';
// import { IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { FiletypeJson } from 'react-bootstrap-icons';

// import project from "../data/Token_Locking/project.js";

import Tab from 'react-bootstrap/Tab'
// import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';


import { useApp, useAppUpdate } from '../AppContext';

export default function TabComponent() {
    const openFileList = useApp()
    const updateFileList = useAppUpdate()

    // const {openFileList, setOpenFileList} = React.useContext(AppContext);
    console.log("Tab: " + openFileList)

    // function close() {
    //     console.log("Handle");
    // }

    // const GcTab = ({
    //     item,
    // }) => {
    //     console.log(item)
    //     console.log("hi")
    //     return (
    //         <Nav.Item>
    //             <Nav.Link eventKey={item}>{item}</Nav.Link>
    //         </Nav.Item>
    //     )
    // };


    return (
        <div className='panel'>
                    {console.log("Render")}
                    {openFileList}
            {/* <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                <Row>
                    <Nav variant="tabs">

                        {openFileList.map((item, index) => {
                            return (
                                <GcTab
                                    key={openFileList[0]}
                                    item={openFileList[0]}
                                />
                           );
                        })}
 
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">First tab content</Tab.Pane>
                        <Tab.Pane eventKey="second">Second tab content</Tab.Pane>
                    </Tab.Content>
                </Row>
            </Tab.Container> */}

        </div>
    );
};
