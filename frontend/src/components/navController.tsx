import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from './main';

function NavController(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                   <Route path="/components/main.tsx" element={<Main/>}></Route>
                   <Route path='*' element={<p>Page not found</p>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default NavController