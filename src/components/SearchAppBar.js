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
  let [queryList, setQueryList] = React.useState("")


  const delay = async (ms) => {
    return new Promise((resolve) =>
      setTimeout(resolve, ms));
  };

  function SearchList() {

    // let currentProject = projects[currentProjectIndex]

    // console.log(Object.keys(localStorage))

    // let inactiveProjects = queryList.filter((item) => item.id !== "data_" + currentProject);
    // let queryList = inactiveProjects.filter((item) => item.includes(searchText));

    return (<>
      {showQuery === true ?
        <div className='dropdown-content'>
          {queryList.map(item => (
            <div key={item.id} className='project-search-item'>
              <SearchItem key={item.id} project={item} />
              <Trash
                onClick={() => {
                  dispatch({
                    type: 'delete-project',
                    project: item
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
            project: project
          });
        }}
        className="dropdown-item" href="#">{project.data.name}


      </div>
    );
  }

  function handleChange(value) {
    setSearchText(value)
  }

  function handleFocus() {

    let projectKeys = Object.keys(localStorage).filter((project) => project.includes('data_'))

    let projectData = projectKeys.map((key) => (
                                    {
                                      id: key,
                                      data: JSON.parse(localStorage.getItem(key))
                                    }
                                    ))

    // let projectNames = projectData.map((data) => data.name)
    // console.log(projectData)


    // let projectNames = projectsStorage.map((project) => project.name)

    console.log(projectData)
    setQueryList(projectData)


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