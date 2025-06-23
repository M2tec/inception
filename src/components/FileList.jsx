import React from 'react';
import { useAppState, useStateDispatch } from '../AppContext';
import {
  FiletypeJson,
  BlockquoteLeft,
  FileEarmarkCode,
  Trash,
  Pencil,
  Save,
  Stickies,
  FilePlay
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

  let returnDataFiles = files.filter((file) => file.parentId === expandIndex && !file.name.includes("code"))

  let codeFile = files.filter((file) => file.parentId === expandIndex && file.name.includes("code"))

  let returnDataFileAmount = 0;
  if (returnDataFiles.length > 0) {
    returnDataFileAmount = returnDataFiles.length
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
              {/* {console.log({codeFile:codeFile})} */}
              {codeFile !== undefined ?
                codeFile.map((file, index) => (
                  <div key={index} className='file-return-data-item'>
                    <File key={index} file={file} />
                  </div>))
                : null}

              {returnDataFiles.length > 0 ?
                <>
                  {returnDataFiles.map(returnItem =>
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

function File({ file }) {
  // console.log({file})
  const [isEditing, setIsEditing] = React.useState(false);
  let { currentFileIndex } = useAppState();
  const dispatch = useStateDispatch();
  let [editName, setEditName] = React.useState(file.name)

  // console.log(file)
  let fileContent;

  function handleSaveName(e) {

    console.log("handleSaveName")
    dispatch({
      type: 'renamed',
      file: {
        ...file,
        name: editName
      }
    })
    setIsEditing(false)
  }

  function handleKeydown(e) {
    // console.log("keyDown")
    if (e.key === "Enter") {
      handleSaveName(e)
    }
  }

  if (isEditing) {

    fileContent = (

      <div className='file-item-child'>
        <input
          value={editName}
          onChange={e => {
            // console.log({ e: e.target.value })
            setEditName(e.target.value)
          }}
          onKeyDown={(e) => handleKeydown(e)}
        />
        <Save size={12}
          onClick={(e) => handleSaveName(e)}
        />
      </div>
    );
  } else {

    fileContent = (<>
      <div className='file-item-child'>
        <span
          onClick={(e) => {
            dispatch({
              type: 'selected',
              file: file
            });
          }}

          className='file-item-text'> {file.name}</span>
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

        <span>{fileContent}</span>

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

  let extension = ""
  try {
    [extension] = name.split(".").slice(-1)
  } catch (error) {
    console.log("Malformed extension")
  }

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
    case 'code':
      fileIcon = (<FilePlay size={"15px"} className="file-icon" />);
      break;
    default:
      fileIcon = (<BlockquoteLeft size={"15px"} className="file-icon" />);
  }

  return (<>{fileIcon}</>)

}


