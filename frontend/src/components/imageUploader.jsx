import React, { useState , FC, ChangeEvent} from "react";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";

function ImageUploader({imageSetter}) {

    const url = "http://localhost:5026/images"

    const handle = (e) => {
        const {files} = e.target
        if(files != null){
            imageSetter(files[0])
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