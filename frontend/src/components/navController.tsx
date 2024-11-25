import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Main from '../pages/main';
import Shop from '../pages/shop';
import Staff from '../pages/staff';

function NavController(){
    return (
        <div>
            <BrowserRouter>
                <Routes>
                   <Route path="/" element={<Main />}></Route>
                   <Route path="shop" element={<Shop />}></Route>
                   <Route path="staff" element={<Staff />}></Route>
                   <Route path='*' element={<p>Page not found</p>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default NavController