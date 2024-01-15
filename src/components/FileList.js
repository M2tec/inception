import { useState } from 'react';
import { useAppState, useStateDispatch } from '../AppContext.js';
import {
  FiletypeJson,
  BlockquoteLeft,
  FileEarmarkCode,
  Trash,
  Pencil,
  Save,
  Stickies
} from 'react-bootstrap-icons';

export default function FilesList() {
  let { files, currentFileIndex } = useAppState();

  let filesToplevel = files.filter((file) => file.parentId === -1)

  let currentFileList = files.filter((file) => file.id === currentFileIndex)
  let currentFile = currentFileList[0]

  // console.log({currentFile:currentFile})
  let expandIndex = 0;
  if (currentFile.parentId === -1) {
    // console.log("parent")
    expandIndex = currentFileIndex;
  } else {
    expandIndex = currentFile.parentId;
  }
  // console.log({expandIndex:expandIndex})

  let fileChildren = files.filter((file) => file.parentId === expandIndex)
  // console.log({fileChildren})

  // {console.log(file.returnData)}
  let returnDataFileAmount = 0;
  if (fileChildren.length > 0) {
    returnDataFileAmount = fileChildren.length
    if (returnDataFileAmount > 5) {
      returnDataFileAmount = 5;
    }
  }

  return (
    <ul className='file-list'>
      {filesToplevel.map(item => (
        <span key={item.id}>

          <File key={item.id} file={item} />

          {item.id === expandIndex ?
            <>

              {fileChildren.length > 0 ?
                <>
                  {fileChildren.map(returnItem =>
                    <div key={returnItem.id} className='file-return-data-item'>
                      <File key={returnItem.id} file={returnItem} />
                    </div>
                  )}
                </>
                : null}

            </>

            : null}

        </span>

      ))}
    </ul>
  );
}

function File({ file, dots }) {
  const [isEditing, setIsEditing] = useState(false);
  let { currentFileIndex } = useAppState();
  const dispatch = useStateDispatch();

  // console.log(file)
  let fileContent;

  if (isEditing) {

    fileContent = (

      <div className='file-item-child'>
        <input
          value={file.name}
          onChange={e => {
            console.log({ e: e.target.value })
            dispatch({
              type: 'renamed',
              file: {
                ...file,
                name: e.target.value
              }
            });
          }} />
        <Save size={12} onClick={() => setIsEditing(false)} />

      </div>
    );
  } else {

    fileContent = (<>
      <div className='file-item-child'>

        <span className='file-item-text'>{file.name}</span>

        <Pencil size={12} className='file-item-child file-operation-icon' onClick={() => setIsEditing(true)} />

      </div>

    </>);
  }



  return (
    <li className="file-list-element" key={file.id}>

      <label
        className={
          currentFileIndex === file.id ? 'file-item file-item-selected' : 'file-item'
        }>

        <FileTypeIcon name={file.name} />


        <span
          onClick={(e) => {
            dispatch({
              type: 'selected',
              file: file
            });
          }}>
          {fileContent}</span>

        <Stickies
          className='file-operation-icon'
          onClick={(e) => {
            dispatch({
              type: 'duplicate',
              file: file
            });
          }}
          size={12} />

        <Trash
          className={
            currentFileIndex === file.id ?
              'file-operation-icon trash-selected' : 'file-operation-icon'
          }
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

function FileTypeIcon({ name }) {
  let fileIcon;

  let [extension] = name.split(".").slice(-1)

  switch (extension) {
    case 'json':
      fileIcon = (<FiletypeJson size={"15px"} className="file-icon" />);
      break;
    case 'hl':
        fileIcon = (<FileEarmarkCode size={"15px"} className="file-icon" />);
        break;      
    case 'gcscript':
          fileIcon = (<BlockquoteLeft size={"15px"} className="file-icon" />);
          break;          
    default:
      fileIcon = (<BlockquoteLeft size={"15px"} className="file-icon" />);
  }

  return (<>{fileIcon}</>)

}