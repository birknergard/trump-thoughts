import React, { Dispatch, SetStateAction } from "react"

interface IField{
    fieldName : string,
    fieldSetter : Dispatch<SetStateAction<string>>
}

function Field(props : IField){
    return(
        <div>
            <h2 className="text-xl">{props.fieldName}</h2>
            <label htmlFor="title">Enter your {props.fieldName}</label>
            <input
                className="border border-red-700"
                name="title" type="text"
                onChange={(e) => props.fieldSetter(e.target.value)}
            ></input>
        </div>
    )
}

export default Field;