import { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from "react";
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
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageUrl, setImageUrl] = useState("")

    const { topicList, toneList, updatePreviewThought, rawImageFile, setRawImageFile } = useThoughtContext()
    const [toggledIndex, setToggledIndex] = useState<number | null>(null)

    const updatePreview = () => {
        updatePreviewThought({
            title: title,
            topic : topic,
            statement : statement,
            tone : tone !== null ? tone : "",
            image : imageFile,
            imageUrl : imageUrl,
            rawImageUrl : rawImageFile !== null ? URL.createObjectURL(rawImageFile[0]) : undefined
        })
    }

    // Resets the fields when a reset request (initiateReset == true) is sent
    useEffect(() => {
        if(initiateReset){
            reset()
            setResetState(false)
        }
    }, [initiateReset])

    useEffect(() => {
        if(rawImageFile != null){
            setImageFile(rawImageFile[0])
            setImageUrl(rawImageFile[0].name)
        }
    }, [rawImageFile])

    const reset = () => {
        setTitle("")
        setTopic("")
        setStatement("")
        setToggledIndex(null)
        setTone("")
        setImageFile(null)
        setImageUrl("")
        setRawImageFile(null)

        setEmptyFields(new Set([1,2,3,4,5]))
        setAttemptedSubmit(false)
    }

    useEffect(() => {
        updatePreview()
    }, [title, topic, statement, tone, imageFile, imageUrl, toggledIndex])

    return (
        <>
            <div className={`${elementStyle} flex flew-row justify-center items-center`}>
                <Field style={attemptedSubmit && emptyFields.has(1) ? "border-red-600" : "border-sky-400"} 
                    field={title} 
                    fieldSetter={setTitle}
                    submitFailed={attemptedSubmit}
                />
            </div>

            <div className={`${elementStyle} flex flex-col items-center my-2 w-full`}>
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

            <SelectionList elementStyle={elementStyle}
                fieldState={tone}
                buttonStyle={attemptedSubmit && emptyFields.has(4) ? "border-red-600" : ""}
                submitFailed={attemptedSubmit && emptyFields.has(4)}
                fieldSetter={setTone}
                options={toneList}
                fieldName={"Tone"}
                toggledIndex={toggledIndex}
                toggledIndexSetter={setToggledIndex}
            />

            <ImageHandler elementStyle={elementStyle}
                buttonStyle={attemptedSubmit && emptyFields.has(5) ? "border-red-600 font-semibold text-red-800" : ""}
                image={imageFile}
                imageUrl={imageUrl}
                fileListSetter={setRawImageFile}
            /> 
        
        </>
    ) 
}

export default Creator