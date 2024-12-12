import { FC } from 'react';
import { Link } from 'react-router-dom';

interface INavController {
    navState : boolean
    withMethod? : void
}

const NavController : FC<INavController> = ({navState, withMethod}) => {

    const creatText = () => {
        if(navState === true) return '<- Back'
        return 'Create ->'
    }

    return (
        <div className={`bg-yellow-400 w-full z-10 fixed top-0 left-0 flex items-center justify-between ${navState === true ? "flex-row" : "flex-row-reverse"}`}>
            <Link className="text-2xl font-semibold text-blue-700 mx-6" 
                to={`${navState ? "/" : "create"}`}
            >
                    {creatText()}
            </Link>        
            <h1 className="m-4 text-white text-2xl">
                Trump man thinkin hmm
            </h1>
        </div>
    )
}

export default NavController