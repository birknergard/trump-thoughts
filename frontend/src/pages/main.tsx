import { useState, useEffect } from "react"
import { useThoughtContext } from "../context/thoughtContext";
import ThoughtList from "../components/thoughtList";
import NavController from "../components/navController";
import ThoughtFilter from "../components/thoughtFilter";
import styles from "./main.module.css"

function MainPage(){
    const {
        thoughts,
        topicFilter,
        toneFilter,
        updateThoughtList
    } = useThoughtContext()

    const [titleFilter, setTitleFilter] = useState<string>("")


    useEffect(() => {
        updateThoughtList()
    }, [topicFilter, toneFilter])

    return(
        <main className="w-screen flex flex-col items-center mt-24">
            <NavController navState={false} />
            <section className="list__grid">
                <ThoughtFilter
                    titleFilter={titleFilter}
                    titleFilterSetter={setTitleFilter}

                    listLength={thoughts.length} 
                />
                <ThoughtList 
                    thoughtList={thoughts}
                    titleFilter={titleFilter}
                    toneFilter={toneFilter}
                    topicFilter={topicFilter}
                />
            </section>
        </main>
    )
}  

export default MainPage;