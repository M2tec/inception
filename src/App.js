import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ReturnData from './components/ReturnData';
import NoMatch from './components/NoMatch';
import { AppProvider } from './AppContext';

import TestPopup from './components/TestPopup';
import ConnectPopup from './components/ConnectPopup';
import RightContext from './components/RightContext';



export default function App() {
  // Update the theme only if the mode changes
  return (
    <AppProvider>
      <Routes>
        <Route index element={<Home />} />
        
        <Route path="return-data" element={<ReturnData />}>
          <Route path=":scriptData" element={<ReturnData />} />
        </Route>

        <Route path="connect" element={<ConnectPopup />}>
          <Route path=":returnData" element={<ConnectPopup />} />
        </Route>

        <Route path="testpopup" element={<TestPopup />} />
        <Route path="testcontextmenu" element={<RightContext />} />
        <Route path="*" element={<NoMatch />} />

      </Routes>
    </AppProvider>
  );
}

