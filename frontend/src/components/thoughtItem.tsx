import React from "react"

interface IThoughtItem{
    id : string,
    title : string,
    statement: string,
    topic: string
    imageUrl: string
}

const ThoughtItem = (props : IThoughtItem) => {
    return (
        <div id={props.id} className="flex justify-center items-start">
            <h1 className="text-sky-400">{props.title}</h1>
            <p>{props.statement}</p>
            <p>{props.topic}</p>
        </div>
    )
}

export default ThoughtItem