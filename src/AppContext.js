import React, { createContext, useContext, useReducer } from "react";
import project from "./data/Token_Locking/project.js";
import PropTypes from 'prop-types';

// const AppContext = React.createContext(null);

const FilesContext = createContext(null);
const FilesDispatchContext = createContext(null);

export function StateProvider({ children }) {

    const [files, dispatch] = useReducer(stateReducer, initialState);

    return (
        <FilesContext.Provider value={files}>
            <FilesDispatchContext.Provider value={dispatch}>
                {children}
            </FilesDispatchContext.Provider>
        </FilesContext.Provider>
    )

}

export function useAppState() {
    return useContext(FilesContext);
}

export function useStateDispatch() {
    return useContext(FilesDispatchContext);
}

function stateReducer(state, action) {

    let { menu, files, openFiles, currentFileIndex, theme } = state;
    // console.log({ files: files })
    // console.log({ action: action })

    function saveState(state){
        // console.log({oldState:state})

        let newState = {}
        switch (state.menu) {
            case "files": {
                // console.log("case file")
                newState = {...state, sourceData: files}
                break;
            }
            case "returndata": {
                // console.log("case return")
                newState = {...state, returnData: files}
                break;
            }
            default:
                console.log('not a file menu')
        }

        // console.log({newState:newState})
        localStorage.setItem('state', JSON.stringify(newState))
        return newState
    }

    switch (action.type) {
        case 'menu-change': {
            console.log(action.id)

            let newState = {}   
            let newData = {}
            newData.items = files 
    
            let fileList = []
            switch (action.id) {
                case "files": {
                    console.log("act.files")
                    newState = {...state, files: state.sourceData}

                    fileList = newState.files.map((file) => file.id)

                    console.log({fileList:fileList})
                    let lowestId = Math.min(...fileList)
                    openFiles = [lowestId]
                    currentFileIndex = lowestId

                    break;
                }
                case "returndata": {
                    console.log("act.returndata")                
                    
                    newState = {...state, files: state.returnData}

                    fileList = newState.files.map((file) => file.id)
                    console.log({fileList:fileList})

                    let lowestId = Math.min(...fileList)
                    openFiles = [lowestId]
                    currentFileIndex = lowestId

                    break;
                }
            }
            saveState(newState)

            newState = { ...newState, menu: action.id, currentFileIndex, openFiles};
            console.log(newState)
            return newState;
        }

        case 'theme': {
            theme == "dark" ? theme = "light" : theme = "dark"

            document.querySelector("body").setAttribute('data-theme', theme)

            let newState = { ...state, theme };
            return saveState(newState);;
        }
        case 'selected': {
            openFiles.indexOf(action.file.id) === -1 ? openFiles.push(action.file.id) : console.log("Item already open");
            currentFileIndex = action.file.id;

            let newState = { ...state, openFiles, currentFileIndex };
            return saveState(newState);;
        }
        case 'closed': {
            let newOpenFiles = openFiles
            if (openFiles.length > 1) {

                newOpenFiles = openFiles.filter((fileId) => fileId !== action.id)


                if (action.id == currentFileIndex) {
                    currentFileIndex = newOpenFiles.slice(-1)[0]
                    console.log(currentFileIndex)
                }
            }

            let newState = { ...state, openFiles: newOpenFiles, currentFileIndex };
                        
            return saveState(newState);;
        }
        case 'added': {

            return [...files, {
                id: action.id,
                name: action.name,
            }];
        }
        case 'changed': {
            console.log("Changed")
            // console.log({action:action})
            // console.log({files:files})    

            let newFiles = files.map(f => {
                if (f.id === action.file.id) {
                    // console.log({f1:f})
                    return action.file;
                } else {
                    // console.log({f2:f})
                    return f;
                }
            });
            // console.log({newFiles:newFiles})


            let newState = { ...state, files: newFiles };
            // console.log({newState:newState})
            return saveState(newState);;        
        }
        case 'duplicate': {
            let ids = files.map((file) => file.id);
            var largest = Math.max.apply(0, ids);

            let duplicate_file_array = files.filter((file) => file.id == action.file.id)

            let duplicate_file = duplicate_file_array[0]
            let new_file_name_split = action.file.name.split(".", 2)
            let new_file_name = new_file_name_split[0] + "-1." + new_file_name_split[1]
            let new_file = { ...duplicate_file, id: largest + 1, name: new_file_name }
            let newFiles = [...files, new_file]

            let newState = { ...state, files: newFiles };
            return saveState(newState);;
        }
        case 'deleted': {

            let newOpenFiles = openFiles
            newOpenFiles = openFiles.filter((fileIndex) => fileIndex !== action.id)
            
            if (action.id == currentFileIndex) {            
                currentFileIndex = newOpenFiles[0]
            }

            let newFiles = files.filter(t => t.id !== action.id)

            let newState = { ...state, files: newFiles, openFiles: newOpenFiles, currentFileIndex }
            return saveState(newState);;
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let storageState = JSON.parse(localStorage.getItem('state'))
console.log({ storage: storageState })

let initialState = {}

if (storageState == null) {
  
    initialState = {
        menu: "files",
        sourceData: project.dataItems.sourcedata.items,
        returnData: project.dataItems.returndata.items,
        files: project.dataItems.sourcedata.items,
        openFiles: [0],
        currentFileIndex: 0,
        theme: "light"
    }
} else {
    initialState = storageState;
}

console.log(initialState)