import React, { createContext, useContext, useReducer } from "react";

import JSZip from "jszip";
import moment from 'moment';
import { saveAs } from 'file-saver';

// import projects from "./data/project-list.js";
import DAO_Demo from "./data/DAO_Demo.js";
import Token_Locking from "./data/Token_Locking.js";
import GC_Testing from "./data/GC_testing.js";

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

    let { name, files, openFiles, currentFileIndex, theme, network } = state;
    // console.log({ files: files })
    // console.log({ action: action })

    let ids = files.map((file) => file.id);
    let largest = Math.max.apply(0, ids);

    function saveState(state) {
        console.log("saveState")

        let projectData = {
            name: state.name,
            type: state.type,
            currentFileIndex: state.currentFileIndex,
            openFiles: state.openFiles,
            files: state.files,
            network: state.network
        }

        localStorage.setItem("data_" + state.currentProjectIndex, JSON.stringify(projectData))

        let appData = {
            currentProjectIndex: state.currentProjectIndex,
            console: state.console || [],
            advertisement: state.advertisement || true,
            theme: state.theme || "dark",
            network: state.network || "preprod"

        }
        console.log({appData})
        
        localStorage.setItem("app-data", JSON.stringify(appData))
        console.log({saveState:state})
    }

    function LoadState(state) {
        console.log("loadState")
        let appData = JSON.parse(localStorage.getItem("app-data"))

        let loadState = JSON.parse(localStorage.getItem("data_" + appData.currentProjectIndex))
        // console.log("data_" + currentProjectIndex)
        
        let newState = {
            ...loadState,
            ...appData
        };

        console.log({newState})
        return newState
    }

    switch (action.type) {

        case 'menu-change': {
            console.log('menu-change')
            console.log(action.id)

            return { ...state };
        }

        case 'theme': {
            console.log('theme')
            theme === "dark" ? theme = "light" : theme = "dark"

            document.querySelector("body").setAttribute('data-theme', theme)

            let newState = { ...state, theme };
            saveState(newState)
            return newState
        }

        case 'network': {
            console.log('network')
            network === "preprod" ? network = "mainnet" : network = "preprod"

            document.querySelector("body").setAttribute('data-network', network)

            let newState = { ...state, network };
            saveState(newState)
            return newState
        }

        case 'selected': {
            console.log("selected")
            // console.log({selState:state})
            console.log({ action: action })
            // console.log(action.file.id)

            let newFileIndex = 0

            openFiles.indexOf(action.file.id) === -1 ? openFiles.push(action.file.id) : console.log("Item already open");
            newFileIndex = action.file.id;
            // console.log({newFileIndex})

            let newState = { ...state, 
                            openFiles, 
                            currentFileIndex: newFileIndex,
                            console: []
                           };
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

            // New file name
            let newFileNameSplit = action.file.name.split(".", 2)
            let newFileName = newFileNameSplit[0] + "-1." + newFileNameSplit[1]

            let dupFile = action.file
            let newFile = { ...dupFile, id: largest + 1, name: newFileName }
            let newFiles = [...files, newFile]

            let newState = { ...state, files: newFiles };
            saveState(newState)
            return newState
        }

        case 'add-code': {
            console.log("add-code")
            console.log({action:action})

            moment.locale('en');
    
            let newName = "code-" + moment().format('y-M-D_h-m-s-SSS') + ".code";
            let newCodeFile =
            {
              id: largest + 1,
              name: newName,
              parentId: action.data.file.id,
              type: "code",
              data: JSON.stringify(action.data.transpiled, null, 2)
            }
    
            console.log({newCodeFile:newCodeFile})

            let newFiles = state.files

            newFiles = [...newFiles, newCodeFile]
            console.log({newFiles})

            let allIds = newFiles.map((file) => file.id)
            // console.log(allIds)

            let newOpenFiles = state.openFiles.filter((id) => allIds.includes(id) )
            // console.log(newOpenFiles)

            let newState = { ...state, files: newFiles, openFiles:newOpenFiles };
            saveState(newState)
            return newState
            // return state
        }

        case 'deleted': {
            console.log("delete")
            let newOpenFiles = openFiles
            newOpenFiles = openFiles.filter((fileIndex) => fileIndex !== action.id)

            if (action.id === currentFileIndex) {
                currentFileIndex = newOpenFiles[0]
            }

            let newFiles = files.filter(t => t.id !== action.id)
            
            let newState = { ...state, 
                                files: newFiles, 
                                openFiles: newOpenFiles, 
                                currentFileIndex 
                           }

            saveState(newState)
            return newState
        }

        case 'receive-data': {
            console.log("act.recieve-data")
            console.log({ action: action })

            let ids = state.files.map((file) => file.id);
            let largest = Math.max.apply(0, ids);

            moment.locale('en');
            let fileName = "data-" + moment().format('y-M-D_h-m') + ".json"

            let [currentFile] = state.files.filter((file) => file.id === state.currentFileIndex)

            // console.log("save item")
            let newItem = {
                id: largest + 1,
                parentId: currentFile.parentId,
                name: fileName,
                type: "json",
                data: JSON.stringify(action.returnData, null, 4)
            }

            let newFiles = state.files
            newFiles = [...newFiles, newItem]

            let newState = { ...state, files: newFiles }
            saveState(newState)
            return { ...newState }
        }

        case 'load-from-storage': {
            console.log('load-from-storage')
            let storageState = LoadState(state)
            return storageState;
        }

        case 'rename-project': {
            console.log("rename-project")
            console.log({ action: action })

            // let newProjects = state.projects
            // newProjects[state.currentProjectIndex] = action.name

            let newState = {
                ...state,
                name: action.name
            }

            saveState(newState)
            return newState
        }

        case 'duplicate-project': {
            console.log("duplicate-project")
            console.log({ state: state })
            console.log({ action })

            let {currentProjectIndex, ...newProjectData} = state
            newProjectData = {...newProjectData,
                name: state.name + "-1",
            }

            console.log({currentProjectIndex})

            let largest = Math.max.apply(0, action.projects);
            let newProjectIndex = largest + 1

            localStorage.setItem("data_" + newProjectIndex , JSON.stringify(newProjectData))                                

            let newState = {
                ...newProjectData,
                currentProjectIndex: newProjectIndex
                            }

            saveState(newState)
            return newState
        }

        case 'delete-project':{
            console.log("delete-project")
            console.log({action})

            localStorage.removeItem(action.project.id)
            saveState(state)
            return state
        }

        case 'set-project': {
            console.log("set-project")
            console.log({ action: action })


            let projectData = action.project.data

            let newProjectIndex = action.project.id
            newProjectIndex = parseInt(newProjectIndex.split("_")[1])

            let newState = {...state,
                currentProjectIndex: newProjectIndex,
                ...projectData
            }

            console.log({projectState:newState})

            saveState(newState)
            return newState
        }

        case 'ad-visibility': {
            console.log("ad-visibility")
            console.log({ action: action })

            let newState = { ...state, advertisement: !state.advertisement }
            saveState(newState)
            return newState
        }

        case 'console': {
            const newItem=action?.item;
            const {type,message,extra} = newItem || {};
            if(!type || !message)
                return state;
            
            const newConsole=[newItem,...(state?.console || [])]
            let newState = {...state, console:newConsole}
            saveState(newState)
            return newState
        }

        case 'clear-console': {
            let newState = {...state, console:[]}
            saveState(newState)
            return newState
        }

        case 'download-project': {
            console.log("download-project")
            console.log({ action: action })

            const zip = new JSZip();

            console.log({files})
            let zipFiles = state.files
            let stateFile = { id: 9999,
                              name: "state.json",
                              data: JSON.stringify(state, null, 2)
                            }

            zipFiles = [...files, stateFile]
            console.log({zipFiles})

            for (let file = 0; file < zipFiles.length; file++) {
                // Zip file with the file name.
                zip.file(zipFiles[file].name, zipFiles[file].data);
            }
            zip.generateAsync({ type: "blob" }).then(content => {
                saveAs(content, name + ".zip");
            });

            console.log({ state: state })

            return state
        }

        case 'upload-project': {
            console.log("upload-project")
            console.log({ action: action })
        
            let projectState = action.project.uploadData
            console.log({projectState})

            let ids = projectState.files.map((file) => file.id);
            let smallest = Math.min.apply(0, ids);

            let newProjectState = {
                ...projectState,
                currentProjectIndex: action.project.newProjectIndex,
                currentFileIndex:smallest,
                openFiles: [smallest],
                console: []
            };
            console.log({newProjectState})

            localStorage.setItem("data_" + newProjectState.currentProjectIndex, JSON.stringify(newProjectState))

            return state
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let appData = JSON.parse(localStorage.getItem('app-data'))
console.log({appData})

if (appData == null) {
    // console.log({ projects: projects })
    appData = { currentProjectIndex: 0,
                advertisement: true,
                console: [],
                theme: "dark" }

    localStorage.setItem('app-data', JSON.stringify(appData))
    localStorage.setItem('data_0', JSON.stringify(Token_Locking))
    localStorage.setItem('data_1', JSON.stringify(DAO_Demo))
    localStorage.setItem('data_3', JSON.stringify(GC_Testing))
}

let stateFile = "data_" + appData.currentProjectIndex
let storageState = JSON.parse(localStorage.getItem(stateFile))
console.log({ LoadFromStorage: storageState })

let ids = storageState.files.map((file) => file.id);
let smallest = Math.min.apply(0, ids);

let initialState = {
    ...storageState,
    ...appData,
    currentFileIndex:smallest,
    openFiles: [smallest]
};


console.log({ INIT: initialState })