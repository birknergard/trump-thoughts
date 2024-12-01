import React from "react"

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

export default Field;