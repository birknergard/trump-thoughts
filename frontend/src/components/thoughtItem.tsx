import React, { FC } from "react"
import IThought from "../interfaces/thought"

interface ThoughtItemProps{
    thought : IThought,
    isPreview : boolean
}

const ThoughtItem : FC<ThoughtItemProps> = ({thought, isPreview}) => {

    const imageUrl = "http://localhost:5026/images"

    return (
        <div  className="flex flex-col justify-center items-center mx-3"
            id={thought.id === undefined || thought.id === null ? "0" : thought.id.toString()}
        >
            <h1 className="text-red-400 text-2xl">
                Trump on{thought.title === "" ? " ... " : thought.title}
            </h1>

            <p className="text-m justify-self-center">
                "{thought.statement === "" ? "No statement" : thought.statement}"
            </p>
            <div className="flex justify-around w-full">
                <h2 className="text-">
                    {thought.topic === "" ? "No topic" : thought.topic}
                </h2>

                <h3 className="">
                    {thought.tone === "" ? "No tone" : thought.tone}
                </h3>
            </div>

            <img className="size-80 rounded-lg object-cover bg-sky-400"
                src={thought.imageUrl === "" ? `${imageUrl}/trump_placeholder.jpg` : `${imageUrl}/${thought.imageUrl}`}
            />
        </div>
    )
}

export default ThoughtItem