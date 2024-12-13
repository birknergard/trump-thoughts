import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useCreatorContext } from "../context/CreatorContext";
import SelectionList from "./minor/SelectionList";
import Field from "./minor/Field";
import ImageHandler from "./minor/ImageHandler";
import DropdownMenu from "./minor/DropDownMenu";

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

    const {
        topicList,
        toneList,
        updatePreviewThought, 
        rawImageFile, 
        setRawImageFile, 
        removeTempImage, 
        uploadTempImage
    } = useCreatorContext()

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

    const reset = async() => {
        console.log("Reset has been toggled.")

        setTitle("")
        setTopic("")
        setStatement("")
        setToggledIndex(null)
        setTone("")
        setImageUrl("")
        setRawImageFile(null)
        setEmptyFields(new Set([1,2,3,4,5]))
        setAttemptedSubmit(false)

        localStorage.removeItem("THOUGHT")
    }


    const [saveButtonState, setSaveButtonState] = useState<boolean>(false)
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

        if (storedData === undefined || storedData === null) {
            console.log("No previous thought found in localStorage.");
            return false
        }

        try {
            const storedThought = JSON.parse(storedData);

            if (storedThought) {
                setTitle(storedThought.savedTitle);
                setTopic(storedThought.savedTopic);
                setStatement(storedThought.savedStatement);
                setToggledIndex(storedThought.savedToggledToneIndex);
                setTone(storedThought.savedTone);
                setImageUrl(storedThought.savedImageUrl);
                return true
            } else {
                console.error("Stored thought is null.");
                return false
            }
        } catch (error) {
            console.error("Error parsing local storage data in loadPrevious:", error);
            return false
        }
    };


    const handleTempImageUpload = async() => {
        if(rawImageFile !== null){
            if(imageUrl === rawImageFile[0].name) {
                try {
                    await removeTempImage(imageUrl)
                    await uploadTempImage(rawImageFile[0])
                    setImageUrl(rawImageFile[0].name)
                } catch(error){
                    console.error("Creator: Error with DELETE / POST request for images: line 108: Creator.tsx")
                }
            } else if(imageUrl === "") {
                try {
                    await uploadTempImage(rawImageFile[0]) 
                    setImageUrl(rawImageFile[0].name)
                } catch (error) {
                    console.error("Creator: Error with POST request for images: line 123 : creator.tsx ") 
                }
            } else {
                try {
                    await removeTempImage(imageUrl) 
                    await uploadTempImage(rawImageFile[0])
                    setImageUrl(rawImageFile[0].name)
                } catch (error) {
                   console.error("Creator: Errow with DELETE / POST request for iamges: line 130: Creator.tsx") 
                }
            }
        }
    }

    const deleteTempImageWhenNotSaved = () => {
        console.log("PageLoad: attempting removal of image in temp, src:", imageUrl)
        const tempImage = localStorage.getItem("URL") 
        if(tempImage !== null){
            try {
                removeTempImage(tempImage)
            } catch (error) {
                console.log("PageLoad deletion of tempimage error.", error)
            }
        }
    }

    // Whenever an image is uploaded the data is loaded into the components image hooks
    useEffect(() => {
        if(rawImageFile !== null){
            handleTempImageUpload()
            setImageUrl(rawImageFile[0].name)
            localStorage.setItem("URL", rawImageFile[0].name)
            setRawImageFile(null)
        }
    }, [rawImageFile])

    useEffect(() => {
        updatePreview()
    }, [title, topic, statement, tone, imageUrl, toggledIndex])

    // Pageload
    useEffect(() => {
        setSaveButtonState(false)
        // If an image was uploaded on last pagevist, but the thought was not saved, the image is deleted from temp.
        if(loadPrevious() === false){
            deleteTempImageWhenNotSaved()
        }
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
                <div className="flex flex-row justify-between align-end items-end w-full">
                    <ImageHandler 
                        elementStyle="w-1/2"
                        buttonStyle={attemptedSubmit && emptyFields.has(5) ? "w-full border-red-600 font-semibold text-red-800" : ""}
                        imageUrl={imageUrl}
                        setRawImageFile={setRawImageFile}
                    /> 
                    <div className="w-1/2 flex flex-col items-center align-end">
                        <input 
                        className="hover:border-2 hover:border-emerald-400 
                        hover:bg-emerald-100 hover:text-emerald-400 h-12 font-semibold
                        bg-emerald-400 text-white text-xl rounded-lg w-full h-14 m-2"
                            type="button" value="Save Thought"
                            onClick={() => {
                                stash()
                                setSaveButtonState(true)
                            }}
                        />
                        {saveButtonState && <p className="text-sm text-lime-600">Saved progress!</p>}
                    </div>
                </div>
            </section>
        
        </>
    ) 
}

export default Creator