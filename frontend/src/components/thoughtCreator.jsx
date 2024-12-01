import React, { useContext, useEffect, useRef, useState } from "react";
import { useThoughtContext } from "../context/context";

function ThoughtCreator(){

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")
    const [tone, setTone] = useState("")

    const { postThought } = useThoughtContext()  

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

    const toneList = [
        "Angry",
        "Reverant",
        "Sad"
    ]

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

            <SelectionList 
                fieldSetter={setTopic}
                fieldState={topic}
                options={topicList}
                fieldName={"Topics"}
            />
            
            <Field fieldName={"Statement"} field={statement} fieldSetter={setStatement} />
            <Field fieldName={"Tone"} field={tone} fieldSetter={setTone} />

            <SelectionList
                fieldSetter={setTone}
                fieldState={tone}
                options={toneList}
                fieldName={"Tone"}
            />
            
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


function SelectionList({options, fieldName, fieldState, fieldSetter}){

    function Item({option, fieldSetter, fieldState}){
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
                    checked={fieldState === option}
                    onChange={handleCheck}
                />
            
                <p className="">
                    {capitalizeFirst(option)}
                </p>
            </div>
        )
    }
    
    const getSelectionList = () => {  
        const itemComponents = options.map((_field, i) => (
            <Item 
                key={`item_${i}`}
                option={_field}
                fieldState={fieldState}
                fieldSetter={fieldSetter}
            />       
        ))    
        return itemComponents 
    }

    
    return(
        <>
        <h1 className="text-xl">Select a topic</h1>
        <div className="flex flex-col">
            {getSelectionList()}
        </div>
        <h2 className="text-xl">selected: {fieldState}</h2>
        </>
    )
}

export default ThoughtCreator;