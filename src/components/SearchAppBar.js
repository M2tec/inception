import * as React from 'react';
import DarkMode from './DarkMode/DarkMode'
import { useAppState, useStateDispatch } from '../AppContext.js';

export default function SearchAppBar() {
  let { projects } = useAppState();
  const dispatch = useStateDispatch();

  let [searchText, setSearchText] = React.useState("")
  let [showQuery, setShowQuery] = React.useState(false)
 
  const delay = async (ms) => {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
  };

  function SearchList() {
    
    let queryList = projects.filter((item) => item.includes(searchText));

    return (<>
      {showQuery === true ?
      <div className='dropdown-content'>
        {queryList.map(item => (
          <SearchItem key={item} project={item} />
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
        className="dropdown-item" href="#">{project}</div>
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