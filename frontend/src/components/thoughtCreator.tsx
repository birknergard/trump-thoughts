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
    imageUrl : string,
}

function ThoughtCreator(){

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")

    const [tone, setTone] = useState<string | null>(null)
    const [toggledIndex, setToggledIndex] = useState<number | null>(null)

    const [fileList, setFileList] = useState<FileList | null>(null)
    const [imageFile, setImage] = useState<File | null>(null)
    const [imageUrl, setUrl] = useState("")

    
    useEffect(() => {
        if(fileList != null){
            console.log(URL.createObjectURL(fileList[0]))
            setImage(fileList[0])
            setUrl(fileList[0].name)
        }
    }, [fileList])

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

        setEmptyFields(new Set([1,2,3,4,5]))
    }

    const updatePreview = () => {
        setPreviewThought({
            title: title,
            topic : topic,
            statement : statement,
            tone : tone !== null ? tone : "",
            image : imageFile,
            imageUrl : imageUrl,
        })
    }
    

    const findEmptyFields = () => {
        console.debug(emptyFields.size)
        const newSet = new Set<number>()

        if (title === "") {
            //console.log("Title is empty.");
            newSet.add(1)            
        }

        if (topic === "a topic*" || topic === "") {
            //console.log("Topic is set to the default placeholder.");
            newSet.add(2)            
        }

        if (statement === "") {
            //console.log("Statement is empty.");
            newSet.add(3)            
        }

        if (tone === "" || tone === null) {
            //console.log("Tone is empty.");
            newSet.add(4)            
        }

        if (imageFile === null) {
            //console.log("Image is not provided.");
            newSet.add(5)        
        }

        setEmptyFields(newSet) 
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

    const [emptyFields, setEmptyFields] = useState<Set<number>>(new Set([1,2,3,4,5]))
    const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false)
    
    const handleSubmit = () => {
        //findEmptyFields()
        setAttemptedSubmit(true)
        console.debug(emptyFields.size, emptyFields)
        if(emptyFields.size === 0){
            submitThought()
            reset()
        } else {
            console.log("Fields are not filled.")
        }
    }

    useEffect(() =>{
        findEmptyFields()
        updatePreview()
    }, [title, statement, topic, tone, imageUrl])

    const generateFields = () => {
        const fields = (
            <>
            <h2 className="text-xl mr-2">{"Trump on"}</h2>
            <Field style={attemptedSubmit && emptyFields.has(1) ? "border-red-600" : "border-sky-400"} 
                field={title} 
                fieldSetter={setTitle}
            />

            <div className="flex flex-col items-center justify-center my-2 w-full">
                <div className="flex flex-row justify-around items-center h-max">
                    <h2 className="text-base me-1">Statement on</h2>
                    <DropdownMenu 
                        className={`w-28 p-2 ${attemptedSubmit && emptyFields.has(2) && "border border-red-600"}`}
                        field={topic}
                        optionList={topicList}
                        isFilter={false}
                        setter={setTopic}
                    />
                </div>
            
                <textarea className={`border $text-m ${attemptedSubmit && emptyFields.has(3) ? "border-red-600" : ""} `}
                    cols={35}
                    rows={6}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                ></textarea>
            </div>

            <SelectionList
                buttonStyle={attemptedSubmit && emptyFields.has(4) ? "border-red-600" : ""}
                fieldSetter={setTone}
                options={toneList}
                fieldName={"Tone"}
                toggledIndex={toggledIndex}
                toggledIndexSetter={setToggledIndex}
            />

            <ImageHandler
                style={attemptedSubmit && emptyFields.has(5) ? "border-red-600" : ""}
                image={imageFile}
                imageUrl={imageUrl}
                fileListSetter={setFileList}
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

            </div>
            <h2 className="text-2xl m-5">
                Preview
            </h2>
            </>
        ) 
        return fields
    }


    return(
        <div className="flex flex-col justify-center items-center mt-24 w-full">   
            {generateFields()}

            {emptyFields.size <= 4 && 
                <div className="flex flex-col items-center w-4/5 md:w-2/5 lg:w-1/5">
                    <ThoughtItem 
                        isPreview={true}
                        thought={convertPreviewThought()}
                        previewImageSrc={fileList !== null ? URL.createObjectURL(fileList[0]) : ""}
                    />
                </div>
            }  
            {emptyFields.size === 5 &&
                <p>Enter a field to show preview.</p> 
            }

        </div>
    )
}

export default ThoughtCreator;