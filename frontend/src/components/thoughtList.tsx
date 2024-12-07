import React, { useContext } from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem from "./thoughtItem";


function ThoughtList(){

    const { thoughts, updateThoughts, topicList, toneList } = useThoughtContext()

    
    
    const getThoughtList = () => {
        const thoughtList = thoughts.map((_thought : IThought, i : number) => (
            <ThoughtItem
                isPreview={false}
                thought={_thought}
                toneList={toneList}
                topicList={topicList}
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