import * as React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { List } from 'react-bootstrap-icons';
import DarkMode from './DarkMode/DarkMode'

export default function SearchAppBar() {
  return (
    <div className='navbar-x'>
    <Navbar>
        <Nav.Link><List size="20px"/></Nav.Link>
        <Navbar.Brand href="#home">GC Playground</Navbar.Brand>
        <div class="container">
    <div class="row">
        <div class="col-12">
            <div class="input-group">
                <input class="form-control border-secondary py-2" type="search" value="search"/>
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

        <DarkMode/>
    </Navbar>
    </div>
  );
}