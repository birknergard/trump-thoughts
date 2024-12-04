import { createContext, Dispatch, FC, Provider, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import ThoughtApi from "../services/thoughtService";
import IThought from "../interfaces/thought";

interface IThoughtContext{
    thoughts : IThought[],
    setThoughts: Dispatch<SetStateAction<IThought[]>>,
    updateThoughts: () => Promise<void>,
    postThought: (
        title : string,
        topic : string,
        statement : string,
        imageUrl : string,
        tone : string
    ) => Promise<void>
}

const ThoughtContext = createContext<IThoughtContext | null>(null)

interface IThoughtProvider{
    children : ReactNode
}
export const ThoughtProvider : FC<IThoughtProvider> = ({ children }) => {


    const [thoughts, setThoughts] = useState<IThought[]>([]) 

    const updateThoughts = async() => {
        try {
            const fetchedThoughts = await ThoughtApi.getAll()
            if(fetchedThoughts.length != 0){
                setThoughts(fetchedThoughts)
            }
        } catch(error){
            console.log(error);
        }
    }

    const postThought = async(
        title : string,
        topic : string,
        statement : string,
        imageUrl : string,
        tone : string
    ) => {
        try{
            const newThought : IThought = {
                id : null,
                title : title,
                topic : topic,
                statement: statement,
                imageUrl: imageUrl,
                tone: tone 
            }
            ThoughtApi.create(newThought)
        } catch(e){
            console.error("Error", e)
        }
    }

    return(
        <ThoughtContext.Provider value={{
            thoughts, setThoughts, postThought, updateThoughts
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


