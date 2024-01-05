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

    let {files,openFiles,currentFileIndex, theme} = state;
    // console.log({ files: files })
    // console.log({ action: action })
    switch (action.type) {
        case 'theme': {
            theme == "dark" ? theme = "light" : theme = "dark"

            document.querySelector("body").setAttribute('data-theme', theme)

            return {...state, theme};
        }
        case 'selected': {
            openFiles.indexOf(action.file.id) === -1 ? openFiles.push(action.file.id) : console.log("This item already exists");
            currentFileIndex = action.file.id;

            return {...state, openFiles, currentFileIndex};
        }
        case 'closed': {
            let newOpenFiles = openFiles
            if (openFiles.length > 1){

                newOpenFiles = openFiles.filter((fileId) => fileId !== action.id)
                

                if (action.id == currentFileIndex) {
                    currentFileIndex = newOpenFiles.slice(-1)[0]
                    console.log(currentFileIndex)
            }
        }

            return {...state, openFiles: newOpenFiles, currentFileIndex};
        }
        case 'added': {

            return [...files, {
                id: action.id,
                name: action.name,
            }];
        }
        case 'changed': {
            let newFiles = files.map(f => {
                if (f.id === action.file.id) {
                    return action.file;
                } else {
                    return f;
                }
            });

            return {...state, files:newFiles};
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

            return {...state, files:newFiles};
        }
        case 'deleted': {

            let newOpenFiles = openFiles
            if (action.id == currentFileIndex){

                newOpenFiles = openFiles.filter((fileIndex) => fileIndex !== action.id )

                currentFileIndex = newOpenFiles[0]
            }

            let newFiles = files.filter(t => t.id !== action.id)

            return {...state, files:newFiles, openFiles: newOpenFiles, currentFileIndex};
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialState = {  files:project.dataItems.source.items, 
                        openFiles: [0], 
                        currentFileIndex: 0,
                        theme: "light"}
console.log(initialState)