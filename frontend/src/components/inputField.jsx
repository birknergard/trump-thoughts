import React from "react"

function Field({fieldName, fieldSetter}){
    return(
        <div>
            <h2 className="text-xl">{fieldName}</h2>
            <label htmlFor="title">Enter your {fieldName}</label>
            <input
                className="border border-red-700"
                name="title" type="text"
                onChange={(e) => fieldSetter(e.target.value)}
            ></input>
        </div>
    )
}

export default Field;