import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem from "./thoughtItem";
import ThoughtApi from "../services/thoughtService";
import DropdownMenu from "./dropDownMenu";
import { RiResetLeftLine } from "react-icons/ri";
import Filter from "../services/thoughtFilter";
import { timeEnd } from "console";

enum Status{
    idle = "Idle",
    loading = "Loading",
    complete = "Complete"
}

function ThoughtList(){

    const [listState, setStatus] = useState<Status>(Status.idle) 
    const {thoughts, fetchThoughts, fetchThoughtsByTopic, fetchThoughtsByTone, fetchThoughtsByToneAndTopic, topicList, toneList, deleteThought} = useThoughtContext()
    const [activeList, setActiveList] = useState<IThought[] | null>(null)


    const [titleFilter, setTitleFilter] = useState<string>("")
    const [topicFilter, setTopicFilter] = useState<string>("")
    const [toneFilter, setToneFilter] = useState<string>("")


    const resetFilters = () => {
        setTitleFilter("")
        setToneFilter("")
        setTopicFilter("")
    }

    const update = async() => {
        await fetchThoughts()
    }
    
    const modifyThought = async(newThought : IThought) => {
        if(newThought.id !== undefined){
            await ThoughtApi.update(newThought.id, newThought)
            await update()
        }
    }

    const removeThought = async(thought : IThought) => {
        if(thought.id !== undefined){
            await deleteThought(thought)
            await update()
        }
    } 
    
    useEffect(() => {
        setActiveList(thoughts)
    }, [thoughts]) 

    useEffect(() => {
        setActiveList(Filter(thoughts).byTitle(titleFilter))
    }, [titleFilter])
    // for use if GET(topic) has to be included
    useEffect(() => {

        if(topicFilter === "" && toneFilter === "") { 
            update()
        } else if(topicFilter !== "" && toneFilter === "") {
            fetchThoughtsByTopic(topicFilter)
        } else if(toneFilter !== "" && topicFilter === "" ) {
            fetchThoughtsByTone(toneFilter)
        } else if(toneFilter !== "" && topicFilter !== ""){
            fetchThoughtsByToneAndTopic(toneFilter, topicFilter)
        }

    }, [topicFilter, toneFilter])
    
    const getThoughtList = () => {
        if(activeList !== null && activeList!!.length !== 0){
            const thoughtList = activeList.map((thought : IThought, i : number) => (
                <ThoughtItem
                    key={i}
                    isPreview={false}
                    thought={thought}
                    toneList={toneList}
                    topicList={topicList}
                    modifyMethod={modifyThought}
                    deleteMethod={removeThought} 
                />
            ))
            return thoughtList;
        }
        return (
            <h2>
                Thoughts not found.
            </h2>
        )
    }
    
    useEffect(() => {
        const loadThoughts = async() => {
            setStatus(Status.loading)
            await update() 
            setActiveList(thoughts)
            setStatus(Status.complete);
        }
        loadThoughts()
    }, [])


    return(
        <>
            <div className="flex flex-col items-center mb-5 w-4/5">
                <div className="flex flew-row mb-2 w-full justify-start">
                    <input className="border border-red-400 text-base"
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                        placeholder=" Search ..."
                        type="text"
                    />
                    <p className="ml-2">
                        Results: {activeList === null ? 0 : activeList.length}
                    </p>
                </div>
                <div className="flex flex-row w-full justify-start">
                    <DropdownMenu
                        field={topicFilter}
                        className="w-2/5 p-2 mr-1"
                        setter={setTopicFilter}
                        optionList={topicList}
                        isFilter={true}
                        filterFor="topic"
                    />
                    
                    <DropdownMenu
                        field={toneFilter}
                        className="w-2/5 p-2 ml-1"
                        setter={setToneFilter}
                        optionList={toneList}
                        isFilter={true}
                        filterFor="tone"
                    />

                    <button className="ml-2" type="button" value="Reset" 
                        onClick={() => {
                            resetFilters()
                            update() // it seemed intuitive to update from the API here, even for lack of a practical effect
                        }}>
                        <RiResetLeftLine size={25} color="#FF1F1F"/>
                    </button>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-5/6 gap-20">
                {listState === Status.loading && <h2>Loading thoughts ...</h2>}
                {listState === Status.complete && getThoughtList()}
            </div>
        </>
    )
}

export default ThoughtList;