import axios, { AxiosResponse } from "axios";

const ImageUploadService = (() => {

    const url = "http://localhost:5026/uploadImage"
        
    const upload = async(image : File) => {
        const formData = new FormData()
        formData.append("file", image)

        const result = await axios({
            url: url,
            method: "POST",
            data: formData,
            headers : {"Content-Type": "multipart/form-data"}
        })
        
        formData.delete("file")
        return result
    }

    return {
        upload
    }
})() 

export default ImageUploadService

