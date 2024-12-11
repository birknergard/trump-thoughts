import React, { Dispatch, FC, ReactNode, SetStateAction } from "react"

interface IField{
    field : string,
    fieldSetter : Dispatch<SetStateAction<string>>,
    style? : string
    submitFailed : boolean
}

const Field : FC<IField>= ({field, fieldSetter, style, submitFailed}) => {
    return(
        <div className="flex flex-col items-center justify-center my-2">
            <div className="flex flex-row align-center items-center">
                <h2 className="text-xl mr-2">{"Trump on"}</h2>
                <input
                    className={`${style} border p-1 rounded ${submitFailed && "placeholder:text-red-700 placeholder:font-semibold"}`}
                    name="title" type="text"
                    value={field}
                    placeholder={submitFailed ? "Enter a title*" : "Enter a title"}
                    onChange={(e) => fieldSetter(e.target.value)}
                ></input>
            </div>
        </div>
    )
}

export default Field;