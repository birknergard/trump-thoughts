import { useState, useEffect } from "react"
import { useThoughtContext } from "../context/ThoughtContext";
import ThoughtList from "../components/ThoughtList";
import NavController from "../components/NavBar";
import ThoughtFilter from "../components/ThoughtFilter";
import IThought from "../interfaces/Thought";

function MainPage(){
    const [activeList, setActiveList] = useState<IThought[]>([])
    const [titleFilter, setTitleFilter] = useState<string>("")

    return(
        <main className="w-screen flex flex-col items-center mt-24">
            <NavController navState={false} />
            <section className="list__grid">
                <ThoughtFilter
                    titleFilter={titleFilter}
                    titleFilterSetter={setTitleFilter}

                    listLength={activeList.length} 
                />
                <ThoughtList 
                    titleFilter={titleFilter}
                    activeList={activeList}
                    setActiveList={setActiveList}
                />
            </section>
        </main>
    )
}  

export default MainPage;