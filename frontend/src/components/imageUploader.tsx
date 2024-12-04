import React, { useState , FC, ChangeEvent, InputHTMLAttributes, SetStateAction, Dispatch} from "react";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";

interface IUploader{
    imageSetter : Dispatch<SetStateAction<File | null>>
}

function ImageUploader(props : IUploader){

    const url = "http://localhost:5026/images"

    const handle = (e : ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target
        if(files != null){
            props.imageSetter(files[0])
        }
    }
    
    return(
        <div>
            <input 
                type="file"
                onChange={handle}
            />
        </div>
    )
}

export default ImageUploader