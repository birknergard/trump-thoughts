import React, { useContext } from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem, { IModifiedThought } from "./thoughtItem";
import ThoughtApi from "../services/thoughtService";


function ThoughtList(){

    const { thoughts, updateThoughts, topicList, toneList } = useThoughtContext()

    const modifyThought = async(newThought : IThought) => {
        if(newThought.id !== undefined){
            await ThoughtApi.update(newThought.id, newThought)
            updateThoughts()
        }
    }

    const removeThought = async(thought : IThought) => {
        if(thought.id !== undefined){
            // TODO: Add confirm dialog box?
            await ThoughtApi.remove(thought.id)
            updateThoughts()
        }
    } 
    
    const getThoughtList = () => {
        const thoughtList = thoughts.map((_thought : IThought, i : number) => (
            <ThoughtItem
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
        updateThoughts()
    }, [])

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-5/6 gap-20">
            {getThoughtList()}
        </div>
    )
}

export default ThoughtList;