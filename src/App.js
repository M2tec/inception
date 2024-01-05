import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import { StateProvider } from './AppContext';

// import TestPopup from './components/TestPopup';
// import ConnectPopup from './components/ConnectPopup';

export default function App() {
  // Update the theme only if the mode changes
  return (
    <StateProvider>
      <Routes>
        <Route index element={<Home />} />
        
        {/* <Route path="connect" element={<ConnectPopup />}>
          <Route path=":returnData" element={<ConnectPopup />} />
        </Route> */}

        {/* <Route path="testpopup" element={<TestPopup />} />
        <Route path="*" element={<NoMatch />} /> */}

      </Routes>
    </StateProvider>
  );
}

