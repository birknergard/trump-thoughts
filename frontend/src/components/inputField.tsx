import React, { Dispatch, SetStateAction } from "react"

interface IField{
    fieldName : string,
    fieldSetter : Dispatch<SetStateAction<string>>
}

function Field(props : IField){
    return(
        <div className="flex flex-row items-center justify-center my-2">
            <h2 className="text-xl mr-2">{"Trump on"}</h2>
            <input
                className="border border-red-700"
                name="title" type="text"
                onChange={(e) => props.fieldSetter(e.target.value)}
            ></input>
        </div>
    )
}

export default Field;