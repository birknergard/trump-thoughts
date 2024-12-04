import React, { useState , FC, ChangeEvent, InputHTMLAttributes, SetStateAction, Dispatch} from "react";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";

interface IUploader{
    imageSetter : Dispatch<SetStateAction<File | null>>
}

function ImageUploader(props : IUploader){


    const handle = (e : ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target
        if(files != null){
            props.imageSetter(files[0])
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

export default ImageUploader