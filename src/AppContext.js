import React, { createContext, useContext, useReducer } from "react";
import Token_Locking from "./data/Token_Locking.js";
import DAO_Demo from "./data/DAO_Demo.js";
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

    let { menu, files, openFiles, currentFileIndex, theme } = state;
    // console.log({ files: files })
    // console.log({ action: action })

    function saveState(state) {
        localStorage.setItem("data_" + state.name, JSON.stringify(state))
    }

    function LoadState(state) {
        let newState = JSON.parse(localStorage.getItem("data_" + state.name))
        return newState
    }

    switch (action.type) {

        case 'menu-change': {
            console.log('menu-change')
            console.log(action.id)

            return {...state};
        }

        case 'theme': {
            console.log('theme')
            theme === "dark" ? theme = "light" : theme = "dark"

            document.querySelector("body").setAttribute('data-theme', theme)

            let newState = { ...state, theme };
            saveState(newState)
            return newState
        }

        case 'selected': {
            console.log("selected")
            // console.log({selState:state})
            console.log({action:action})
            
            let newFileIndex = 0

 
            openFiles.indexOf(action.file.id) === -1 ? openFiles.push(action.file.id) : console.log("Item already open");
            newFileIndex = action.file.id;


            let newState = { ...state, openFiles, currentFileIndex: newFileIndex };
            // newState.files.forEach((element) => console.log("f " + element.id + " " + element.data))           
            saveState(newState)     
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
            saveState(newState)
            return newState
        }

        case 'renamed': {
            console.log("Renamed file")
            console.log({ action: action })
            // console.log({files:files})
            // console.log({sourceData:sourceData})

            let newFiles = files.map(f => {
                if (f.id === action.file.id) {
                    return action.file;
                } else {
                    return f;
                }
            });

            let newState = { ...state, files: newFiles };
            saveState(newState)
            return newState
        }

        case 'changed-data': {
            console.log("Changed data")

            let newFiles = files.map(f => {
                if (f.id === action.file.id) {
                    return action.file;
                } else {
                    return f;
                }
            });

            let newState = { ...state, files: newFiles }
            saveState(newState)
            return { ...newState }
        }

        case 'duplicate': {
            console.log("duplicate")
            // console.log({dupState:state})

            state.files.forEach((element) => console.log(element.id + " " + element.data))

            let ids = files.map((file) => file.id);
            var largest = Math.max.apply(0, ids);

            // New file name
            let newFileNameSplit = action.file.name.split(".", 2)
            let newFileName = newFileNameSplit[0] + "-1." + newFileNameSplit[1]

            let dupFile = action.file
            let newFile = { ...dupFile, id: largest + 1, name: newFileName }
            let newFiles = [...files, newFile]
            // console.log({dupNewfiles:newFiles})

            let newState = { ...state, files: newFiles };
            
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

            if (action.id === currentFileIndex) {
                currentFileIndex = newOpenFiles[0]
            }

            let newFiles = files.filter(t => t.id !== action.id)
            console.log({ delNewFiles: newFiles })

            let newState = {}
            // Save file data into the correct data object
            console.log("case file")
            newState = { ...state, files: newFiles, openFiles: newOpenFiles, currentFileIndex }
   
            saveState(newState)
            console.log({delNewState:newState})
            return newState
        }

        case 'receive-data': {
            console.log("act.recieve-data")
            console.log({ action: action })

            let ids = state.files.map((file) => file.id);
            let largest = Math.max.apply(0, ids);

            moment.locale('en');
            let fileName = "data-" + moment().format('y-M-D_h-m') + ".json"

            // console.log("save item")
            let newItem = {
                id: largest + 1,
                parentId: state.currentFileIndex,
                name: fileName,
                type: "json",
                data: JSON.stringify(action.returnData, null, 4)
            }

            let newFiles = state.files
            newFiles = [...newFiles, newItem]
            
            let newState = { ...state, files: newFiles }

            console.log({receiveNewState:newState})

            saveState(newState)
            return {...newState}
        }

        case 'load-from-storage': {
            console.log('load-from-storage')

            let storageState = LoadState(state)

            console.log({ Load: storageState })

            // let ids = storageState.files.map((file) => file.id);
            // let largest = Math.max.apply(0, ids);

            // let newState = {
            //     currentFileIndex: largest,
            //     openFiles: largest,
            //     ...storageState,
            // };
        

            console.log({ Load: storageState })
            return storageState;
        }

        case 'edit-project-name':{
            console.log("edit-project-name")
            console.log({action:action})
            return {...state, name: action.value}
        }

        case 'change-project':{
            console.log("change-project")
            console.log({action:action})

            let projectName = action.value;

            let projectData = JSON.parse(localStorage.getItem('data_' + projectName))

            console.log({projectData:projectData})

            return {...state, 
                    name: projectName, 
                    currentFileIndex: 0,
                    openFiles: [0],
                    files: projectData.files,
                    }
        }
        default: {
        throw Error('Unknown action: ' + action.type);
    }
}
}

let appData = JSON.parse(localStorage.getItem('app-data'))

if (appData == null) {
    console.log({projects:projects})
    appData = projects

    localStorage.setItem('app-data', JSON.stringify(projects))
    localStorage.setItem('data_Token_Locking', JSON.stringify(Token_Locking))
    localStorage.setItem('data_DAO_Demo', JSON.stringify(DAO_Demo))
} 

let project = Token_Locking;

console.log({projectList:appData})

let stateFile = "data_" + appData.items[appData.currentProject]
let storageState = JSON.parse(localStorage.getItem(stateFile))
console.log({ LoadFromStorage: storageState })

let initialState = {}

if (storageState == null) {
    console.log("New from default data")
    initialState = {
        name: project.name,
        currentFileIndex: 0,
        openFiles: [0],
        files: project.files,
        theme: "dark",
        projectList: projects.items
    }
} else {
    console.log("Load from storage")
    initialState = {
        ...storageState,
        // currentFileIndex: 0,
        // openFiles: [0],
        projectList: appData
    };
}

console.log({INIT:initialState})