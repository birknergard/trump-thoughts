import { createContext, Provider, ReactNode, useContext, useEffect, useState } from "react";
import ThoughtApi from "../services/thoughtService";

const ThoughtContext = createContext()

export const ThoughtProvider = ({ children }) => {


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

    const postThought = async(title, topic, statement) => {
        try{
            
        } catch(e){
            console.error("Error", e)
        }
    }

    return(
        <ThoughtContext.Provider value={{
            thoughts, setThoughts,
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


