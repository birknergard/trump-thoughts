import React from 'react';
import './components/navController'
import './App.css';
import MainPage from './pages/main';
import CreatePage from './pages/create';
import { ThoughtProvider } from "./context/thoughtContext";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavController from './components/navController';
import NotFound from './pages/notFound';

function App(){
  return (
    <div className="App">

      <ThoughtProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="create" element={<CreatePage />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>

      </BrowserRouter>
      </ThoughtProvider>

    </div>
  );
}

export default App;
