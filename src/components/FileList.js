import { useState } from 'react';
import { useFiles, useFilesDispatch } from '../AppContext.js';
import {
  FiletypeJson,
  Trash,
  Pencil,
  Save,
  Stickies
} from 'react-bootstrap-icons';

export default function FilesList() {

  const files = useFiles();
  // console.log(files)
  return (
    <ul>
      {files.map(item => (
        <File file={item} />
      ))}
    </ul>
  );
}

function File({ file }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useFilesDispatch();

  // console.log(file)
  let fileContent;
  if (isEditing) {
    fileContent = (

      <div className='file-item-child'>
        <input

          value={file.name}
          onChange={e => {
            dispatch({
              type: 'changed',
              file: {
                ...file,
                text: e.target.value
              }
            });
          }} />
        <Save size={12} onClick={() => setIsEditing(false)} />

      </div>
    );
  } else {
    fileContent = (
      <div className='file-item-child'>
        <span className='file-item-text'>{file.name}</span>
        <Pencil size={12} className='file-item-child' onClick={() => setIsEditing(true)} />
      </div>
    );
  }
  // className={isActive ? 'file-item-selected file-item' : 'file-item'} 

  return (
    <li key={file.id}>
      <label className='file-item'>
        <FiletypeJson size={"15px"} className="file-icon" />

        <span
        // onClick={onClick} 
        >{fileContent}</span>

        <Stickies
          onClick={() => {
            dispatch({
              type: 'duplicate',
              id: file.id
            });
          }}
          size={12} />


        <Trash
          onClick={() => {
            dispatch({
              type: 'deleted',
              id: file.id
            });
          }}
          size={12} />

      </label>
    </li>
  );
}
