import React, { useEffect } from "react";
import project from "./data/Token_Locking/project.js";

export const AppContext = React.createContext();

export function AppProvider({children}) {
    const files = project.items.map((item , index) => item);
    console.log(files)

    const [context, setContext] = React.useState({files: files, active: 0});
    
    useEffect (() => { 
        project.items = context
        localStorage.setItem(project.name, JSON.stringify(project));
    }
    ),[context]

    return (
        <AppContext.Provider value={{context, setContext}}>
            {children}
        </AppContext.Provider>
    )

}