import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useThoughtContext } from "../context/thoughtContext";

function ThoughtList(){

    const { thoughts, updateThoughts } = useThoughtContext()

    const ThoughtItem = ({title, statement, topic}) => {
        return (
        <div className="flex justify-center items-start">
            <h1 className="text-sky-400">{title}</h1>
            <p>{statement}</p>
            <p>{topic}</p>
        </div>
        )
    }

    const getThoughtList = () => {
        const thoughtList = thoughts.map((_thought, i) => (
            <ThoughtItem 
                key={`Thought_${i}`} 
                id={_thought.id}
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
        <h1 className="m-4 text-sky-400 text-3xl flex justify-center">Trump man thinkin hmm</h1>
        <div className="bg-red-600">
            {getThoughtList()}
        </div>
        </>
    )
}

export default ThoughtList;