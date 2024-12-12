import './components/NavBar'
import './App.css';
import MainPage from './pages/Main';
import CreatePage from './pages/Create';
import { ThoughtProvider } from "./context/ThoughtContext";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

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
