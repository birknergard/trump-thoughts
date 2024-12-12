import React, { Dispatch, FC, SetStateAction, useEffect, useState} from "react"
import IThought from "../interfaces/thought"
import ThoughtApi from "../services/thoughtService"
import DropdownMenu from "./dropDownMenu"
import Confirm from "./popUp"
import "../App.css"

interface ThoughtItemProps{
    thought : IThought,
    isPreview : boolean,

    topicList? : string[],
    toneList? : string[],
    previewImageSrc? : string | null

    deleteMethod?: (thought : IThought) => Promise<void>,
    modifyMethod?: (newThought : IThought) => Promise<void>
}

// you can edit anything but the image url (perhaps later) or id (never)
export interface IModifiedThought{
    title : string,
    statement : string,
    topic : string,
    tone : string,
}

const ThoughtItem : FC<ThoughtItemProps> = ({
    thought,
    isPreview,
    topicList,
    toneList,
    deleteMethod,
    modifyMethod,
    previewImageSrc,
}) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const [currentTitle, setNewTitle] = useState<string>(thought.title)
    const [currentStatement, setNewStatement] = useState<string>(thought.statement)
    const [currentTopic, setNewTopic] = useState<string>(thought.topic)
    const [currentTone, setNewTone] = useState<string>(thought.tone)
    
    const [attemptingDelete, setDeleteVerificationState] = useState<boolean>(false)
    
    const imageUrl = "http://localhost:5026/"

    const enableEditMode = () => {
        if(!isPreview){
            setEditMode(true)
        }
    }

    const disableEditMode = () => {
        if(!isPreview){
            setEditMode(false)
        }
    }

    const getNewThought = () : IThought => {
        return {
            id : thought.id,
            title : currentTitle,
            statement : currentStatement, 
            topic : currentTopic,
            tone : currentTone,            
            imageUrl : thought.imageUrl
        }     
    }

    const initiateDelete = () => {
        setDeleteVerificationState(true)
        if(thought.id === undefined) return 

    }
    
    const handleDelete = async() => {
        await deleteMethod!!(thought)
        setDeleteVerificationState(false)
        disableEditMode()
    }

    const handleModify = async() => {
        if(!isPreview){
            if(thought.id !== undefined){
                modifyMethod!!(getNewThought())
                disableEditMode()
            } else {
                console.error("Id is undefined!")
                disableEditMode()
            }
        }
    }
    
    // Generates an image SRC appropriate to program state
    const getSrc = () : string => {
        if(isPreview && thought.imageUrl !== "") return `${imageUrl}/temp/${thought.imageUrl}`
        if(thought.imageUrl !== "") return `${imageUrl}/images/${thought.imageUrl}`
        return `${imageUrl}/images/trump_placeholder.jpg`
    }

    return (
        <div className={`${!isPreview && "list__item"} h-fit flex flex-col items-center max-w-96 min-w-72 justify-between border border-sky-200 rounded-lg w-full ${attemptingDelete && "relative"}`}
            id={thought.id === undefined || thought.id === null ? "0" : thought.id.toString()}
        >

            {editMode === false && 
            <div className="flex flex-col items-center px-5 w-full">
                <h2 className="text-red-600 text-2xl my-1 text-center text-pretty break-words max-w-72" 
                    onClick={enableEditMode}
                >
                    Trump on{thought.title === "" ? " ... " : ` ${thought.title}`}
                </h2>

                <div className="flex flex-row justify-center w-full my-1 bg-slate-150 w-full">
                    <h2 className="text-xl text-white bg-sky-400 rounded-l-lg px-2 pr-3 py-1 min-w-20 text-center">
                       {thought.topic === "" ? " ... " : thought.topic} 
                    </h2>
                    <h2 className="text-xl text-white bg-red-400 rounded-r-lg px-2 pl-3 py-1 min-w-20 text-center">
                       {thought.tone === "" ? " ... " : thought.tone}
                    </h2>
                </div>
            
                <p className="min-h-20 text-base justify-self-center mx-4 text-center my-2 w-full max-w-384 text-balance break-words">
                    {thought.statement === "" ? `Empty statement ... ` : `\"${thought.statement}\"`}
                </p>
            </div>
            }

            { editMode === true && 
            <div className="flex flex-col items-center px-5">
                {attemptingDelete && 
                    <Confirm 
                        message="You are attempting to delete a thought. This action cannot be undone."
                        exitState={setDeleteVerificationState}
                        method={handleDelete}
                    />
                }
                <div className="flex flex-row items-center my-3 ">
                    <h2 className="text-red-400 text-2xl mr-2">
                        Trump on  
                    </h2>            
                    <input className="text-2xl border w-36"  
                        type="text"
                        disabled={attemptingDelete}
                        defaultValue={thought.title}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input 
                        disabled={attemptingDelete}
                        type="button" 
                        value="Delete"
                        onClick={initiateDelete}
                    />
                </div>
                <div className="flex flex-row items-center justify-around w-full my-1">
                    <DropdownMenu 
                        isDisabled={attemptingDelete}
                        isFilter={false}
                        field={currentTopic}
                        setter={setNewTopic}
                        optionList={topicList!!}
                        defaultSelection={thought.topic}
                    />
                    <DropdownMenu 
                        isDisabled={attemptingDelete}
                        isFilter={false}
                        field={currentTone}
                        setter={setNewTone}
                        optionList={toneList!!}
                        defaultSelection={thought.tone}
                    />
                </div>
                <textarea className="text-m border my-3 w-full h-36 p-1"
                    defaultValue={thought.statement}
                    disabled={attemptingDelete}
                    onChange={(e) => setNewStatement(e.target.value)}
                >
                </textarea>
                <div className="flex flex-row justify-evenly w-full my-1">
                    <input className="border w-28 h-10"
                        type="button" 
                        value="Discard"
                        disabled={attemptingDelete}
                        onClick={disableEditMode}
                    />
                    <input className="border w-28 h-10"
                        type="button" 
                        value="Save" 
                        disabled={attemptingDelete}
                        onClick={handleModify}
                    />
                </div>
            </div>
            }
            
            <img className="w-full h-64 rounded-b-lg object-cover mt-2 max-w-384"
                src={getSrc()}
            />
        </div>
    )
}

export default ThoughtItem