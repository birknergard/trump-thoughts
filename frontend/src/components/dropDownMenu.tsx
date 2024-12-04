import React, { Dispatch, SetStateAction } from "react";

interface IDropdownMenu{
    title : string,
    optionList : string[]
    setter : Dispatch<SetStateAction<string>>
}

function DropdownMenu (props : IDropdownMenu){

    const getOptions = () => {
        const options = (
            props.optionList.map((option, i)  => (
            <option
                key={`key-${i}`} 
                value={option}
            >
                {option}
            </option>
            )))

        return options;
    }

    return(
        <select 
            className="text-m w-min ps-2 flex"
            onChange={(e) => props.setter(e.target.value)}
            defaultValue={"a topic *"}
        >
            <option value={"a topic *"}>
                a topic*
            </option>
            {getOptions()}
        </select>
    )
}
export default DropdownMenu