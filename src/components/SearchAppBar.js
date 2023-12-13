import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { List, Search } from 'react-bootstrap-icons';
import DarkMode from './DarkMode/DarkMode'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function SearchAppBar() {
  return (
    <div>
      <Navbar>
        <DropdownButton className='ms-3 me-3'
            as={ButtonGroup}
            key='Primary'
            id={`dropdown-variants-primary`}
            variant='secondary'
            title={<List size="20px" />}
          >
            <Dropdown.Item eventKey="1">Local files</Dropdown.Item>
            <Dropdown.Item eventKey="2">Deploy</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Run
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">About</Dropdown.Item>
          </DropdownButton>
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