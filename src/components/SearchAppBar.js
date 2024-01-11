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

  const [query, setQuery] = React.useState("");

  const getFilteredItem = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((song) => song.name.includes(query));
  }

  function SearchList() {

    let queryList = projectList.items.filter((item) => item.includes(name));
    console.log({ queryList: queryList })

    return (
      <ul className='dropdown-content'>
        {queryList.map(item => (

          <SearchItem key={item} project={item} />
        ))}
      </ul>
    );
  }

  function SearchItem({ project }) {
    return (
      <li>
        <a class="dropdown-item" href="#">{project}</a>
      </li>
    );
  }

  return (
    <div>
      <div className='navbar'>
        <div className='title'>Inception</div>
        <div className='search-widget'>
        <DropdownButton
          variant="outline-secondary"
          title="Local"
          id="input-group-dropdown-1"
        >
          <Dropdown.Item href="#">Cloud</Dropdown.Item>
          <Dropdown.Item href="#">Local</Dropdown.Item>
        </DropdownButton>
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