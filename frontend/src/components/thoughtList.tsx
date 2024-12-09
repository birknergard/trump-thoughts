import React from "react";
import { useState, useEffect } from "react";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtItem, { IModifiedThought } from "./thoughtItem";
import ThoughtApi from "../services/thoughtService";
import DropdownMenu from "./dropDownMenu";

enum Status{
    idle = "Idle",
    loading = "Loading",
    complete = "Complete"
}

function ThoughtList(){

    const [listState, setStatus] = useState<Status>(Status.idle) 
    const { thoughts, fetchThoughts, topicList, toneList } = useThoughtContext()
    const [activeList, setActiveList] = useState<IThought[] | null>(null)

    const [query, setQuery] = useState<string>("")
    const handleSearch = (changedValue : string) => {
        setQuery(changedValue)
        setActiveList(filter.byTitle(query))
    }

    const [topicFilter, setTopicFilter] = useState<string>("")
    const [toneFilter, setToneFilter] = useState<string>("")

    const topicFilterEntered = () : boolean => {return topicFilter !== ""} 
    const toneFilterEntered = () : boolean => {return toneFilter !== ""}


    const resetFilters = () => {
        setQuery("")
        setToneFilter("")
        setTopicFilter("")
    }

    const update = async() => {
        await fetchThoughts()
    }
    

    const modifyThought = async(newThought : IThought) => {
        if(newThought.id !== undefined){
            await ThoughtApi.update(newThought.id, newThought)
            update()
        }
    }

    const removeThought = async(thought : IThought) => {
        if(thought.id !== undefined){
            // TODO: Add confirm dialog box?
            await ThoughtApi.remove(thought.id)
            update()
        }
    } 
    
    const filter = { 
        byTitle : (query : string) => {
            if(query === ""){
                return thoughts
            }
            const filteredList = thoughts.filter(thought => { 
                return thought.title.toLowerCase().includes(query.toLowerCase())
            })
            return filteredList
        },

        byTopic : (query : string) => {
            const filteredList = thoughts.filter(thought => { 
                return thought.topic.toLowerCase().includes(query.toLowerCase())
            })
            return filteredList
        },

        byTone : (query : string) => {
            const filteredList = thoughts.filter(thought => { 
                return thought.tone.toLowerCase().includes(query.toLowerCase())
            })
            return filteredList
        },

        byToneAndTopic : (tone : string, topic : string) => {
            const filteredList = thoughts.filter(thought => { 
                return (thought.tone.toLowerCase().includes(tone.toLowerCase()) 
                && thought.topic.toLowerCase().includes(topic.toLowerCase())) 
            })
            return filteredList
        }
    }


    const getThoughtList = () => {
        if(activeList !== null && activeList!!.length !== 0){
            const thoughtList = activeList.map((_thought : IThought, i : number) => (
                <ThoughtItem
                    key={i}
                    isPreview={false}
                    thought={_thought}
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

    useEffect(() => {
        setActiveList(thoughts)
    }, [thoughts]) 

    useEffect(() => {
        if(toneFilter !== "" && topicFilter !== ""){
            setActiveList(filter.byToneAndTopic(toneFilter, topicFilter))
        } else {
            setActiveList(filter.byTopic(topicFilter))
        }
    }, [topicFilter])

    useEffect(() => {
        if(toneFilter !== "" && topicFilter !== ""){
            setActiveList(filter.byToneAndTopic(toneFilter, topicFilter))
        } else {
            setActiveList(filter.byTone(toneFilter))
        }
    }, [toneFilter])

    return(
        <>
            <div className="flex flex-col items-center mb-5 w-4/5">
                <div className="flex flew-row mb-2 w-full justify-center">
                    <input className="border border-red-400"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        defaultValue={""}
                        placeholder=" Search ..."
                        type="text"
                    />
                    <p className="ml-2">
                        Results: {activeList === null ? 0 : activeList.length}
                    </p>
                </div>
                <div className="flex flex-row w-full justify-center">
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

                    <input className="border" type="button" value="Reset" 
                    onClick={resetFilters}/>
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