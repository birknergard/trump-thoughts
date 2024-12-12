import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useThoughtContext } from "../context/thoughtContext";
import SelectionList from "./inputSelector";
import Field from "./inputField";
import ImageHandler from "./imageHandler";
import DropdownMenu from "./dropDownMenu";

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

    const { topicList, toneList, updatePreviewThought, rawImageFile, setRawImageFile, removeImage, uploadImage} = useThoughtContext()
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
        console.log("Reset has been toggled.")
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
        setRawImageFile(null)

        setEmptyFields(new Set([1,2,3,4,5]))
        setAttemptedSubmit(false)

        localStorage.removeItem("THOUGHT")
    }

    const stash = () => {
        console.log("stashed")
        localStorage.setItem("THOUGHT", JSON.stringify({
            savedTitle: title,
            savedTopic: topic, 
            savedStatement : statement,
            savedTone : tone !== null ? tone : null, 
            savedToggledToneIndex: toggledIndex !== null ? toggledIndex : null ,
            savedImageUrl:  imageUrl,
        }))
    }
    
    const loadPrevious = () => {
        const storedData = localStorage.getItem("THOUGHT");
        console.log("Loaded storedData:", storedData);

        // Validate the retrieved data
        if (!storedData) {
            console.log("No previous thought found in localStorage.");
            return; // Exit early if no data
        }

        try {
            const storedThought = JSON.parse(storedData);

            if (storedThought) {
                // Set state only if the specific key exists in the parsed object
                setTitle(storedThought.savedTitle);
                setTopic(storedThought.savedTopic);
                setStatement(storedThought.savedStatement);
                setToggledIndex(storedThought.savedToggledToneIndex);
                setTone(storedThought.savedTone);
                setImageUrl(storedThought.savedImageUrl);
            } else {
                console.error("Stored thought is null after parsing.");
            }
        } catch (error) {
            console.error("Error parsing local storage data in loadPrevious:", error);
        }
    };


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
    }, [title, topic, statement, tone, imageUrl, toggledIndex])

    // Pageload
    useEffect(() => {
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
                <div className="flex flex-row justify-between align-center items-center w-full">
                    <ImageHandler 
                        elementStyle="w-1/2"
                        buttonStyle={attemptedSubmit && emptyFields.has(5) ? "w-full border-red-600 font-semibold text-red-800" : ""}
                        imageUrl={imageUrl}
                        setRawImageFile={setRawImageFile}
                    /> 
                    <input className="border-2 bg-sky-400 font-semibold text-white text-xl rounded-lg w-1/2 h-12 m-2"
                        type="button" value="Save Thought"
                        onClick={() => stash()}
                    />
                </div>
            </section>
        
        </>
    ) 
}

export default Creator