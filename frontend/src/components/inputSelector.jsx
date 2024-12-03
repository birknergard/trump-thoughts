import React, { useState } from "react"

function SelectionList({options, fieldName, fieldSetter}){

    const [toggledIndex, setToggledIndex] = useState(null)

    const capitalizeFirst = (string) => {
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

    const handleClick = (index) => {
        setToggledIndex(index)
        fieldSetter(options[index])
    }
    
    
    return(
        <div className="flex flex-col items-center w-screen">
            <h1 className="text-xl">Select a {fieldName}</h1>
            <div className="grid grid-cols-3 gap-3">
                {options.map((_field, i) => (
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