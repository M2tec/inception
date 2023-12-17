import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ReturnData from './components/ReturnData';
import NoMatch from './components/NoMatch';
import { AppProvider } from './AppContext';

export default function App() {
  // Update the theme only if the mode changes
  return (
    <AppProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="return-data" element={<ReturnData />}>
          <Route path=":scriptData" element={<ReturnData />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AppProvider>
  );
}

