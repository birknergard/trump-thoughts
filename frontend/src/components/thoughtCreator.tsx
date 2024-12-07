import React, { useContext, useEffect, useRef, useState } from "react";
import { useThoughtContext } from "../context/thoughtContext";
import SelectionList from "./inputSelector";
import Field from "./inputField";
import ImageUploadService from "../services/imageUploadService";
import ImageHandler from "./imageHandler";
import DropdownMenu from "./dropDownMenu";
import ThoughtItem from "./thoughtItem";
import IThought from "../interfaces/thought";

function ThoughtCreator(){

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")
    const [tone, setTone] = useState("")

    const [image, setImage] = useState<File | null>(null)
    const [imageUrl, setUrl] = useState("")

    const { postThought, status, topicList, toneList } = useThoughtContext() 

    const [previewThought, setPreviewThought] = useState<IThought>({
        title : "", 
        topic : "",
        statement : "",
        tone : "",
        imageUrl : "",
        // TODO: Image preview
    })

    const reset = () => {
        setTitle("")
        setTopic("a topic")
        setStatement("")
        // TODO: deselect selectionList
        setImage(null)
        setUrl("")
    }

    const updatePreview = () => {
        setPreviewThought({
            title: title,
            topic : topic,
            statement : statement,
            tone : tone,
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

        if (tone === "") {
            console.log("Tone is empty.");
            return false;
        }

        if (image === null) {
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
                if(image != null){
                    const response = await ImageUploadService.upload(image)
                    setUrl(response.data.fileName)
                }  
            } catch(e) {
                console.error()
            }
    }

    const submitThought = async() => {
            try {
                uploadImage()
                postThought(title, topic, statement, imageUrl, tone)
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

    return(
        <div className="cursor-auto flex flex-col justify-center items-center">   

            <Field fieldName="Title" fieldSetter={setTitle}/>


            <div className="flex flex-col items-center justify-center my-2 w-full">
                <div className="flex flex-row justify-around content-center">
                    <h2 className="text-m me-1">Statement on</h2>
                    <DropdownMenu 
                        optionList={topicList} 
                        setter={setTopic} 
                    />
                </div>

                <textarea className="border border-red-700 text-m"
                    cols={35}
                    rows={6}
                    name="title" 
                    onChange={(e) => setStatement(e.target.value)}
                ></textarea>
            </div>

            <SelectionList
                fieldSetter={setTone}
                options={toneList}
                fieldName={"Tone"}
            />

            <ImageHandler
                imageSetter={setImage}
                imageUrlSetter={setUrl}
            /> 
            
            <div className="flex flex-col items-center text-2xl">Status: {status}</div>

            <div className="flex flex-row items-center justify-center my-2 w-full">
                <input className="border-2 rounded w-1/4 h-10 m-2"
                    type="button" value="Reset"
                    // TODO // onClick={{}}
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
                    thought={previewThought}
                />
                </div>
            }
        </div>
    )
}

export default ThoughtCreator;