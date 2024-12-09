import React, { act, useContext } from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem, { IModifiedThought } from "./thoughtItem";
import ThoughtApi from "../services/thoughtService";

enum Status{
    loading = "Loading",
    idle = "Idle",
    complete = "Completeaa"
}

function ThoughtList(){

    const { thoughts, setThoughts, fetchThoughts, topicList, toneList } = useThoughtContext()
    const [activeList, setActiveList] = useState<IThought[] | null>(null)


    const update = async() => {
        await fetchThoughts()
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
        if(activeList !== null){
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
        return (
            <h2>
                Content couldn't be loaded.
            </h2>
        )
    }
    
    useEffect(() => {
        update()
        setActiveList(thoughts)
    }, [])

    return(
        <>
            <div className="flex flex-col items-center mb-5">
                <div className="flex flew-row">
                    <input className="border border-red-400"
                        onChange={(e) => setActiveList(filteredList(e.target.value))}
                        defaultValue={""}
                        placeholder=" Search ..."
                        type="text"
                    />
                    <p className="ml-2">
                        Results: {activeList !== null ? activeList.length : 0}
                    </p>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-5/6 gap-20">
                {activeList !== null ? getThoughtList() : <h2>Content couldn't be loaded</h2>}
            </div>
        </>
    )
}

export default ThoughtList;