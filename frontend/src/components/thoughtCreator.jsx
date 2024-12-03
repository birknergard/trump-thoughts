import React, { useContext, useEffect, useRef, useState } from "react";
import { useThoughtContext } from "../context/thoughtContext";
import SelectionList from "./inputSelector";
import Field from "./inputField";
import ImageUploadService from "../services/imageUploadService";
import ImageUploader from "./imageUploader";

function ThoughtCreator(){

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")
    const [tone, setTone] = useState("")

    const [image, setImage] = useState(null)
    const [imageUrl, setUrl] = useState("")

    const { postThought } = useThoughtContext()  

    const topicList = [
        "healthcare", "education", "immigration", "economy",
        "climate change", "gun control", "criminal justice",
        "abortion", "foreign policy", "social security",
        "millitary spending", "free speech", "lgbtq rights",
        "drugs", "infrastructure", "corporate regulation",
        "trade", "technology", "other"
    ]

    const toneList = [
        "confident",  "combative", "controversial",
        "authoritative", "provocative", "charismatic",
        "blunt", "hyperbolic", "defensive", "optimistic"
    ]

    const uploadImage = async() => {
        try{
            if(image != null){
                const response = await ImageUploadService.upload(image)
                setUrl(response.data.fileName)
            } 
        } catch(e) {
            console.error("Error with image upload.", e)
        }
    }
    const submitThought = () => {
        try {
            uploadImage()
            postThought(title, topic, statement, tone, imageUrl) 
        } catch(e){
            console.error("error in POST", e)
        }
    }

    return(
        <div className="flex flex-col justify-start items-center">   

            <Field fieldName={"Title"} fieldSetter={setTitle} />

            <SelectionList 
                fieldSetter={setTopic}
                fieldState={topic}
                options={topicList}
                fieldName={"Topics"}
            />
            
            <Field fieldName={"Statement"} fieldSetter={setStatement} />

            <SelectionList
                fieldSetter={setTone}
                fieldState={tone}
                options={toneList}
                fieldName={"Tone"}
            />

            <ImageUploader
                imageState={image} 
                imageSetter={setImage}
                imageUrlSetter={setUrl}
            /> 

            <input className="border-2 rounded"
                type="button" value="Reset"
                onClick={{}}
            />

            <input className="border-2 rounded"
                type="button" value="Submit"
                onClick={submitThought}
            />


            

        </div>
    )
}

export default ThoughtCreator;