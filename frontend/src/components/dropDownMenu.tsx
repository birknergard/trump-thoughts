import React from "react";

interface IDropdownMenu{
    title : string,
    optionList : string[]
    setter : React.Dispatch<React.SetStateAction<string>>

}


function DropdownMenu (props : IDropdownMenu){

    const getOptions = () => {
        const options = props.optionList.map((option, i)  => (
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
        <div className="flex flex-col items-center my-2">
            <h2 className="text-2xl">{props.title}</h2>
            <select 
                className="text-xl"
                onChange={(e) => props.setter(e.target.value)}
            >
                {getOptions()}
            </select>
        </div>
    )
}
export default DropdownMenu