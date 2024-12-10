import { Dispatch, FC, SetStateAction } from "react";
import styles from './popUp.module.css'

interface IConfirm{
    exitState : Dispatch<SetStateAction<boolean>>, 
    method : () => any,
    message : string
}

const Confirm : FC<IConfirm> = ({exitState, message, method}) => {
     
    const confirm = () => {
        method()
        exitState(false)
    }

    const exit = () => {
        exitState(false)
    }
    
    return (
        <div className="absolute top-0 flex flex-col items-center justify-center gap-9 bg-sky-200 bg-opacity-95 rounded-lg p-3 w-full h-full">
            <div className="flex flex-col items-center gap-4">
                <p className="text-xl text-center w-60">{message}</p>
                <p className="text-xl font-bold">Are you sure?</p>
            </div>
            <div className="flex flex-row justify-evenly w-full h-16">
                <input className={`w-2/5 h-full border-2 border-black rounded-lg text-black text-xl ${styles.cancel}`} type="button" value="Cancel" onClick={exit}/>

                <input className={`w-2/5 h-full border-2 border-red-600 rounded-lg text-red-700 text-xl ${styles.delete}`} type="button" value="Delete" onClick={confirm}/>
            </div>
        </div> 
    )
}

export default Confirm