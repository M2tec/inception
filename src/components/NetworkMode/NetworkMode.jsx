import React from "react";
import Mainnet from "./Mainnet.svg?react";
import Preprod from "./Preprod.svg?react";
import "./NetworkMode.css";
import { useAppState, useStateDispatch } from '../../AppContext';

const NetworkMode = () => {
    const dispatch = useStateDispatch();
    let {network} = useAppState();

    return (
        <div className='network_mode'>
            <input
                className='network_mode_input'
                type='checkbox'
                id='mainnet-toggle'
                onChange={e => {
                    dispatch({
                      type: 'network',
                      id: 'test'
                      })}}
                defaultChecked={network === "preprod"}
            />
            <label className='network_mode_label' htmlFor='mainnet-toggle'>
                <Mainnet />
                <Preprod />
            </label>
        </div>
    );
};

export default NetworkMode;
