import React from "react";

const AppContext = React.createContext();
const AppUpdateContext = React.createContext();

export function useApp(){
    return React.useContext(AppContext)
}

export function useAppUpdate(){
    return React.useContext(AppUpdateContext)
}

export function AppProvider({children}) {
    const [openFileList, setOpenFileList] = React.useState([]);

    const list = []

    function updateFileList(list) {
        console.log("Update: " + list)
        setOpenFileList(() => list)
    }

    return (
        <AppContext.Provider value={openFileList}>
            <AppUpdateContext.Provider value={updateFileList(list)}>
            {children}
            </AppUpdateContext.Provider>
        </AppContext.Provider>
    )

}