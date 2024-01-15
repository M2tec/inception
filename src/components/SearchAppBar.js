import * as React from 'react';
import DarkMode from './DarkMode/DarkMode'
import { useAppState, useStateDispatch } from '../AppContext.js';

import {
  Trash,
} from 'react-bootstrap-icons';

export default function SearchAppBar() {
  let { currentProjectIndex, projects } = useAppState();
  const dispatch = useStateDispatch();

  let [searchText, setSearchText] = React.useState("")
  let [showQuery, setShowQuery] = React.useState(false)

  

  const delay = async (ms) => {
    return new Promise((resolve) =>
      setTimeout(resolve, ms));
  };

  function SearchList() {
    let currentProject = projects[currentProjectIndex]

    let inactiveProjects = projects.filter((item) => item !== currentProject);
    let queryList = inactiveProjects.filter((item) => item.includes(searchText));

    return (<>
      {showQuery === true ?
        <div className='dropdown-content'>
          {queryList.map(item => (
          <div key={item} className='project-search-item'>
            <SearchItem key={item} project={item} />
            <Trash
            onClick={() => {
              dispatch({
                type: 'delete-project',
                name: item
              });
            }}
            size={12} />
            </div>
          ))}
        </div>
        :
        null}
    </>
    );
  }

  function SearchItem({ project }) {
    return (
      <div
        onClick={() => {
          dispatch({
            type: 'set-project',
            value: project
          });
        }}
        className="dropdown-item" href="#">{project}


      </div>
    );
  }

  function handleChange(value) {
    setSearchText(value)
  }

  function handleFocus() {
    setShowQuery(true)
  }

  const handleBlur = async () => {
    await delay(500);
    setShowQuery(false)
  };

  return (
    <div>
      <div className='navbar'>
        <div className='title'>Inception</div>
        <div className='search-widget'>
          <div className='search-dropdown'>

            <input className='search-input'
              onFocus={(e) => handleFocus()}
              onBlur={(e) => handleBlur()}
              onChange={(e) => handleChange(e.target.value)}
              value={searchText}
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