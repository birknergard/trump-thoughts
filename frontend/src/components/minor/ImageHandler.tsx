import React, {useRef, useState , FC, ChangeEvent, InputHTMLAttributes, SetStateAction, Dispatch} from "react";
import IThought from "../../interfaces/Thought";
import ImageUploadService from "../../services/ImageUploadService";

interface IHandler{
    elementStyle? : string
    buttonStyle? : string
    imageUrl : string
    setRawImageFile : Dispatch<SetStateAction<FileList | null>>
}

const ImageHandler : FC<IHandler> = ({
    elementStyle,
    buttonStyle,
    imageUrl,
    setRawImageFile
}) => {

    const imageInputRef = useRef<HTMLInputElement>(null)
    
    const handleOnClick = () => {
        if(imageInputRef.current){
            imageInputRef.current.click();
        }
    }

    const handle = (event : ChangeEvent<HTMLInputElement>) => {
        const {files} = event.target
        if(files != null){
            setRawImageFile(files)
        }
    }
    
    return(
        <div className={`${elementStyle} flex flex-col items-center align-end justify-between mt-2 w-min`}>
            <h2 className="font-semibold text-lg mb-1">Image</h2>
            <input className="hidden" 
                ref={imageInputRef}
                name="fileTag"
                type="file"
                accept="image/"
                onChange={(e) => handle(e)}
            />
            <div className="flex flex-col items-center">
                <input className={`border-2 text-lg border-sky-300 rounded-lg w-36 h-10 ${buttonStyle}`} 
                    onClick={handleOnClick}
                    type="button" 
                    value={imageUrl === "" ? "Upload" : "Change"} 
                />        
                {imageUrl !== "" && <h2 className="w-28 text-sm truncate">... {imageUrl}</h2>}
            </div>

        </div>

        
    )
}

export default ImageHandler