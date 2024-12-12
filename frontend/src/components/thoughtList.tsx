import { useState, useEffect, FC } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem from "./thoughtItem";
import Filter from "../services/Filter";
import "../App.css"

enum Status{
    idle = "Idle",
    loading = "Loading",
    complete = "Complete"
}

interface IThoughtList{
    thoughtList : IThought[]
    titleFilter : string,
    topicFilter : string,
    toneFilter : string
}

const ThoughtList : FC<IThoughtList> = ({
    thoughtList,
    titleFilter,
}) =>{

    const {
        thoughts,
        topicList, 
        toneList, 
        fetchThoughts, 
        removeAndReload, 
        modifyAndReload
    } = useThoughtContext()
    
    const [listState, setStatus] = useState<Status>(Status.idle) 
    const [activeList, setActiveList] = useState<IThought[] | null>(null)

    const getThoughtList = () => {
        if(activeList !== null && activeList!!.length !== 0){
            const thoughtList = activeList.map((thought : IThought, i : number) => (
                <ThoughtItem
                    key={i}
                    isPreview={false}
                    thought={thought}
                    toneList={toneList}
                    topicList={topicList}
                    modifyMethod={modifyAndReload}
                    deleteMethod={removeAndReload} 
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
        setActiveList(thoughtList)
    }, [thoughtList]) 

    useEffect(() => {
        setActiveList(Filter(thoughts).byTitle(titleFilter))
    }, [titleFilter])

    return(
        <>
            {listState === Status.loading && <h2 className="list__item--error text-2xl" >Loading thoughts ...</h2>}
            {listState === Status.complete && getThoughtList()}
        </>
    )
}

export default ThoughtList;