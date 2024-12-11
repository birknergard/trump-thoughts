import { createContext, Dispatch, FC, Provider, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import ThoughtApi from "../services/thoughtService";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";

enum PostStatus{
    Idle = "Idle",
    Uploading = "Uploading",
    Error = "Error",
    Completed = "Completed"
}

interface IThoughtContext{
    thoughts: IThought[]
    setThoughts: Dispatch<SetStateAction<IThought[]>>
    fetchThoughts: () => Promise<void>
    fetchThoughtsByTopic: (topic : string) => Promise<void>
    fetchThoughtsByTone: (tone : string) => Promise<void>
    fetchThoughtsByToneAndTopic: (tone : string, topic : string) => Promise<void>
    postThought: (
        title : string,
        topic : string,
        statement : string,
        imageUrl : string,
        tone : string
    ) => Promise<void>
    removeThought : (thought : IThought) => Promise<void>
    removeAndReload: (thought : IThought) => Promise<void>
    modifyThought : (thought : IThought) => Promise<void>
    modifyAndReload : (thought : IThought) => Promise<void>
    status: PostStatus,
    topicList: string[]
    toneList: string[]
}

const ThoughtContext = createContext<IThoughtContext>({
    thoughts : [],
    setThoughts: () => {},
    fetchThoughts : async() => {}, 
    fetchThoughtsByTopic: async() => {},
    fetchThoughtsByTone: async() => {},
    fetchThoughtsByToneAndTopic: async() => {},
    postThought: async() => {},
    removeThought: async() => {},
    removeAndReload: async() => {},
    modifyThought: async() => {},
    modifyAndReload: async() => {},
    status : PostStatus.Idle,
    topicList : [],
    toneList : []
})

interface IThoughtProvider {
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


    
    const fetchThoughts = async() => {
        try {
            const thoughts = await ThoughtApi.getAll()
            setThoughts(thoughts)
        } catch(error){
            console.error(error);
        }
    }

    const fetchThoughtsByTopic = async(topic : string) => {
        try {
            const thoughts = await ThoughtApi.getByTopic(topic)
            setThoughts(thoughts)
        } catch(error){
            console.error(error)
        }
    }

    const fetchThoughtsByTone = async(tone : string) => {
        try{
            const thoughts = await ThoughtApi.getByTone(tone)
            setThoughts(thoughts)
        } catch(error) {
            console.error(error)
        }
    }

    const fetchThoughtsByToneAndTopic = async(tone : string, topic : string) => {
        try {
            const thoughts = await ThoughtApi.getByToneAndTopic(tone, topic)
            setThoughts(thoughts)
        } catch(error){
            console.error(error)
        }
    }



    const removeThought = async(thought : IThought) => {
        try {
            if(thought.id === undefined) return

            await ThoughtApi.remove(thought.id)
            await ImageUploadService.remove(thought.imageUrl)
        } catch(error){
            console.error(error)
        }
    } 

    const removeAndReload = async(thoughts : IThought) => {
        await removeThought(thoughts)
        await fetchThoughts()
    }
 


    const modifyThought = async(thought : IThought) => {
        try{
            if(thought.id === undefined) return

            await ThoughtApi.modify(thought.id, thought)
        } catch (error){
            console.error(error)
        }
    }

    const modifyAndReload = async(thought : IThought) => {
        await modifyThought(thought)
        await fetchThoughts()
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
            console.log("ThoughtContext: Posted new thought:" + newThought)
            await ThoughtApi.create(newThought)
            setStatus(PostStatus.Idle)
        } catch(e){
            setStatus(PostStatus.Error)
            console.error("Error with post method.", e)
        }
    }

    useEffect(() => {
        setStatus(PostStatus.Idle)
    }, [])

    return(
        <ThoughtContext.Provider value={{
            thoughts, 
            setThoughts, 
            postThought, 
            fetchThoughts,
            fetchThoughtsByTopic, 
            fetchThoughtsByTone, 
            fetchThoughtsByToneAndTopic, 
            removeThought,
            removeAndReload,
            modifyThought,
            modifyAndReload,
            status, 
            topicList, 
            toneList
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


