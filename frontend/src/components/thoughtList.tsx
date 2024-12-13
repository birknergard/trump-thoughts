import { useState, useEffect, FC, SetStateAction, Dispatch } from "react";
import IThought from "../interfaces/Thought";
import { useThoughtContext } from "../context/ThoughtContext";
import ThoughtItem from "./ThoughtItem";
import Filter from "../services/Filter";
import "../App.css"

enum Status{
    idle = "Idle",
    loading = "Loading",
    complete = "Complete"
}

interface IThoughtList{
    titleFilter : string,
    activeList : IThought[],
    setActiveList : Dispatch<SetStateAction<IThought[]>>
}

const ThoughtList : FC<IThoughtList> = ({
    titleFilter,
    activeList,
    setActiveList
}) =>{

    const {
        thoughts,
        topicList, 
        toneList, 
        fetchThoughts, 
        setThoughts,
        removeThought,
        fetchThoughtsByTone,
        fetchThoughtsByTopic,
        fetchThoughtsByToneAndTopic,
        modifyThought,
        topicFilter, toneFilter
    } = useThoughtContext()


    const updateThoughtList = async() => {
        if(topicFilter !== "" && toneFilter === "") {
            await fetchThoughtsByTopic(topicFilter)

        } else if(toneFilter !== "" && topicFilter === "") {
            await fetchThoughtsByTone(toneFilter)

        } else if(toneFilter !== "" && topicFilter !== ""){
            await fetchThoughtsByToneAndTopic(toneFilter, topicFilter)

        } else { 
            await fetchThoughts()
        }
    } 

    const [listState, setStatus] = useState<Status>(Status.idle) 

    const getThoughtList = () => {
        if(activeList !== null && activeList.length !== 0){
            const thoughtList = activeList.map((thought : IThought, i : number) => (
                <ThoughtItem
                    key={i}
                    isPreview={false}
                    thought={thought}
                    toneList={toneList}
                    topicList={topicList}
                    modifyMethod={modifyThought}
                    deleteMethod={handleThoughtDeletion} 
                />
            ))
            return thoughtList;
        }
        return (
            <h2 className="list__item--error text-2xl">
                Thoughts not found.
            </h2>
        )
    }
    
    const handleThoughtDeletion = async(thought : IThought) => {
        console.log("Deleting thought ...")
        removeThought(thought)
        setThoughts(thoughts.filter(thoughtItem => {
            return thoughtItem.id !== thought.id 
        }))
        setActiveList(thoughts)
        console.log("Thought deleted.")
    } 

    // on pageload
    useEffect(() => {
        const loadThoughts = async() => {
            setStatus(Status.loading)
            await fetchThoughts() 
            setActiveList(thoughts)
            setStatus(Status.complete);
        }
        loadThoughts()
    }, [])

    useEffect(() => {
        console.log("Filters:", topicFilter, toneFilter, "Previous list", thoughts)
        updateThoughtList()
        console.log("New list: ", thoughts)
    }, [topicFilter, toneFilter])

    useEffect(() => {
        setActiveList(Filter(thoughts).byTitle(titleFilter))
    }, [titleFilter])

    useEffect(() => {
        setActiveList(thoughts)
    }, [thoughts]) 


    return(
        <>
            {listState === Status.loading && <h2 className="list__item--error text-2xl">Loading thoughts ...</h2>}
            {listState === Status.complete && getThoughtList()}
        </>
    )
}

export default ThoughtList;