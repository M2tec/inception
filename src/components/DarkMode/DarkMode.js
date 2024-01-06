import React from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";
import { useAppState, useStateDispatch } from '../../AppContext.js';

const DarkMode = () => {
    const dispatch = useStateDispatch();
    let {theme} = useAppState();
    
    console.log(theme)
    console.log(theme !== "dark")
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={e => {
                    dispatch({
                      type: 'theme',
                      id: 'test'
                      })}}
                defaultChecked={theme == "dark"}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
