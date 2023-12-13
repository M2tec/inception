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
        name,
    }) => {
        // console.log(name)
        let items = context.items
        // console.log(items)
        let item = items.filter(x => x.name == name)

        // console.log(item[0].data)
        return (
            <Tab.Pane className='panel' eventKey={name}> <SourceViewer name={name} />
            </Tab.Pane>
        )
    };


    return (

        <div className='panel'>
            {console.log(context.active)}
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
