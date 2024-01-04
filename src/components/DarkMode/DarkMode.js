import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";
import { AppContext } from '../../AppContext';

const DarkMode = () => {
    const { context, setContext } = React.useContext(AppContext)

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
        localStorage.setItem("selectedTheme","dark")
               
        let tempContext = { ...context, theme:"dark"}
        localStorage.setItem('tempContext', JSON.stringify(tempContext));

    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
        localStorage.setItem("selectedTheme","light")
                
        let tempContext = { ...context, theme:"light"}
        localStorage.setItem('tempContext', JSON.stringify(tempContext));
        
    }

    const selectedTheme = localStorage.getItem("selectedTheme");

    if(selectedTheme === 'dark'){
        setDarkMode();
    }
    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode()
    }

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme === "dark"}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
