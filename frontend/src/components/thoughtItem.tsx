import React, { FC, useState} from "react"
import IThought from "../interfaces/thought"
import ThoughtApi from "../services/thoughtService"
import DropdownMenu from "./dropDownMenu"

interface ThoughtItemProps{
    thought : IThought,
    isPreview : boolean,

    topicList? : string[],
    toneList? : string[],

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

const ThoughtItem : FC<ThoughtItemProps> = ({thought, isPreview, topicList, toneList, deleteMethod, modifyMethod}) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    //if(!isPreview && editMode){
        const [currentTitle, setNewTitle] = useState<string>(thought.title)
        const [currentStatement, setNewStatement] = useState<string>(thought.statement)
        const [currentTopic, setNewTopic] = useState<string>(thought.topic)
        const [currentTone, setNewTone] = useState<string>(thought.tone)
    //}

    
    const imageUrl = "http://localhost:5026/images"

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

    const handleDelete = async() => {
        if(!isPreview){
            if(thought.id !== undefined){
                await deleteMethod!!(thought)
                disableEditMode()
            }
        }
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


    return (
        <div  className="flex flex-col items-center  col-auto border"
            id={thought.id === undefined || thought.id === null ? "0" : thought.id.toString()}
        >
            {editMode === false && 
            <>
                <h2 className="text-red-400 text-2xl" 
                    onClick={enableEditMode}
                >
                    Trump on{thought.title === "" ? " ... " : ` ${thought.title}`}
                </h2>
            
                <p className="text-m justify-self-center">
                    "{thought.statement === "" ? "No statement" : thought.statement}"
                </p>
                <div className="flex justify-around w-full">
                    <h2 className="text-xl">
                        {thought.topic === "" ? "No topic" : thought.topic}
                    </h2>

                    <h2 className="text-xl">
                        {thought.tone === "" ? "No tone" : thought.tone}
                    </h2>
                </div>
            </>
            }

            { editMode === true &&
            <>
                <div className="flex flex-row items-center">
                    <h2 className="text-2xl">
                        Trump on  
                    </h2>            
                    <input className="text-2xl border w-36" 
                        type="text"
                        defaultValue={thought.title}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <input 
                        type="button" 
                        value="Delete"
                        onClick={handleDelete}
                    />
                </div>
                <textarea className="text-m border"
                    cols={30}
                    rows={4}
                    defaultValue={thought.statement}
                    onChange={(e) => setNewStatement(e.target.value)}
                >
                </textarea>
                <div className="flex flex-row">
                    <DropdownMenu 
                        setter={setNewTopic}
                        optionList={topicList!!}
                        topicSelected={thought.topic}
                    />
                    <DropdownMenu 
                        setter={setNewTone}
                        optionList={toneList!!}
                        topicSelected={thought.tone}
                    />
                </div>
                <div className="flex flex-row justify-between w-full">
                    <input 
                        type="button" 
                        value="Discard Changes"
                        onClick={disableEditMode}
                    />
                    <input 
                        type="button" 
                        value="Save" 
                        onClick={handleModify}
                    />
                </div>
            </>
            }
            
                <img className="w-full h-64 rounded-lg object-cover"
                src={thought.imageUrl === "" ? `${imageUrl}/trump_placeholder.jpg` : `${imageUrl}/${thought.imageUrl}`}
                />
        </div>
    )
}

export default ThoughtItem