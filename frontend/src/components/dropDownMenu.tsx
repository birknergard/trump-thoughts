import React, { Dispatch, SetStateAction, FC } from "react";

interface IDropdownMenu{
    optionList : string[],
    setter : Dispatch<SetStateAction<string>>,
    isFilter : boolean,
    field : string,
    defaultSelection? : string,
    filterFor? : string,
    className? : string,
    isDisabled? : boolean
}

const DropdownMenu : FC<IDropdownMenu> = ({
    className,
    optionList,
    field,
    setter,
    isFilter,
    filterFor,
    isDisabled
}) => {

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
            >
                <option value={`Select a ${filterFor}`} selected hidden>
                    Filter by {filterFor}
                </option>

                {getOptions()}
            </select>
        }


        {!isFilter &&
            <select 
                className={className !== undefined ? className : "text-m w-28 ps-2 flex h-10 rounded-lg"}
                disabled = {isDisabled}
                value={field === "" ? "a topic" : field}
                onChange={(e) => setter(e.target.value)}
            >
                <option value={"a topic"} disabled selected hidden>
                    a topic*
                </option>

                {getOptions()}
            </select>
        }
    </>
    )
}
export default DropdownMenu