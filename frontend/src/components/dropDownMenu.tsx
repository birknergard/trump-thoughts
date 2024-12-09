import React, { Dispatch, SetStateAction, FC } from "react";

interface IDropdownMenu{
    optionList : string[],
    setter : Dispatch<SetStateAction<string>>,
    defaultSelection? : string,
    isFilter : boolean,
    field : string,
    filterFor? : string,
    className? : string
}

const DropdownMenu : FC<IDropdownMenu> = ({className, optionList, setter, defaultSelection, isFilter, filterFor, field}) => {

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
    <>
        {isFilter &&
            <select 
                className={className !== undefined ? className : "text-m w-28 ps-2 flex h-10 rounded-lg"}
                value={field === "" ? `Filter by ${filterFor}` : field }
                onChange={(e) => setter(e.target.value)}
                defaultValue={`Select a ${filterFor}`} 
            >
                <option value={`Select a ${filterFor}`} disabled selected hidden>
                    Filter by {filterFor}
                </option>

                {getOptions()}
            </select>
        }


        {!isFilter &&
            <select 
                className={className !== undefined ? className : "text-m w-28 ps-2 flex h-10 rounded-lg"}
                value={field}
                onChange={(e) => setter(e.target.value)}
                defaultValue={defaultSelection} 
            >
                <option value={"a topic *"} disabled selected hidden>
                    a topic*
                </option>

                {getOptions()}
            </select>
        }
    </>
    )
}
export default DropdownMenu