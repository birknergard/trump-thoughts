import React, { Dispatch, SetStateAction, useState } from "react"

interface ISelectionList{
    options : string[],
    fieldName : string,
    fieldSetter : Dispatch<SetStateAction<string>>,
}

function SelectionList(props : ISelectionList){

    const [toggledIndex, setToggledIndex] = useState<number | null>(null)

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
        props.fieldSetter(value)
        console.log(value)
        setToggledIndex(index)
    }
    
    
    return(
        <div className="flex flex-col items-center w-screen my-2 ">
            <h1 className="text-2xl">{props.fieldName}</h1>
            <div className="grid grid-cols-3 gap-3">
                {props.options.map((_field, i) => (
                    <input
                        key={`item_${i}`}
                        className={`w-full border px-2 py-1 rounded ${
                            toggledIndex === i ? "bg-red-400 text-white" : "bg-white"  
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