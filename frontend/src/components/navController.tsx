import React, { FC } from 'react';
import MainPage from '../pages/main';
import CreatePage from '../pages/create';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

interface INavController {
    navState : boolean
}

const NavController : FC<INavController> = ({navState}) => {
    
    const makeArrow = () => {
        if(navState === true) return '<-'
        return '->'
    }

    return (
        <div className={`bg-sky-400 w-full fixed top-0 left-0 flex items-center flew-row justify-between ${navState === true ? "items-start" : "items-end"}`}>
            {navState && <Link className="text-4xl text-white" to="/">{makeArrow()}</Link>}        
            <h1 className="m-4 text-white text-2xl">Trump man thinkin hmm</h1>
            {!navState && <Link className="text-4xl text-white" to="create">{makeArrow()}</Link>}
        </div>
    )
}

export default NavController