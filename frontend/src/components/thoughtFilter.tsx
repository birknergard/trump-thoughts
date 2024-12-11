import { Dispatch, FC, SetStateAction, useContext } from "react"
import DropdownMenu from "./dropDownMenu"
import { RiResetLeftLine } from "react-icons/ri"
import { useThoughtContext } from "../context/thoughtContext"
import "../App.css"

interface IThoughtFilter{
    
    titleFilter : string,
    titleFilterSetter : Dispatch<SetStateAction<string>>,

    topicFilter : string,
    topicFilterSetter : Dispatch<SetStateAction<string>>,

    toneFilter : string,
    toneFilterSetter : Dispatch<SetStateAction<string>>
    
    style? : string
    listLength : number
}

const ThoughtFilter : FC<IThoughtFilter> = ({
    style,
    titleFilter,
    titleFilterSetter,
    topicFilter,
    topicFilterSetter,
    toneFilter,
    toneFilterSetter,
    listLength 
}) => {

    const {toneList, topicList} = useThoughtContext()

    const resetFilters = () => {
        titleFilterSetter("")
        topicFilterSetter("")
        toneFilterSetter("")
    }

    return(
        <div className="flex flex-col items-center list__filter">
            <div className="flex flew-row mb-2 w-full justify-start items-center">
                <input className="border border-red-400 text-base min-w-36 max-w-4/5 p-1"
                    value={titleFilter}
                    onChange={(e) => titleFilterSetter(e.target.value)}
                    placeholder=" Search ..."
                    type="text"
                />
                <p className="ml-2 text-md">
                    Results: {listLength === null ? 0 : listLength}
                </p>
            </div>
            <div className="flex flex-row w-full justify-start">
                <DropdownMenu
                    field={topicFilter}
                    className="min-w-26 max-w-52 p-2 mr-1 rounded bg-sky-100 border-sky-500"
                    setter={topicFilterSetter}
                    optionList={topicList}
                    isFilter={true}
                    filterFor="topic"
                />
                
                <DropdownMenu
                    field={toneFilter}
                    className="min-w-26 max-w-52 p-2 ml-1 rounded bg-sky-100 border-sky-500"
                    setter={toneFilterSetter}
                    optionList={toneList}
                    isFilter={true}
                    filterFor="tone"
                />

                <button className="ml-2" type="button" value="Reset" 
                    onClick={() => {
                        resetFilters()
                    }}>
                    <RiResetLeftLine size={25} color="#FF1F1F"/>
                </button>
            </div>

        </div>
    )
}
export default ThoughtFilter