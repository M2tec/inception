import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { List, Search } from 'react-bootstrap-icons';
import DarkMode from './DarkMode/DarkMode'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function SearchAppBar() {
  return (
    <div>
      <Navbar>
        <Nav.Link className='m-3'><List size="20px" /></Nav.Link>
        <Navbar.Brand className='nav-brand' href="#home">GC Playground</Navbar.Brand>

        <InputGroup className="ms-5 me-5">
          <InputGroup.Text id="basic-addon3">
            Local: Token locking
          </InputGroup.Text>
          <Form.Control id="basic-url"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm" />
        </InputGroup>

        <div className='me-3'>
        <DarkMode/>
        </div>
      </Navbar>
    </div>
  );
}