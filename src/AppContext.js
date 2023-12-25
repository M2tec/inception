import React, { useEffect } from "react";
import project from "./data/Token_Locking/project.js";
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

export function AppProvider({ children }) {
    const updateIntervalMs = 1000 * 10;//5 seconds

    const loadContext = () => {
        console.log(`loadContext()`);
        const json = localStorage.getItem('gcide');

        if (!json) {
            // console.log('!JSON')
            let data = { ...project, updatedAt: Date.now() }
            localStorage.setItem('gcide', JSON.stringify(data));
            return data;
        }

        return JSON.parse(json);
    }
    const saveContext = (_context) => {
        if (!_context)
            return;
        const lastContext = loadContext();

        const now = Date.now();
        const elapsed = (now - lastContext.updatedAt);

        if (elapsed < updateIntervalMs) {
            console.log(`saveContext(): saving too soon...${elapsed}/${updateIntervalMs}`);
            return;
        }
        const newContext = {
            ..._context,
            updatedAt: now,
        }

        const tempContextTxt = localStorage.getItem('tempContext');
        let tempContext = JSON.parse(tempContextTxt)
        // console.log(tempContext)
        // console.log("Temp: " + tempContext.active )
        // console.log(newContext.name)

        if (tempContextTxt !== null) {
            localStorage.setItem('gcide', tempContextTxt);
        }

        console.log(`saveContext(): Context saved at ${newContext.updatedAt}`, newContext);
    }
    const [context, setContext] = React.useState(null);

    useEffect(() => {
        if (!context) {
            
            setContext(loadContext());
            return;
        }
        saveContext(context);
    }, [context]);

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            saveContext(context);
        }, updateIntervalMs);
        //Clearing the interval
        return () => clearInterval(interval);
    }, [context]);

    if (!context)
        return null;

    return (
        <AppContext.Provider value={{ context, setContext }}>
            {children}
        </AppContext.Provider>
    )

}