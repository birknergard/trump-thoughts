import React, { useContext } from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem from "./thoughtItem";


function ThoughtList(){

    const { thoughts, updateThoughts } = useThoughtContext()


    const getThoughtList = () => {
        const thoughtList = thoughts.map((_thought : IThought, i : number) => (
            <ThoughtItem
                key={`Thought_${i}`} 
                id={_thought.id}
                title={_thought.title}
                statement={_thought.statement}
                topic={_thought.topic}
                imageUrl={`http://localhost/5026/images/${_thought.imageUrl}`}
                tone={_thought.tone}
            />
        ))
        return thoughtList;
    }
    
    useEffect(() => {
        updateThoughts()
    }, [])

    return(
        <>
        <div className="bg-red-600">
            {getThoughtList()}
        </div>
        </>
    )
}

export default ThoughtList;