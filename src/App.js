import React from 'react';

import './App.css';
import SourceBrowser from './components/SourceBrowser';
import SourceViewer from './components/SourceViewer';
import files from "./data/project.json"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import 'react-tabs/style/react-tabs.css';
import GcSideBar from './components/GcSideBar';
import 'react-tabs/style/react-tabs.css';
import { FiletypeJson, FiletypeJs } from 'react-bootstrap-icons';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
  PanelGroup,
  Panel,
  PanelResizeHandle
} from 'react-resizable-panels';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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

function App() {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PanelGroup direction="horizontal">
      <GcSideBar />

      <Panel collapsible={true} collapsedSizePixels={35} minSizePercentage={10}>
        <SourceBrowser files={files} />
      </Panel>

      <PanelResizeHandle style={{ backgroundColor: "#2a3343", width: "8px" }} />

      <Panel defaultSizePercentage={60}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Tabs
            value={value}
            variant="scrollable"
            textColor="secondary"
            onChange={handleChange}>
            <Tab sx={{textTransform :"none", padding :"5px" }} label={
              <span className='tab-item-span'>
                <FiletypeJson className='tab-item' />
                {'contract.hl'}
                <IconButton component="span" size="small" onClick={() => { handle() }}>
                  <CloseIcon className='tab-item'/>
                </IconButton>
              </span>
            } />
            <Tab sx={{textTransform :"none"}} label={
              <span className='tab-item-span'>
                <FiletypeJson className='tab-item' />
                {'gc_script_template.json'}
                <IconButton component="span" size="small" onClick={() => { handle() }}>
                  <CloseIcon className='tab-item'/>
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
        </ThemeProvider>
      </Panel>
    </PanelGroup>

  );
}

export default App;
