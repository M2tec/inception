import React, { createContext, useContext, useReducer } from "react";
import project from "./data/Token_Locking.js";
import projects from "./data/project-list.js";

import moment from 'moment';

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

    function saveStateFilesAndData(saveState) {
        console.log("save State and Data")

        console.log({ saveState: saveState })
        saveState.returnData.forEach((element) => console.log(element.id + " " + element.data))

        let newState = { ...saveState }

        // Save file data into the correct data object
        switch (saveState.menu) {
            case "files": {
                // console.log("case file")
                newState = { ...saveState, files: sourceData }
                break;
            }
            case "returndata": {
                // console.log("case return")
                newState = { ...saveState, files: returnData }
                break;
            }
            default:
                console.log('not a file menu')
        }

        // console.log({newState:newState})
        saveState(newState)
        return newState
    }

    function saveState(state) {
        localStorage.setItem(state.name + '-state', JSON.stringify(state))
    }

    function LoadState(state) {
        let newState = JSON.parse(localStorage.getItem(state.name + '-state'))
        return newState
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
                    newState = { ...state, files: state.sourceData }

                    fileList = newState.files.map((file) => file.id)

                    console.log({ fileList: fileList })
                    let lowestId = Math.min(...fileList)
                    openFiles = [lowestId]
                    currentFileIndex = lowestId

                    break;
                }
                case "returndata": {
                    console.log("act.returndata")

                    newState = { ...state, files: state.returnData }

                    fileList = newState.files.map((file) => file.id)
                    console.log({ fileList: fileList })

                    let lowestId = Math.min(...fileList)
                    openFiles = [lowestId]
                    currentFileIndex = lowestId

                    break;
                }
            }
            // saveState(newState)

            newState = { ...newState, menu: action.id, currentFileIndex, openFiles };
            console.log(newState)
            return newState;
        }

        case 'theme': {
            theme === "dark" ? theme = "light" : theme = "dark"

            document.querySelector("body").setAttribute('data-theme', theme)

            let newState = { ...state, theme };
            saveState(newState)
            return newState
        }

        case 'selected': {
            console.log("selected")
            // console.log({selState:state})

            openFiles.indexOf(action.file.id) === -1 ? openFiles.push(action.file.id) : console.log("Item already open");
            let newFileIndex = action.file.id;

            let newState = { ...state }
            if (menu === 'files') {
                newState = { ...state, files: sourceData, openFiles, currentFileIndex: newFileIndex };
            } else {
                newState = { ...state, files: returnData, openFiles, currentFileIndex: newFileIndex };
            }
            // newState.files.forEach((element) => console.log("f " + element.id + " " + element.data))
            // newState.returnData.forEach((element) => console.log("r " + element.id + " " + element.data))                      
            return newState
        }

        case 'closed': {
            let newOpenFiles = openFiles
            if (openFiles.length > 1) {

                newOpenFiles = openFiles.filter((fileId) => fileId !== action.id)

                if (action.id === currentFileIndex) {
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
            console.log({ action: action })
            // console.log({files:files})
            // console.log({sourceData:sourceData})
            // console.log({returnData:returnData})

            let newFiles = files.map(f => {
                if (f.id === action.file.id) {
                    return action.file;
                } else {
                    return f;
                }
            });

            let newState = {};
            if (menu === 'files') {
                newState = { ...state, files: newFiles, sourceData: newFiles, };
            } else {
                newState = { ...state, files: newFiles, returnData: newFiles, };
            }

            return newState
        }

        case 'changed-data': {
            console.log("Changed data")
            console.log({ action: action })

            console.log(action.file.data)
            console.log("f1: " + files[0].data)
            console.log({ files: files })
            // console.log("d1: " + returnData[0].data)
            // console.log("d2: " + returnData[1].data)
            //console.log({sourceData:sourceData})

            let newFiles = files.map(f => {
                if (f.id === action.file.id) {
                    return action.file;
                } else {
                    return f;
                }
            });


            let newState = {}

            // Save file data into the correct data object
            switch (state.menu) {
                case "files": {
                    // console.log("case file")
                    newState = { ...state, sourceData: newFiles }
                    break;
                }
                case "returndata": {
                    // console.log("case return")
                    newState = { ...state, returnData: newFiles }
                    break;
                }
                default:
                    console.log('not a file menu')
            }

            // let newState = { ...state, sourceData:newFiles };
            // console.log({newState:newState})
            saveState(newState)

            return { ...state }
        }

        case 'duplicate': {
            console.log("duplicate")
            // console.log({dupState:state})

            state.returnData.forEach((element) => console.log(element.id + " " + element.data))

            let ids = files.map((file) => file.id);
            var largest = Math.max.apply(0, ids);

            // New file name
            let newFileNameSplit = action.file.name.split(".", 2)
            let newFileName = newFileNameSplit[0] + "-1." + newFileNameSplit[1]

            let dupFile = action.file
            let newFile = { ...dupFile, id: largest + 1, name: newFileName }
            let newFiles = [...files, newFile]
            // console.log({dupNewfiles:newFiles})

            let newState = {};
            if (menu == 'files') {
                newState = { ...state, files: newFiles, sourceData: newFiles, };
            } else {
                newState = { ...state, files: newFiles, returnData: newFiles, };
            }
            saveState(newState)
            // console.log({dupNewState:newState})

            return newState
        }

        case 'deleted': {
            console.log("delete")
            console.log({delState:state})
            let newOpenFiles = openFiles
            console.log({ newOpenFiles: newOpenFiles })
            newOpenFiles = openFiles.filter((fileIndex) => fileIndex !== action.id)

            if (action.id == currentFileIndex) {
                currentFileIndex = newOpenFiles[0]
            }

            let newFiles = files.filter(t => t.id !== action.id)
            console.log({ delNewFiles: newFiles })

            let newState = {}
            // Save file data into the correct data object
            switch (state.menu) {
                case "files": {
                    console.log("case file")
                    newState = { ...state, files: newFiles, sourceData: newFiles, openFiles: newOpenFiles, currentFileIndex }
                    break;
                }
                case "returndata": {
                    console.log("case return")
                    newState = { ...state, files: newFiles, returnData: newFiles, openFiles: newOpenFiles, currentFileIndex }
                    break;
                }
                default:
                    console.log('not a file menu')
            }

            saveState(newState)
            console.log({delNewState:newState})
            return newState
        }

        case 'receive-data': {
            console.log("act.recieve-data")
            console.log({ action: action })

            let newReturnData = state.returnData

            let ids = newReturnData.map((file) => file.id);
            var largest = Math.max.apply(0, ids);

            moment.locale('en');
            let fileName = "data-" + moment().format('y-M-D_h-m') + ".json"

            // console.log("save item")
            let newItem = {
                id: largest + 1,
                name: fileName,
                type: "json",
                data: JSON.stringify(action.returnData, null, 4)
            }

            newReturnData = [...returnData, newItem]
            console.log(newReturnData)
            let newState = { ...state, menu: "returndata", files: newReturnData, returnData: newReturnData }

            saveState(newState)

            return newState
        }

        case 'load-from-storage': {
            console.log('load-from-storage')

            let storageState = LoadState(state)

            console.log({ Load: storageState })

            let ids = storageState.returnData.map((file) => file.id);
            var largest = Math.max.apply(0, ids);

            let newState = {
                currentFileIndex: largest,
                openFiles: largest,
                ...storageState,
            };
        

            console.log({ Load: newState })
            return newState;
        }

        case 'edit-project-name':{
            console.log("edit-project-name")
            console.log({action:action})
            return {...state, name: action.value}
        }
        default: {
        throw Error('Unknown action: ' + action.type);
    }
}
}

let projectList = JSON.parse(localStorage.getItem('project-list'))

if (projectList == null) {
    console.log({projects:projects})
    projectList = projects
    localStorage.setItem('project-list', JSON.stringify(projects))
} 

console.log({projectList:projectList})

let stateFile = projectList.items[projectList.currentProject] + "-state"
let storageState = JSON.parse(localStorage.getItem(stateFile))
console.log({ LoadFromStorage: storageState })

let initialState = {}

if (storageState == null) {

    initialState = {
        name: project.name,
        menu: "files",
        sourceData: project.dataItems.sourcedata.items,
        returnData: project.dataItems.returndata.items,
        files: project.dataItems.sourcedata.items,
        openFiles: [0],
        currentFileIndex: 0,
        theme: "dark",
        projectList: projectList
    }
} else {
    initialState = {
        ...storageState,
        menu: "files",
        files: storageState.sourceData,
        openFiles: [0],
        currentFileIndex: 0,
        theme: storageState.theme,
        projectList: storageState.projectList
    };
}

console.log(initialState)