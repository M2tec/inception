import React from 'react';
import { AppContext } from '../AppContext';
import SourceViewer from './SourceViewer';

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav';

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
        console.log(item)
        return (
            <Tab.Pane className='panel' eventKey={item.name}> <SourceViewer data={item} />
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
