import React, { createContext, useContext, useReducer } from "react";
import project from "./data/Token_Locking/project.js";
import PropTypes from 'prop-types';

// const AppContext = React.createContext(null);

const FilesContext = createContext(null);
const FilesDispatchContext = createContext(null);

export function FilesProvider({ children }) {

    const [files, dispatch] = useReducer(filesReducer, initialFiles);

    return (
        <FilesContext.Provider value={files}>
            <FilesDispatchContext.Provider value={dispatch}>
                {children}
            </FilesDispatchContext.Provider>
        </FilesContext.Provider>
    )

}

export function useFiles() {
    return useContext(FilesContext);
}

export function useFilesDispatch() {
    return useContext(FilesDispatchContext);
}

function filesReducer(files, action) {
    // console.log({ files: files })
    // console.log({ action: action })
    switch (action.type) {
        case 'selected': {
            return [...files, {
                id: action.id,
                name: action.name,
            }];
        }
        case 'closed': {
            return [...files, {
                id: action.id,
                name: action.name,
            }];
        }
        case 'added': {
            return [...files, {
                id: action.id,
                name: action.name,
            }];
        }
        case 'changed': {
            return files.map(f => {
                if (f.id === action.file.id) {
                    return action.file;
                } else {
                    return f;
                }
            });
        }
        case 'duplicate': {
            let ids = files.map((file) => file.id);
            var largest = Math.max.apply(0, ids);

            let duplicate_file_array = files.filter((file) => {
                return file.id == action.file.id;
            })

            let duplicate_file = duplicate_file_array[0]
            let new_file_name_split = action.file.name.split(".", 2)
            let new_file_name = new_file_name_split[0] + "-1." + new_file_name_split[1]
            let new_file = { ...duplicate_file, id: largest + 1, name: new_file_name }

            return [...files, new_file];
        }
        case 'deleted': {
            return files.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialFiles = project.dataItems.source.items;
console.log(initialFiles)