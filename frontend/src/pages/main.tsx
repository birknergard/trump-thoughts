import { useState, useEffect } from "react"
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtList from "../components/thoughtList";
import NavController from "../components/navController";
import ThoughtFilter from "../components/thoughtFilter";
import styles from "./main.module.css"

function MainPage(){
    const {thoughts,
        fetchThoughts, 
        fetchThoughtsByTopic, 
        fetchThoughtsByTone, 
        fetchThoughtsByToneAndTopic
    } = useThoughtContext()

    const [titleFilter, setTitleFilter] = useState<string>("")
    const [topicFilter, setTopicFilter] = useState<string>("")
    const [toneFilter, setToneFilter] = useState<string>("")

    useEffect(() => {
        if(topicFilter === "" && toneFilter === "") { 
            fetchThoughts()

        } else if(topicFilter !== "" && toneFilter === "") {
            fetchThoughtsByTopic(topicFilter)

        } else if(toneFilter !== "" && topicFilter === "") {
            fetchThoughtsByTone(toneFilter)

        } else if(toneFilter !== "" && topicFilter !== ""){
            fetchThoughtsByToneAndTopic(toneFilter, topicFilter)
        }
    }, [topicFilter, toneFilter])

    return(
        <body className="w-screen flex flex-col items-center mt-24">
            <NavController navState={false} />
            <main className="list__grid">
                <ThoughtFilter
                    titleFilter={titleFilter}
                    titleFilterSetter={setTitleFilter}
                    
                    topicFilter={topicFilter}
                    topicFilterSetter={setTopicFilter}

                    toneFilter={toneFilter}
                    toneFilterSetter={setToneFilter}

                    listLength={thoughts.length} 
                />
                <ThoughtList 
                    thoughtList={thoughts}
                    titleFilter={titleFilter}
                    toneFilter={toneFilter}
                    topicFilter={topicFilter}
                />
            </main>
        </body>
    )
}  

export default MainPage;