import { Dispatch, FC, SetStateAction, useContext } from "react"
import DropdownMenu from "./dropDownMenu"
import { RiResetLeftLine } from "react-icons/ri"
import { useThoughtContext } from "../context/thoughtContext"

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
        <div className="flex flex-col items-center mb-5 w-4/5">
            <div className="flex flew-row mb-2 w-full justify-start">
                <input className="border border-red-400 text-base"
                    value={titleFilter}
                    onChange={(e) => titleFilterSetter(e.target.value)}
                    placeholder=" Search ..."
                    type="text"
                />
                <p className="ml-2">
                    Results: {listLength === null ? 0 : listLength}
                </p>
            </div>
            <div className="flex flex-row w-full justify-start">
                <DropdownMenu
                    field={topicFilter}
                    className="w-2/5 p-2 mr-1"
                    setter={topicFilterSetter}
                    optionList={topicList}
                    isFilter={true}
                    filterFor="topic"
                />
                
                <DropdownMenu
                    field={toneFilter}
                    className="w-2/5 p-2 ml-1"
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