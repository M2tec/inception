import React from 'react';

import './App.css';
import SourceBrowser from './components/SourceBrowser';
import GcSideBar from './components/GcSideBar';
import TabComponent from './components/TabComponent';
import CssBaseline from '@mui/material/CssBaseline';
import { grey, indigo } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchAppBar from './components/SearchAppBar';


import {
  PanelGroup,
  Panel,
  PanelResizeHandle
} from 'react-resizable-panels';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      ...indigo,
      ...(mode === 'dark' && {
        main: indigo[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: '#2a3343',
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});

function App() {
  // Update the theme only if the mode changes
  const darkModeTheme = createTheme(getDesignTokens('dark'));

  return (
      <ThemeProvider theme={darkModeTheme}>
        <CssBaseline />
        <SearchAppBar />
        <PanelGroup direction="horizontal">
          <GcSideBar />

          <Panel collapsible={true} collapsedSizePixels={35} minSizePercentage={10}>
            <SourceBrowser/>
          </Panel>

          <PanelResizeHandle style={{ backgroundColor: "#2a3343", width: "8px" }} />

          <Panel defaultSizePercentage={70}>
            <TabComponent />
          </Panel>
        </PanelGroup>
      </ThemeProvider>
  );
}

export default App;
