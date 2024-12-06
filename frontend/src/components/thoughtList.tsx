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
                isPreview={false}
                thought={_thought}
            />
        ))
        return thoughtList;
    }
    
    useEffect(() => {
        updateThoughts()
    }, [])

    return(
        <>
        <div className="">
            {getThoughtList()}
        </div>
        </>
    )
}

export default ThoughtList;