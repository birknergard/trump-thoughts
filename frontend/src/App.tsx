import './components/NavBar'
import './App.css';
import MainPage from './pages/Main';
import CreatePage from './pages/Create';
import { ThoughtProvider } from "./context/ThoughtContext";
import { CreatorProvider } from './context/CreatorContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';

function App(){
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
            <Route path="/" element={
              <ThoughtProvider>
                  <MainPage />
              </ThoughtProvider>
            }></Route>

            <Route path="create" element={
              <CreatorProvider>
                <CreatePage />
              </CreatorProvider>
            }></Route>

          <Route path='*' element={<NotFound />}></Route>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
