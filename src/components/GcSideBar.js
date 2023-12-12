import * as React from 'react';

import { Files, PlayFill} from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';

const GcSideBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='x'>
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
    activeKey="/home"
    >
        <div className="sidebar-sticky"></div>
    <Nav.Item>
        <Nav.Link className="nav-side" href="/home"><Files size={"20px"}/></Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link className="nav-side" eventKey="link-1"><PlayFill size={"20px"}/></Nav.Link>
    </Nav.Item>
    </Nav>
    </div>
  )
}

export default GcSideBar;