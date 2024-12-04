import React from "react"
import IThought from "../interfaces/thought"

const ThoughtItem = (props : IThought) => {
    return (
        <div id={props.id == null ? "" : props.id.toString()} className="flex flex-col justify-center items-start">
            <h1 className="text-sky-400">{props.title}</h1>
            <p>{props.statement === "" ? "No statement" : props.statement}</p>
            <p>{props.topic === "on topic*" ? "No topic" : props.topic}</p>
            <p>{props.imageUrl=== "" ? "No imageUrl" : props.imageUrl}</p>
            <p>{props.tone === "" ? "No tone" : props.tone}</p>
        </div>
    )
}

export default ThoughtItem