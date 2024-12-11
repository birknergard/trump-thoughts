import React, {useRef, useState , FC, ChangeEvent, InputHTMLAttributes, SetStateAction, Dispatch} from "react";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";

interface IHandler{
    elementStyle? : string
    buttonStyle? : string
    image : File | null
    imageUrl : string
    fileListSetter : Dispatch<SetStateAction<FileList | null>>

}

const ImageHandler : FC<IHandler> = ({
    elementStyle,
    buttonStyle,
    image,
    imageUrl,
    fileListSetter
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
            console.log(URL.createObjectURL(files[0]))
            fileListSetter(files)
        }
    }
    
    return(
        <div className={`${elementStyle} flex flex-col items-center justify-center my-3 w-min`}>
            <h2 className="text-lg">Reaction Image</h2>
            <input className="hidden" 
                ref={imageInputRef}
                name="fileTag"
                type="file"
                accept="image/"
                onChange={(e) => handle(e)}
            />
            <div className="flex flex-col items-center">
                <input className={`border rounded-lg w-36 h-10 ${buttonStyle}`} 
                    onClick={handleOnClick}
                    type="button" 
                    value={image === null ? "Upload" : "Change"} 
                />        
                {image && <h2>... {imageUrl}</h2>}
            </div>

        </div>

        
    )
}

export default ImageHandler