import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SourceBrowser from './components/SourceBrowser';
import GcSideBar from './components/GcSideBar';
import TabComponent from './components/TabComponent';
import SearchAppBar from './components/SearchAppBar';
import { AppProvider } from './AppContext';


import {
  PanelGroup,
  Panel,
  PanelResizeHandle
} from 'react-resizable-panels';


export default function App() {
  // Update the theme only if the mode changes
  return (
    <AppProvider>
        <SearchAppBar />

        <PanelGroup direction="horizontal">
          <GcSideBar />

          <Panel collapsible={true} collapsedSizePixels={35} minSizePercentage={10}>
            <SourceBrowser />
          </Panel>

          <PanelResizeHandle style={{ backgroundColor: "#2a3343", width: "8px" }} />

          <Panel defaultSizePercentage={70}>
            <TabComponent />
          </Panel>

        </PanelGroup>
    </AppProvider>
  );
}

