import { createContext, Dispatch, FC, Provider, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import ThoughtApi from "../services/thoughtService";
import IThought from "../interfaces/thought";

enum PostStatus{
    Idle = "Idle",
    Uploading = "Uploading",
    Error = "Error",
    Completed = "Completed"
}

interface IThoughtContext{
    thoughts : IThought[],
    setThoughts: Dispatch<SetStateAction<IThought[]>>,
    fetchThoughts: () => Promise<IThought[] | null>,
    postThought: (
        title : string,
        topic : string,
        statement : string,
        imageUrl : string,
        tone : string
    ) => Promise<void>,
    status: PostStatus,
    topicList : string[],
    toneList : string[]

}

const ThoughtContext = createContext<IThoughtContext>({
    thoughts : [],
    setThoughts: () => {},
    fetchThoughts : async() => null, 
    postThought: async() => {},
    status : PostStatus.Idle,
    topicList : [],
    toneList : []
})

interface IThoughtProvider{
    children : ReactNode
}

export const ThoughtProvider : FC<IThoughtProvider> = ({ children }) => {

    const [thoughts, setThoughts] = useState<IThought[]>([]) 
    const [status, setStatus] = useState<PostStatus>(PostStatus.Idle)

    const topicList = [
        "healthcare", "education", "immigration", "economy",
        "climate change", "gun control", "criminal justice",
        "abortion", "foreign policy", "social security",
        "millitary spending", "free speech", "lgbtq+ rights",
        "drugs", "infrastructure", "corporate regulation",
        "trade", "technology", "something else"
    ]

    const toneList = [
        "confident",  "combative", "controversial",
        "authoritative", "provocative", "charismatic",
        "blunt", "hyperbolic", "optimistic"
    ]

    const fetchThoughts = async() : Promise<IThought[] | undefined> => {
        try {
            const fetchedThoughts = await ThoughtApi.getAll()
            setThoughts(fetchedThoughts)
            return fetchedThoughts
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
            setStatus(PostStatus.Uploading)
            const newThought : IThought = {
                title : title,
                topic : topic,
                statement: statement,
                imageUrl: imageUrl,
                tone: tone 
            }
            console.log(newThought)
            await ThoughtApi.create(newThought)
            setStatus(PostStatus.Idle)
        } catch(e){
            setStatus(PostStatus.Error)
            console.error("Error", e)
        }
    }

    useEffect(() => {
        setStatus(PostStatus.Idle)
    }, [])

    return(
        <ThoughtContext.Provider value={{
            thoughts, setThoughts, postThought, fetchThoughts, status, topicList, toneList
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


