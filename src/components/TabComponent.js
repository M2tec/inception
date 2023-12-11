import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SourceViewer from './SourceViewer';

import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FiletypeJson } from 'react-bootstrap-icons';

import { styled } from '@mui/material/styles';

import project from "../data/Token_Locking/project.js";

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 140,
        width: '100%',
        backgroundColor: 'white',
    },
});


const StyledTab = styled((props) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    minWidth: "50px",
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: '#192230',
    '&.Mui-selected': {
        color: '#fff',
        backgroundColor: '#1e1e1e',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
}));

const TabComponent = () => {

    console.log(project.items[0].data);

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
            <StyledTabs
                value={value}
                variant="scrollable"
                textColor="secondary"

                onChange={handleChange}>
                <StyledTab sx={{ textTransform: "none", padding: "5px" }} label={
                    <span className='tab-item-span'>
                        <FiletypeJson className='tab-item' />
                        {'contract.hl'}
                        <IconButton component="span" size="small" onClick={() => { handle() }}>
                            <CloseIcon className='tab-item' />
                        </IconButton>
                    </span>
                } />
                <StyledTab sx={{ textTransform: "none" }} label={
                    <span className='tab-item-span'>
                        <FiletypeJson className='tab-item' />
                        {'gc_script_template.json'}
                        <IconButton component="span" size="small" onClick={() => { handle() }}>
                            <CloseIcon className='tab-item' />
                        </IconButton>
                    </span>
                } />
            </StyledTabs>

            <CustomTabPanel value={value} index={0}>
                <SourceViewer data={project.items[0].data} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SourceViewer item={project.items[1].data} />
            </CustomTabPanel>
        </div>
    );
};

export default TabComponent;