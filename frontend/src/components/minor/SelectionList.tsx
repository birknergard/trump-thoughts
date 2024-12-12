import React, { FC, Dispatch, SetStateAction, useState } from "react"

interface ISelectionList{
    fieldState : string | null,
    options : string[],
    fieldName : string,
    fieldSetter : Dispatch<SetStateAction<string | null>>,
    toggledIndex : number | null,
    toggledIndexSetter : Dispatch<SetStateAction<number | null>>,
    elementStyle? : string
    buttonStyle? : string
    submitFailed? : boolean
}

const SelectionList : FC<ISelectionList> = ({
    fieldState,
    elementStyle,
    buttonStyle,
    options,
    fieldName,
    fieldSetter,
    toggledIndex,
    toggledIndexSetter,
    submitFailed 
}) => {

    const capitalizeFirst = (string : string) => {
        var result = string[0].toUpperCase()
        for(var i = 1; i < string.length; i++){
            if(result[result.length - 1] == " ") {
                result += string[i].toUpperCase()
            } else {
                result += string[i]
            }
        }
        return result;
    }

    const handleClick = (index : number, value : string) => {
        if(fieldState === value){
            fieldSetter(null)
            toggledIndexSetter(null)
        } else {
            fieldSetter(value)
            toggledIndexSetter(index)
        }
    }
    
    
    return(
        <div className={`${elementStyle} flex flex-col items-center w-full my-2 `}>
            <h1 className={`text-xl mb-3 ${submitFailed && "text-red-800 font-semibold"}`}>{fieldName}{submitFailed && "*"}</h1>
            <div className="grid grid-cols-3 gap-3">
                {options.map((_field, i) => (
                    <input
                        key={`item_${i}`}
                        className={`w-full border border-sky-300 px-2 py-1 rounded hover:cursor-pointer hover:bg-sky-100 ${buttonStyle} ${
                            toggledIndex === i ? "bg-sky-500 text-white" : "bg-white"  
                        }`}
                        type="button"
                        onClick={() => handleClick(i, _field)}
                        value={capitalizeFirst(_field)}
                    />
                ))}
            </div>
        </div>
    )
}

export default SelectionList