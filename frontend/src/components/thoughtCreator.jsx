import React, { useEffect, useState } from "react";
import ThoughtApi from "../services/thoughtService";
import IThought from "../interfaces/thought";

function ThoughtCreator(){

    const [titleInput, setTitle] = useState("")
    const [topicInput, setTopic] = useState("")
    const [statementInput, setStatement] = useState("")

    const getTopicData = (data) => {

    }

    const submitThought = () => {
        
    }

    return(
        <form method="post" onSubmit={submitThought}>
            <input name="title" type="text"></input>
            <label htmlFor="title"></label>

            <TopicSelect />

            <input name="statement" type="text"></input>
            <label htmlFor="statement"></label>

        </form>
    )
}

const TopicSelect = () => {


    const topicList = [
        "healthcare",
        "Education",
        "immigration",
        "economy",
        "climate change",
        "gun control",
        "criminal justice",
        "abortion",
        "foreign policy",
        "social security",
        "millitary spending",
        "free speech",
        "lgbtq rights",
        "drugs",
        "infrastructure",
        "corporate regulation",
        "trade",
        "technology",
        "other"
    ]

    const TopicItem = ({topic}) => {
        return(
            <>
            <label htmlFor={topic}>{topic}</label>
            <input type="checkbox" name={`${topic}-checkbox`} id={topic} />
            </>
        )
    }
    
    const getTopicList = () => {  
        const topicComponents = topicList.map((_topic, i) => (
            <TopicItem 
                key={`Topic_${i}`}
                topic={_topic}
            />
        ))    
        return topicComponents
    }

    
    return(
        <>
        <h1>Select a topic</h1>
        <div>
            {getTopicList()}
        </div>
        </>
    )
}

export default ThoughtCreator;