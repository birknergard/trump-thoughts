import React from 'react';
import './components/navController'
import './App.css';
import NavController from './components/navController';
import MainPage from './pages/main';
import CreatePage from './pages/create';
import { ThoughtProvider } from "./context/thoughtContext";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App(){
  return (
    <div className="App">

      <NavController />


      <ThoughtProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="create" element={<CreatePage />}></Route>
          <Route path='*' element={<p>Page not found</p>}></Route>
        </Routes>
      </BrowserRouter>
      </ThoughtProvider>

    </div>
  );
}

export default App;
