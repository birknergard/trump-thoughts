import React, { useContext, useEffect, useRef, useState } from "react";
import { useThoughtContext } from "../context/thoughtContext";
import SelectionList from "./inputSelector";
import Field from "./inputField";
import ImageUploadService from "../services/imageUploadService";
import ImageUploader from "./imageUploader";
import DropdownMenu from "./dropDownMenu";

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
        "millitary spending", "free speech", "lgbtq+ rights",
        "drugs", "infrastructure", "corporate regulation",
        "trade", "technology", "other"
    ]

    const toneList = [
        "confident",  "combative", "controversial",
        "authoritative", "provocative", "charismatic",
        "blunt", "hyperbolic", "optimistic"
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
        <div className="cursor-auto flex flex-col justify-center items-start">   

            <div>
                <h2 className="text-2xl">Statement</h2>
                <textarea
                    className="border border-red-700 text-xl"
                    rows={5}
                    cols={30}
                    name="title" type="text"
                    onChange={(e) => setStatement(e.target.value)}
                ></textarea>
            </div>

            <DropdownMenu 
                title="Topic" 
                optionList={topicList} 
                setter={setTopic} 
            />

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