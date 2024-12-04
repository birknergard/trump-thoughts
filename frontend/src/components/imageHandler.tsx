import React, { useState , FC, ChangeEvent, InputHTMLAttributes, SetStateAction, Dispatch} from "react";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";

interface IHandler{
    imageSetter : Dispatch<SetStateAction<File | null>>
    imageUrlSetter : Dispatch<SetStateAction<string>>
}

function ImageHandler(props : IHandler){

    const handle = (event : ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target
        if(files != null){
            props.imageSetter(files[0])
            props.imageUrlSetter(files[0].name)
        }
    }
    
    return(
        <div className=" flex flex-col items-center justify-center my-3">
            <h2 className="text-2xl">Reaction Image</h2>
            <input 
                type="file"
                accept="image/"
                onChange={handle}
            />
        </div>
    )
}

export default ImageHandler