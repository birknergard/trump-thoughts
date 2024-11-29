import { createContext, Provider, ReactNode, useContext, useEffect, useState } from "react";
import ThoughtApi from "../services/thoughtService";

const ThoughtContext = createContext()

export const ThoughtProvider = ({ children }) => {
    const [titleInput, setTitle] = useState("")
    const [topicInput, setTopic] = useState("")
    const [statementInput, setStatement] = useState("")


    const [thoughts, setThoughts] = useState([]) 

    const updateThoughts = async() => {
        try {
            const fetchedThoughts = await ThoughtApi.getAll()
            if(fetchedThoughts != null){
                setThoughts(fetchedThoughts)
            }
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        updateThoughts()
    }, [])  

    return(
        <ThoughtContext.Provider value={{
            thoughts, setThoughts,
            titleInput, setTitle,
            topicInput, setTopic,
            statementInput, setStatement
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


