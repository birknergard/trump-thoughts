import React from "react";

function DropdownMenu({title, optionList, setter}){

    const getOptions = () => {
        const options = optionList.map((option, i)  => (
            <option
                key={`key-${i}`} 
                value={option}
            >
                {option}
            </option>
        ))

        return options;
    }

    return(
        <div>
            <h2 className="text-2xl">{title}</h2>
            <select 
                className="text-xl"
                onChange={(e) => setter(e.target.value)}
            >
                {getOptions()}
            </select>
        </div>
    )
}
export default DropdownMenu