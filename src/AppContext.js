import React, { createContext, useContext, useReducer } from "react";
import Token_Locking from "./data/Token_Locking.js";
import DAO_Demo from "./data/DAO_Demo.js";
import projects from "./data/project-list.js";
import JSZip from "jszip";
import moment from 'moment';
import { saveAs } from 'file-saver';
import { transpile } from "./services/gcscript.js";

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

    let { files, openFiles, currentFileIndex, theme } = state;
    // console.log({ files: files })
    // console.log({ action: action })

    let ids = files.map((file) => file.id);
    var largest = Math.max.apply(0, ids);

    function saveState(state) {

        let projectData = {
            name: state.name,
            type: state.type,
            theme: state.theme,
            currentFileIndex: state.currentFileIndex,
            openFiles: state.openFiles,
            files: state.files
        }

        localStorage.setItem("data_" + state.name, JSON.stringify(projectData))

        let appData = {
            currentProjectIndex: state.currentProjectIndex,
            projects: state.projects
        }
        // console.log({appData:appData})
        localStorage.setItem("app-data", JSON.stringify(appData))

    }

    function LoadState(state) {
        let appData = JSON.parse(localStorage.getItem("app-data"))
        console.log({ appData: appData })

        let currentProject = appData.projects[appData.currentProjectIndex]
        console.log({ currentProject: currentProject })

        let loadState = JSON.parse(localStorage.getItem("data_" + currentProject))
        console.log("data_" + currentProject)

        let newState = {
            ...loadState,
            ...appData
        };


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

        case 'selected': {
            console.log("selected")
            // console.log({selState:state})
            console.log({ action: action })
            console.log(action.file.id)

            let newFileIndex = 0

            openFiles.indexOf(action.file.id) === -1 ? openFiles.push(action.file.id) : console.log("Item already open");
            newFileIndex = action.file.id;
            console.log({newFileIndex})

            let newState = { ...state, openFiles, currentFileIndex: newFileIndex };
            console.log({ newState: newState })
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
            // console.log({dupNewfiles:newFiles})

            let newState = { ...state, files: newFiles };

            saveState(newState)
            // console.log({dupNewState:newState})

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
              data: JSON.stringify(action.data.code, null, 2)
            }
    
            // console.log({newCodeFile:newCodeFile})

            let newFiles = state.files.filter((file) => {
                // console.log(file.name + " " + file.parentId + " " +  action.data.file.id)

                if (file.type !== "code")// && ) 
                {
                    // console.log("true")
                    return true 
                } else {
                    if (file.parentId === action.data.file.id){
                        // console.log("false")
                        return false
                    } else {
                        // console.log("true")
                        return true
                    }
                }
            })
            newFiles = [...newFiles, newCodeFile]

            let allIds = newFiles.map((file) => file.id)
            console.log(allIds)

            let newOpenFiles = state.openFiles.filter((id) => allIds.includes(id) )
            console.log(newOpenFiles)


            let newState = { ...state, files: newFiles, openFiles:newOpenFiles };
            console.log({newState:newState})
            saveState(newState)
            return newState
        }


        case 'deleted': {
            console.log("delete")
            console.log({ delState: state })
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
            console.log({ delNewState: newState })
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

            console.log({ receiveNewState: newState })

            saveState(newState)
            return { ...newState }
        }

        case 'load-from-storage': {
            console.log('load-from-storage')

            let storageState = LoadState(state)

            console.log({ Load: storageState })
            return storageState;
        }

        case 'rename-project': {
            console.log("edit-project-name")
            console.log({ action: action })

            let newProjects = state.projects
            newProjects[state.currentProjectIndex] = action.name

            let newState = {
                ...state,
                name: action.name,
                projects: newProjects
            }

            saveState(newState)
            return newState
        }

        case 'duplicate-project': {
            console.log("duplicate-project")
            console.log({ state: state })

            // console.log(state.currentProjectIndex)
            let currentProject = state.projects[state.currentProjectIndex]
            console.log({ currentProject: currentProject })

            let newProject = currentProject + "-1"

            let newProjects = state.projects
            console.log({ newProjects: newProjects })

            newProjects = [...newProjects, newProject]
            console.log({ newProjects: newProjects })

            let newState = {
                ...state,
                name: newProject,
                projects: newProjects,
                currentProjectIndex: newProjects.length - 1
            }

            console.log({ newState: newState })
            saveState(newState)
            return newState
        }

        case 'set-project': {
            console.log("change-project")
            console.log({ action: action })

            let projectName = action.value;

            let projectData = JSON.parse(localStorage.getItem('data_' + projectName))

            console.log({ projectData: projectData })

            return {
                ...state,
                name: projectName,
                currentFileIndex: 0,
                openFiles: [0],
                files: projectData.files,
            }
        }

        case 'ad-visibility': {
            console.log("ad-visibility")
            console.log({ action: action })

            return { ...state, advertisement: !state.advertisement }
        }

        case 'download-project': {
            console.log("download-project")
            console.log({ action: action })

            const zip = new JSZip();

            let currentProject = state.projects[state.currentProjectIndex]
            console.log({ currentProject: currentProject })

            let dataFiles = state.files;
            console.log({ dataFiles: dataFiles })

            for (let file = 0; file < dataFiles.length; file++) {
                // Zip file with the file name.
                zip.file(dataFiles[file].name, dataFiles[file].data);
            }
            zip.generateAsync({ type: "blob" }).then(content => {
                saveAs(content, currentProject + ".zip");
            });

            console.log({ state: state })

            return state
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let appData = JSON.parse(localStorage.getItem('app-data'))

if (appData == null) {
    console.log({ projects: projects })
    appData = projects

    localStorage.setItem('app-data', JSON.stringify(projects))
    localStorage.setItem('data_Token_Locking', JSON.stringify(Token_Locking))
    localStorage.setItem('data_DAO_Demo', JSON.stringify(DAO_Demo))
}

let project = Token_Locking;

console.log({ projectList: appData })

let stateFile = "data_" + appData.projects[appData.currentProjectIndex]
let storageState = JSON.parse(localStorage.getItem(stateFile))
console.log({ LoadFromStorage: storageState })

let initialState = {}

if (storageState == null) {
    console.log("New from default data")
    initialState = {
        ...project,
        ...projects,
        advertisement: true
    }
} else {
    console.log("Load from storage")
    initialState = {
        ...storageState,
        ...appData,
        advertisement: true
    };
}

console.log({ INIT: initialState })