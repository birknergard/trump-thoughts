import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from '../pages/main';

function NavController(){
    return (
        <>
        <div>
            <BrowserRouter>
                <Routes>
                   <Route path="/" element={<Main />}></Route>
                   <Route path='*' element={<p>Page not found</p>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
        <header className=''>
            
        </header>
        </>

        
    )
}

export default NavController