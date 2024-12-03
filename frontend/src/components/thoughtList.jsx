import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useThoughtContext } from "../context/thoughtContext";

function ThoughtList(){

    const { thoughts } = useThoughtContext()

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

    return(
        <>
        <h1 className="text-sky-400">Trump Thoughts</h1>
        <div className="bg-red-600">
            {getThoughtList()}
        </div>
        </>
    )
}

export default ThoughtList;