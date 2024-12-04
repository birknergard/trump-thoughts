import React, { useContext } from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";


function ThoughtList(){

    const { thoughts, updateThoughts } = useThoughtContext()

    interface IThoughtItem{
        id : string,
        title : string,
        statement: string,
        topic: string
    }

    const ThoughtItem = (props : IThoughtItem) => {
        return (
        <div id={props.id} className="flex justify-center items-start">
            <h1 className="text-sky-400">{props.title}</h1>
            <p>{props.statement}</p>
            <p>{props.topic}</p>
        </div>
        )
    }

    const getThoughtList = () => {
        const thoughtList = thoughts.map((_thought : IThought, i : number) => (
            <ThoughtItem 
                key={`Thought_${i}`} 
                id={`ID:${_thought.id}`}
                title={_thought.title}
                statement={_thought.statement}
                topic={_thought.topic}
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