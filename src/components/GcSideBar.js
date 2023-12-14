import * as React from 'react';
import { 
  Files, 
  PlayFill, 
  CloudUploadFill,
  ArrowReturnLeft,
  Save
} from 'react-bootstrap-icons';
import Nav from 'react-bootstrap/Nav';
import { AppContext } from '../AppContext';

const GcSideBar = () => {
  const { context, setContext } = React.useContext(AppContext)

  return (
    <div className='x'>
    <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
    activeKey="/home"
    >
        <div className="sidebar-sticky"></div>
    <Nav.Item>
        <Nav.Link className="nav-side"><Files size={"20px"}/></Nav.Link>
    </Nav.Item>
    {/* <Nav.Item>
        <Nav.Link className="nav-side"><Save size={"20px"}/></Nav.Link>
    </Nav.Item> */}
    <Nav.Item>
        <Nav.Link className="nav-side" eventKey="link-1"><PlayFill size={"20px"}/></Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link className="nav-side" eventKey="link-1"><ArrowReturnLeft size={"20px"}/></Nav.Link>
    </Nav.Item>
    <Nav.Item>
        <Nav.Link className="nav-side" eventKey="link-1"><CloudUploadFill size={"20px"}/></Nav.Link>
    </Nav.Item>

    </Nav>
    </div>
  )
}

export default GcSideBar;