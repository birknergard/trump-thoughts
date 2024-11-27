import React from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import ThoughtApi from "../services/thought-service";

function ThoughtList(){

    const [thoughts, setThoughts] = useState<IThought[]>([])

    const updateThoughts = async() => {
        try {
            const fetchedThoughts = await ThoughtApi.getAll()
            if(fetchedThoughts != null){
                setThoughts(fetchedThoughts)
            }
        } catch(error){
            console.log(error);
        }
    }

    const ThoughtItem : React.FC<IThought> = ({id, title, statement, topic}) => {
        return (
        <div>
            <h1>{id} - {title}</h1>
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
        <h1>Trump Thoughts</h1>
        <div className="cols-span-1">
            {getThoughtList()}
        </div>
        </>
    )
}

export default ThoughtList;