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
import { AppContext } from '../AppContext';

export default function SearchAppBar() {
  const { context, setContext } = React.useContext(AppContext)

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
            <Dropdown.Item eventKey="2">Create private testnet</Dropdown.Item>
            <Dropdown.Item eventKey="3" active>
              Run
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">About</Dropdown.Item>
          </DropdownButton>
        <Navbar.Brand className='nav-brand' href="#home">Inception</Navbar.Brand>

        <InputGroup className="ms-5 me-5">
          <InputGroup.Text id="basic-addon3">
            Local
          </InputGroup.Text>
          <Form.Control id="basic-url"
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm" 
                    placeholder={context.name}/>
        </InputGroup>

        <div className='me-3'>
        <DarkMode/>
        </div>
      </Navbar>
    </div>
  );
}