import React, { useContext, useEffect, useRef, useState } from "react";
import { useThoughtContext } from "../context/context";

function ThoughtCreator(){

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")
    const [tone, setTone] = useState("")

    const { postThought } = useThoughtContext()  

    const submitThought = () => {
        // TODO
        postThought(title, topic, statement) 
    }

    return(
        <form 
            className="flex flex-col " 
            method="post"
            onSubmit={submitThought}
        >   

            <Field fieldName={"Title"} field={title} fieldSetter={setTitle} />

            <TopicSelect topicSetter={setTopic} topicState={topic}/>
            
            <Field fieldName={"Statement"} field={statement} fieldSetter={setStatement} />
            <Field fieldName={"Tone"} field={tone} fieldSetter={setTone} />

            <input type="button" value="Submit" />
            <input type="button" value="Reset" />
        </form>
    )
}

function Field({fieldName, field, fieldSetter}){
    return(
        <>
            <h2 className="text-xl">{fieldName}</h2>
            <label htmlFor="title">Enter your {fieldName}</label>
            <input
                className="border border-red-700"
                name="title" type="text"
            ></input>
        </>
    )
}


function SelectionList({options, fieldName, fieldSetter}){
    const Item = ({option, fieldSetter, field}) => {
        
        const handleCheck = () => {
            fieldSetter(option)
        }

        return(
            <div className="flex flex-row ">
                <input 
                    className=""
                    type="radio" 
                    name={option} 
                    id={option}
                    checked={field === option}
                    onChange={handleCheck}
                />
            
                <p className="">
                    {capitalizeFirst(option)}
                </p>
            </div>
        )
    }
    
    const getTopicList = () => {  
        const itemComponents = options.map((_field, i) => (
            <TopicItem 
                key={`Topic_${i}`}
                topicState={topicState}
                topicSetter={topicSetter}
                topicString={_topic}
            />       ))    
        return itemComponents 
    }

    
    return(
        <>
        <h1 className="text-xl">Select a topic</h1>
        <div className="flex flex-col">
            {getTopicList()}
        </div>
        <h2 className="text-xl">Topic selected: {topicState}</h2>
        </>
    )
}

function TopicSelect({topicState, topicSetter}){

    const topicList = [
        "healthcare",
        "education",
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


    const capitalizeFirst = (string) => {

        var result = string[0].toUpperCase()
        for(var i = 1; i < string.length; i++){
            if(result[result.length - 1] == " ") {
                result += string[i].toUpperCase()
            } else {
                result += string[i]
            }
        }
        return result;
    }

    const TopicItem = ({topicString, topicSetter, topicState}) => {
        
        const handleCheck = () => {
            topicSetter(topicString)
        }

        return(
            <div className="flex flex-row ">
                <input 
                    className=""
                    type="radio" 
                    name={topicString} 
                    id={topicString}
                    checked={topicState === topicString}
                    onChange={handleCheck}
                />
            
                <p className="">
                    {capitalizeFirst(topicString)}
                </p>
            </div>
        )
    }
    
    const getTopicList = () => {  
        const topicComponents = topicList.map((_topic, i) => (
            <TopicItem 
                key={`Topic_${i}`}
                topicState={topicState}
                topicSetter={topicSetter}
                topicString={_topic}
            />
        ))    
        return topicComponents
    }

    
    return(
        <>
        <h1 className="text-xl">Select a topic</h1>
        <div className="flex flex-col">
            {getTopicList()}
        </div>
        <h2 className="text-xl">Topic selected: {topicState}</h2>
        </>
    )
}

export default ThoughtCreator;