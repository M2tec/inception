import React from 'react';

// import logo from './logo.svg';
import './App.css';
import SourceBrowser from './components/SourceBrowser';
import SourceViewer from './components/SourceViewer';
import files from "./data/project.json"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GcSideBar from './components/GcSideBar';
import 'react-tabs/style/react-tabs.css';

import {
  PanelGroup,
  Panel,
  PanelResizeHandle
} from 'react-resizable-panels';

function App() {

  return (
    <PanelGroup direction="horizontal">
      <GcSideBar />

      <Panel collapsible={true} collapsedSizePixels={35} minSizePercentage={10}>
        <SourceBrowser files={files} />
      </Panel>
     
      <PanelResizeHandle style={{ backgroundColor: "#2a3343", width: "8px" }} />
      
      <Panel defaultSizePercentage={60}>
        
        {/* <Tabs>
          <TabList>
            <Tab>contract.hl</Tab>
            <Tab>gc_script_template.json</Tab>
          </TabList>

          <TabPanel>
            <SourceViewer />
          </TabPanel>
          <TabPanel>
            <SourceViewer />
          </TabPanel>
        </Tabs> */}

      </Panel>
    </PanelGroup>

  );
}

export default App;
