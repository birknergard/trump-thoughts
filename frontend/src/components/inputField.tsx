import React, { Dispatch, FC, ReactNode, SetStateAction } from "react"

interface IField{
    field : string,
    fieldSetter : Dispatch<SetStateAction<string>>,
    style? : string
}

const Field : FC<IField>= ({field, fieldSetter, style}) => {
    return(
        <div className="flex flex-row items-center justify-center my-2">
            <input
                className={`${style} border`}
                name="title" type="text"
                value={field}
                onChange={(e) => fieldSetter(e.target.value)}
            ></input>
        </div>
    )
}

export default Field;