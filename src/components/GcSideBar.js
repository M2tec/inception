import * as React from 'react';

import { Files, PlayFill} from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';

const GcSideBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
    activeKey="/home"
    onSelect={selectedKey => alert(`selected ${selectedKey}`)}
    >
        <div className="sidebar-sticky"></div>
    <Nav.Item>
        <Nav.Link href="/home">Active</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="link-1">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
        Disabled
        </Nav.Link>
    </Nav.Item>
    </Nav>
  )
}

export default GcSideBar;