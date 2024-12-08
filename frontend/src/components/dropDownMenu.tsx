import React, { Dispatch, SetStateAction, FC } from "react";

interface IDropdownMenu{
    optionList : string[],
    setter : Dispatch<SetStateAction<string>>,
    topicSelected? : string
}

const DropdownMenu : FC<IDropdownMenu> = ({optionList, setter, topicSelected}) => {

    const getOptions = () => {
        const options = (
            optionList.map((option, i)  => (
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
            className="text-m w-28 ps-2 flex h-10 rounded-lg"
            onChange={(e) => setter(e.target.value)}
            defaultValue={topicSelected} 
        >
            <option value={"a topic *"}>
                a topic*
            </option>
            {getOptions()}
        </select>
    )
}
export default DropdownMenu