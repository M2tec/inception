import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { List } from 'react-bootstrap-icons';
import DarkMode from './DarkMode/DarkMode'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAppState, useStateDispatch } from '../AppContext.js';

export default function SearchAppBar() {
  let { name, projectList } = useAppState();
  const dispatch = useStateDispatch();

  function SearchList() {

    let queryList = projectList.items.filter((item) => item.includes(name));
    console.log({ queryList: queryList })

    return (<>
    {console.log({queryList:queryList})}
      {queryList.length > 1 ?
      <div className='dropdown-content'>
        {queryList.map(item => (

          <SearchItem key={item} project={item} />
        ))}
      </div>:
      <div></div>}
      </>
    );
  }

  function SearchItem({ project }) {
    return (
      <div
        onClick={() => {
          dispatch({
            type: 'change-project',
            value: project
          });
        }}
        className="dropdown-item" href="#">{project}</div>
    );
  }

  return (
    <div>
      <div className='navbar'>
        <div className='title'>Inception</div>
        <div className='search-widget'>
          <div className='search-dropdown'>

            <input className='search-input'
              onChange={(e) => {
                dispatch({
                  type: 'edit-project-name',
                  value: e.target.value
                });
              }}
              value={name}
              placeholder='Search...'>

            </input>
            <SearchList />
          </div>
        </div>
        <DarkMode />
      </div>
    </div>
  );
}