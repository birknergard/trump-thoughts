import React, { useState , FC, ChangeEvent} from "react";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";

function ImageUploader() {

    const url = "http://localhost:5026/images"

    const [name, setName] = useState<string | null>(null)
    const [image, setImage] = useState<File | null>(null)

    const upload = async() => {
        try{
            if(image != null){
                const response = await ImageUploadService.upload(image)
                setName(response.data.fileName)
            } 
        } catch(e) {
            console.error("Error with image upload.", e)
        }
    }

    const handle = (e : ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target
        if(files != null){
            setImage(files[0])
        }
    }

    
    return(
        <div>
            <input 
                type="file"
                onChange={handle}
            />
            <input 
                type="button"
                value="Upload" 
                onClick={upload}
            />
        </div>
    )
}

export default ImageUploader