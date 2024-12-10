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
    thoughts: IThought[],
    setThoughts: Dispatch<SetStateAction<IThought[]>>,
    fetchThoughts: () => Promise<void>,
    fetchThoughtsByTopic: (topic : string) => Promise<void>,
    fetchThoughtsByTone: (tone : string) => Promise<void>
    fetchThoughtsByToneAndTopic: (tone : string, topic : string) => Promise<void>,
    postThought: (
        title : string,
        topic : string,
        statement : string,
        imageUrl : string,
        tone : string
    ) => Promise<void>,
    deleteThought : (thought : IThought) => Promise<void>,
    status: PostStatus,
    topicList: string[],
    toneList: string[],
}

const ThoughtContext = createContext<IThoughtContext>({
    thoughts : [],
    setThoughts: () => {},
    fetchThoughts : async() => {}, 
    fetchThoughtsByTopic: async() => {},
    fetchThoughtsByTone: async() => {},
    fetchThoughtsByToneAndTopic: async() => {},
    postThought: async() => {},
    deleteThought: async() => {},
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

    const deleteThought = async(thought : IThought) => {
        try {
            if(thought.id === undefined) return

            await ThoughtApi.remove(thought.id)
            await ImageUploadService.remove(thought.imageUrl)
        } catch(error){
            console.error(error)
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
            thoughts, setThoughts, postThought, fetchThoughts,fetchThoughtsByTopic, fetchThoughtsByTone, fetchThoughtsByToneAndTopic, deleteThought, status, topicList, toneList
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


