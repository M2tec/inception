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

    let { menu, files, sourceData, returnData, openFiles, currentFileIndex, theme } = state;
    // console.log({ files: files })
    // console.log({ action: action })

    function saveStateFilesAndData(saveState){
        console.log("save State and Data")

        console.log({saveState:saveState})
        saveState.returnData.forEach((element) => console.log(element.id + " " + element.data))

        let newState = {...saveState}

        // Save file data into the correct data object
        switch (saveState.menu) {
            case "files": {
                // console.log("case file")
                newState = {...saveState, files:sourceData}
                break;
            }
            case "returndata": {
                // console.log("case return")
                newState = {...saveState, files:returnData}
                break;
            }
            default:
                console.log('not a file menu')
        }

        // console.log({newState:newState})
        localStorage.setItem('state', JSON.stringify(newState))
        return newState
    }

    function saveState(state){
        // console.log({oldState:state})

        let newState = {}

        // Save file data into the correct data object
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
        return newState;
    }


    switch (action.type) {


        case 'menu-change': {
            console.log(action.id)

            
            let newState = {}   
            let newData = {}
            newData.items = files 
    
            let fileList = []

            // Swap the desired data into the files object of rendering
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
            // saveState(newState)

            newState = { ...newState, menu: action.id, currentFileIndex, openFiles};
            console.log(newState)
            return newState;
        }

        case 'theme': {
            theme == "dark" ? theme = "light" : theme = "dark"

            document.querySelector("body").setAttribute('data-theme', theme)

            let newState = { ...state, theme };
            saveState(newState)                        
            return newState
        }

        case 'selected': {
            console.log("selected")
            console.log({selState:state})
            console.log({selectedFiles:files})
            // console.log("s1: " + sourceData[0].data)
            // console.log({sourceData:sourceData})
            // console.log({returnData:returnData})
            

            openFiles.indexOf(action.file.id) === -1 ? openFiles.push(action.file.id) : console.log("Item already open");
            let newFileIndex = action.file.id;

            console.log(menu)
            let newState = {...state, openFiles, currentFileIndex:newFileIndex}
            // if ( menu == 'files') {
            //     newState = { ...state, openFiles, currentFileIndex:newFileIndex };
            // } else {
            //     newState = { ...state, openFiles, currentFileIndex:newFileIndex };
            // }
            
            let returnState = saveStateFilesAndData(newState)                        
            return returnState
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

            let returnState = saveStateFilesAndData(newState)                        
            return returnState
        }

        case 'renamed': {
            console.log("Renamed file")
            console.log({action:action})
            // console.log({files:files})
            // console.log({sourceData:sourceData})
            // console.log({returnData:returnData})

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
            
            let returnState = saveStateFilesAndData(newState)                        
            return returnState    
        }

        case 'changed-data': {
            console.log("Changed data")
            console.log({action:action})

            console.log(action.file.data)
            console.log("f1: " + files[0].data)
            console.log({files:files})
            // console.log("d1: " + returnData[0].data)
            // console.log("d2: " + returnData[1].data)
            //console.log({sourceData:sourceData})

            let newFiles = files.map(f => {
                if (f.id === action.file.id) {
                    // console.log({f1:f})
                    return action.file;
                } else {
                    // console.log({f2:f})
                    return f;
                }
            });


            let newState = {}

            // Save file data into the correct data object
            switch (state.menu) {
                case "files": {
                    // console.log("case file")
                    newState = {...state, sourceData: newFiles}
                    break;
                }
                case "returndata": {
                    // console.log("case return")
                    newState = {...state, returnData: newFiles}
                    break;
                }
                default:
                    console.log('not a file menu')
            }

            // let newState = { ...state, sourceData:newFiles };
            // console.log({newState:newState})
            // saveState(newState)  
            localStorage.setItem('state', JSON.stringify(newState))

            return {...newState}       
        }

        case 'duplicate': {
            console.log("duplicate")
            console.log({dupState:state})
            let ids = files.map((file) => file.id);
            var largest = Math.max.apply(0, ids);

            let duplicate_file_array = files.filter((file) => file.id == action.file.id)

            let duplicate_file = duplicate_file_array[0]
            let new_file_name_split = action.file.name.split(".", 2)
            let new_file_name = new_file_name_split[0] + "-1." + new_file_name_split[1]

            let newFile = { ...duplicate_file, id: largest + 1, name: new_file_name }
            let newFiles = [...files, newFile]

            let newState = { };
            if ( menu == 'files') {
                newState = { ...state, files: newFiles };
            } else {
                newState = { ...state, files: newFiles };
            }

            console.log({dupNewState:newState})
            
            let returnState = saveStateFilesAndData(newState)                        
            return returnState
        }

        case 'deleted': {
            console.log("delete")
            let newOpenFiles = openFiles
            console.log({newOpenFiles:newOpenFiles})
            newOpenFiles = openFiles.filter((fileIndex) => fileIndex !== action.id)
            
            if (action.id == currentFileIndex) {            
                currentFileIndex = newOpenFiles[0]
            }

            let newFiles = files.filter(t => t.id !== action.id)

            
            let newState = { ...state, files: newFiles, openFiles: newOpenFiles, currentFileIndex }
            
            let returnState = saveStateFilesAndData(newState)   
            console.log({delReturnState:returnState})                     
            return returnState
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let storageState = JSON.parse(localStorage.getItem('state'))
console.log({ LoadFromStorage: storageState })

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
    initialState = {...storageState,
        menu: "files",
        files: storageState.sourceData,
        openFiles: [0],
        currentFileIndex: 0,
        theme: storageState.theme
    };
}

console.log(initialState)