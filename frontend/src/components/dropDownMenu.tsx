import React, { Dispatch, SetStateAction, FC } from "react";

interface IDropdownMenu{
    optionList : string[],
    setter : Dispatch<SetStateAction<string>>,
    defaultSelection? : string
    isFilter? : boolean,
    filterFor? : string
    className? : string
}

const DropdownMenu : FC<IDropdownMenu> = ({className, optionList, setter, defaultSelection, isFilter, filterFor}) => {

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
            className={className !== undefined ? className : "text-m w-28 ps-2 flex h-10 rounded-lg"}
            onChange={(e) => setter(e.target.value)}
            
            defaultValue={!isFilter ? defaultSelection : `Select a ${filterFor}`} 
        >
            {!isFilter && 
                <option value={"a topic *"} disabled selected hidden>
                    a topic*
                </option>
            }
            
            {isFilter && 
                <option value={`Select a ${filterFor}`} disabled selected hidden>
                    Filter by {filterFor}
                </option>

            }

            {getOptions()}
        </select>
    )
}
export default DropdownMenu