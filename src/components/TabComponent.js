import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SourceViewer from './SourceViewer';


import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FiletypeJson} from 'react-bootstrap-icons';



const TabComponent = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;
    
        return (
            <div
                className='panel'
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <div className='panel'>{children}</div>
                )}
            </div>
        );
    }

    function handle() {
        console.log("Handle");
    }

    return (
    <div className='panel'>
        <Tabs
            value={value}
            variant="scrollable"
            textColor="secondary"
            
            onChange={handleChange}>
            <Tab sx={{ textTransform: "none", padding: "5px" }} label={
                <span className='tab-item-span'>
                    <FiletypeJson className='tab-item' />
                    {'contract.hl'}
                    <IconButton component="span" size="small" onClick={() => { handle() }}>
                        <CloseIcon className='tab-item' />
                    </IconButton>
                </span>
            } />
            <Tab sx={{ textTransform: "none" }} label={
                <span className='tab-item-span'>
                    <FiletypeJson className='tab-item' />
                    {'gc_script_template.json'}
                    <IconButton component="span" size="small" onClick={() => { handle() }}>
                        <CloseIcon className='tab-item' />
                    </IconButton>
                </span>
            } />
        </Tabs>

        <CustomTabPanel value={value} index={0}>
            <SourceViewer />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <SourceViewer />
        </CustomTabPanel>
    </div>
    );
};

export default TabComponent;