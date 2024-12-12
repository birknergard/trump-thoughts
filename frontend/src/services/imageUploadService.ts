import axios, { AxiosResponse } from "axios";

const ImageUploadService = (() => {

    const BASE_URL = "http://localhost:5026/uploadImage"
    const TEMP_URL = "http://localhost:5026/uploadImage/temp"
        
    const upload = async(image : File, isTemp : boolean) => {
        const formData = new FormData()
        formData.append("file", image)

        const result = await axios({
            url: isTemp ? TEMP_URL : BASE_URL,
            method: "POST",
            data: formData,
            headers : {"Content-Type": "multipart/form-data"}
        })
        
        formData.delete("file")
        return result
    }
    
    const process = async(imageUrl : string) => {
        const result = await axios.post(`${BASE_URL}/process/${imageUrl}`)
        console.log("ImageUploadService.process:", result)
    }

    const remove = async(imageUrl : string, isTemp : boolean) => {
        const result = await axios.delete(`${isTemp ? TEMP_URL : BASE_URL}/${imageUrl}`)
        return result;
    }

    return {
        process,
        remove,
        upload
    }

})() 

export default ImageUploadService

