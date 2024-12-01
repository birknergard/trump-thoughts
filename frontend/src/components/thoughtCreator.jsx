import React, { useContext, useEffect, useRef, useState } from "react";
import { useThoughtContext } from "../context/context";
import SelectionList from "./inputSelector";
import Field from "./inputField";

function ThoughtCreator(){

    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState("")
    const [statement, setStatement] = useState("")
    const [tone, setTone] = useState("")

    const { postThought } = useThoughtContext()  

    const topicList = [
        "healthcare", "education", "immigration", "economy",
        "climate change", "gun control", "criminal justice",
        "abortion", "foreign policy", "social security",
        "millitary spending", "free speech", "lgbtq rights",
        "drugs", "infrastructure", "corporate regulation",
        "trade", "technology", "other"
    ]

    const toneList = [
        "confident",  "combative", "controversial",
        "authoritative", "provocative", "charismatic",
        "blunt", "hyperbolic", "defensive", "optimistic"
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

export default ThoughtCreator;