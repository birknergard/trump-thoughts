import React, { useContext, useEffect, useRef, useState } from "react";
import { useThoughtContext } from "../context/thoughtContext";
import SelectionList from "./inputSelector";
import Field from "./inputField";
import ImageUploadService from "../services/imageUploadService";
import ImageHandler from "./imageHandler";
import DropdownMenu from "./dropDownMenu";
import ThoughtItem from "./thoughtItem";
import IThought from "../interfaces/thought";

interface IPreviewThought{
    title: string,
    topic: string,
    statement : string,
    tone : string | null,
    image : File | null,
    imageUrl : string
}

function ThoughtCreator(){

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")

    const [tone, setTone] = useState<string | null>(null)
    const [toggledIndex, setToggledIndex] = useState<number | null>(null)

    const [imageFile, setImage] = useState<File | null>(null)
    const [imageUrl, setUrl] = useState("")

    const { postThought, status, topicList, toneList } = useThoughtContext() 

    const [previewThought, setPreviewThought] = useState<IPreviewThought>({
        title : "", 
        topic : "",
        statement : "",
        tone : null,
        imageUrl : "",
        // TODO: Image preview
        image : null,
    })

    const convertPreviewThought = () : IThought => {
        return {
            title : previewThought.title,
            topic : previewThought.topic,
            statement : previewThought.statement,
            tone : previewThought.tone === null ? "No tone" : previewThought.tone,
            imageUrl : previewThought.imageUrl
        }
    }

    const reset = () => {
        setTitle("")
        setTopic("a topic")
        setStatement("")
        setToggledIndex(null)
        setTone("")
        setImage(null)
        setUrl("")
        setImage(null)
        setUrl("")
    }

    const updatePreview = () => {
        setPreviewThought({
            title: title,
            topic : topic,
            statement : statement,
            tone : tone!!,
            image : imageFile,
            imageUrl : imageUrl
        })
    }
    
    const fieldsAreFilled = () : Boolean =>{
        if (title === "") {
            console.log("Title is empty.");
            return false;
        }

        if (topic === "a topic*") {
            console.log("Topic is set to the default placeholder.");
            return false;
        }

        if (statement === "") {
            console.log("Statement is empty.");
            return false;
        }

        if (tone === "" || tone === null) {
            console.log("Tone is empty.");
            return false;
        }

        if (imageFile === null) {
            console.log("Image is not provided.");
            return false;
        }

        if (imageUrl === "") {
            console.log("Image URL is empty.");
            return false;
        }

        return true
    } 


    const uploadImage = async() => {
            try{
                if(imageFile != null){
                    const response = await ImageUploadService.upload(imageFile)
                    setUrl(response.data.fileName)
                }  
            } catch(e) {
                console.error()
            }
    }

    const submitThought = async() => {
            try {
                uploadImage()
                postThought(title, topic, statement, imageUrl, tone!!)
            } catch(e){
                console.error("error in POST", e)
            }
    }

    const handleSubmit = () => {
        if(fieldsAreFilled()){
            submitThought()
        } else {
            console.log("Fields are not filled.")
        }
    }

    const generateFields = () => {
        
        const fields = (
            <>
        
            <Field field={title} 
            fieldName="Title" fieldSetter={setTitle}/>

            <div className="flex flex-col items-center justify-center my-2 w-full">
                <div className="flex flex-row justify-around content-center">
                    <h2 className="text-m me-1">Statement on</h2>
                    <DropdownMenu 
                        field={topic}
                        optionList={topicList}
                        isFilter={false}
                        setter={setTopic} 
                    />
            </div>

                <textarea className="border border-red-700 text-m"
                    cols={35}
                    rows={6}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                ></textarea>
            </div>

            <SelectionList
                fieldSetter={setTone}
                options={toneList}
                fieldName={"Tone"}
                toggledIndex={toggledIndex}
                toggledIndexSetter={setToggledIndex}
            />

            <ImageHandler
                imageUrl={imageUrl}
                imageSetter={setImage}
                imageUrlSetter={setUrl}
            /> 
        
            <div className="flex flex-col items-center text-2xl">Status: {status}</div>

            <div className="flex flex-row items-center justify-center my-2 w-full">
                <input className="border-2 rounded w-1/4 h-10 m-2"
                    type="button" value="Reset"
                    onClick={reset}
                />
            {status !== "Uploading" &&
                <input className="border-2 rounded w-1/4 h-10 m-2"
                    type="button" value="Submit"
                    onClick={handleSubmit}
                />
            }
                <input className="border-2 rounded w-1/4 h-10 m-2"
                    type="button" value="Update"
                    onClick={updatePreview}
                />
            </div>
            <h2 className="text-2xl m-5">
                Preview
            </h2>
            {status == "Idle" && 
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full ">

                    <ThoughtItem 
                        isPreview={true}
                        thought={convertPreviewThought()}
                    />
                </div>
            }
            </>
        ) 
        return fields
    }

    return(
        <div className="cursor-auto flex flex-col justify-center items-center mt-24">   
            {generateFields()}
        </div>
    )
}

export default ThoughtCreator;