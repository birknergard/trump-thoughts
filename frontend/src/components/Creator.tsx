import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
import { useThoughtContext } from "../context/thoughtContext";
import SelectionList from "./inputSelector";
import Field from "./inputField";
import ImageHandler from "./imageHandler";
import DropdownMenu from "./dropDownMenu";
import IPreviewThought from "../interfaces/previewThought";
import { upload } from "@testing-library/user-event/dist/upload";

interface ICreator {
    elementStyle? : string

    initiateReset : boolean,
    setResetState : Dispatch<SetStateAction<boolean>>

    attemptedSubmit : boolean,
    setAttemptedSubmit : Dispatch<SetStateAction<boolean>>

    emptyFields: Set<number>,
    setEmptyFields : Dispatch<SetStateAction<Set<number>>>
}

const Creator : FC<ICreator> = ({
    elementStyle,

    initiateReset,
    setResetState,

    attemptedSubmit,
    setAttemptedSubmit,
    
    emptyFields,
    setEmptyFields,

}) => {

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")
    const [tone, setTone] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState("")
    const [rawImageUrl, setRawImageUrl] = useState<string>("")

    const { topicList, toneList, updatePreviewThought, rawImageFile, setRawImageFile, removeImage, uploadImage, previewThought } = useThoughtContext()
    const [toggledIndex, setToggledIndex] = useState<number | null>(null)

    const updatePreview = () => {
        updatePreviewThought({
            title: title,
            topic : topic,
            statement : statement,
            tone : tone !== null ? tone : "",
            imageUrl : imageUrl, 
        })
    }

    // Resets the fields when a reset request (initiateReset == true) is registered 
    useEffect(() => {
        if(initiateReset){
            reset()
            setResetState(false) // resets the reset (haha)
        }
    }, [initiateReset])

    const reset = () => {
        setTitle("")
        setTopic("")
        setStatement("")
        setToggledIndex(null)
        setTone("")
        
        if(imageUrl !== ""){
            try{
                removeImage(imageUrl)
            } catch(error){
                console.error("Error with delete request. line 77 : Creator.tsx")
            }
        }

        setImageUrl("")

        setEmptyFields(new Set([1,2,3,4,5]))
        setAttemptedSubmit(false)
    }

    const stash = () => {
        if(localStorage.getItem("THOUGHT IN PROGRESS") === null){
            localStorage.setItem("THOUGHT IN PROGRESS", JSON.stringify(previewThought))
        }
        localStorage.setItem("THOUGHT IN PROGRESS", JSON.stringify([previewThought, toggledIndex]))
    }
    
    const loadPrevious = () => {
        const data : [IPreviewThought, number] = JSON.parse(localStorage.getItem("THOUGHT IN PROGRESS")!!)

        const previousThought = data[0]
        setToggledIndex(data[1])

        setTitle(previousThought.title !== undefined ? previewThought.title : "")
        setTopic(previewThought.topic !== undefined ? previousThought.topic : "")
        setStatement(previousThought.statement !== undefined ? previewThought.statement : "")
        setTone(previousThought.tone !== undefined ? previewThought.tone : "")
        setImageUrl(previousThought.imageUrl !== undefined ? previewThought.imageUrl : "")
    }
    

    const handleTempImageUpload = async() => {
        if(rawImageFile !== null){
            if(imageUrl === rawImageFile[0].name) {
                try {
                    await removeImage(imageUrl)
                    await uploadImage(rawImageFile[0])
                    setImageUrl(rawImageFile[0].name)
                } catch(error){
                    console.error("Creator: Error with DELETE / POST request for images: line 108: Creator.tsx")
                }
            } else if(imageUrl === "") {
                try {
                    await uploadImage(rawImageFile[0]) 
                    setImageUrl(rawImageFile[0].name)
                } catch (error) {
                    console.error("Creator: Error with POST request for images: line 123 : creator.tsx ") 
                }
            } else {
                try {
                    await removeImage(imageUrl) 
                    await uploadImage(rawImageFile[0])
                    setImageUrl(rawImageFile[0].name)
                } catch (error) {
                   console.error("Creator: Errow with DELETE / POST request for iamges: line 130: Creator.tsx") 
                }
            }
        }
    }
    // Whenever an image is uploaded the data is loaded into the components image hooks
    useEffect(() => {
        handleTempImageUpload()
    }, [rawImageFile])

    useEffect(() => {
        updatePreview()
        stash()
    }, [title, topic, statement, tone, imageUrl, toggledIndex])

    // Pageload
    useEffect(() => {
        // Resets information on pageload rather than when leaving the page
        reset()

        // Loads text fields from localstorage. Image data is loaded from API.
        loadPrevious()
    }, [])

    return (
        <>
            <section className={elementStyle}>
                <div className={`flex flew-row justify-center items-center`}>
                    <Field style={attemptedSubmit && emptyFields.has(1) ? "border-red-600" : "border-sky-400"} 
                        field={title} 
                        fieldSetter={setTitle}
                        submitFailed={attemptedSubmit}
                    />
                </div>

                <div className={`flex flex-col items-center my-2 w-full`}>
                    <div className="flex flex-row justify-around items-center h-max">
                        <h2 className="text-lg me-1">Statement on</h2>
                        <DropdownMenu 
                            className={`text-center border w-36 text-lg p-1 rounded-lg truncate ... ${attemptedSubmit && emptyFields.has(2) ? "border-red-600 bg-red-100 font-semibold text-red-900" : "text-gray-800 border-sky-300 bg-white" }`}
                            field={topic}
                            optionList={topicList}
                            isFilter={false}
                            setter={setTopic}
                        />
                    </div>
                
                    <textarea className={`rounded p-1 border text-m placeholder:text-center mt-2 ${attemptedSubmit && emptyFields.has(3) ? "border-red-600 placeholder:text-red-800" : "border-sky-300"} `}
                        cols={35}
                        rows={6}
                        placeholder={attemptedSubmit ? "Enter a statement by donald trump ...*" : "Enter a statement by donald trump ..."}
                        value={statement}
                        onChange={(e) => setStatement(e.target.value)}
                    ></textarea>
                </div>

                <SelectionList 
                    fieldState={tone}
                    buttonStyle={attemptedSubmit && emptyFields.has(4) ? "border-red-600" : ""}
                    submitFailed={attemptedSubmit && emptyFields.has(4)}
                    fieldSetter={setTone}
                    options={toneList}
                    fieldName={"Tone"}
                    toggledIndex={toggledIndex}
                    toggledIndexSetter={setToggledIndex}
                />

                <ImageHandler 
                    buttonStyle={attemptedSubmit && emptyFields.has(5) ? "border-red-600 font-semibold text-red-800" : ""}
                    imageUrl={imageUrl}
                    setRawImageFile={setRawImageFile}
                /> 
            </section>
        
        </>
    ) 
}

export default Creator