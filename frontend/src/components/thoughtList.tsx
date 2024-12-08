import React, { act, useContext } from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem, { IModifiedThought } from "./thoughtItem";
import ThoughtApi from "../services/thoughtService";


function ThoughtList(){

    const { thoughts, setThoughts, fetchThoughts, topicList, toneList } = useThoughtContext()
    const [activeList, setActiveList] = useState<IThought[]>(thoughts)

    const update = async() => {
        await fetchThoughts()
        setActiveList(thoughts)
    }
    
    const modifyThought = async(newThought : IThought) => {
        if(newThought.id !== undefined){
            await ThoughtApi.update(newThought.id, newThought)
            update()
        }
    }

    const removeThought = async(thought : IThought) => {
        if(thought.id !== undefined){
            // TODO: Add confirm dialog box?
            await ThoughtApi.remove(thought.id)
            update()
        }
    } 
    
    const filteredList = (query : string) => {
        if(query === ""){
            return thoughts
        }
        const filteredList = thoughts.filter(thought => { 
            thought.title.startsWith(query)
        })
        console.log(filteredList)
        return filteredList
    }

    const getThoughtList = () => {
        const thoughtList = activeList.map((_thought : IThought, i : number) => (
            <ThoughtItem
                key={i}
                isPreview={false}
                thought={_thought}
                toneList={toneList}
                topicList={topicList}
                modifyMethod={modifyThought}
                deleteMethod={removeThought} 
            />
        ))
        return thoughtList;
    }
    
    useEffect(() => {
        update()
    }, [])

    return(
        <>
            <div className="flex flex-col items-center">
                <input className="border"
                    onChange={(e) => setActiveList(filteredList(e.target.value))}
                    defaultValue={""}
                    type="text"  
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-5/6 gap-20">
                {getThoughtList()}
            </div>
        </>
    )
}

export default ThoughtList;