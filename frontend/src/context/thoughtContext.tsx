import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import ThoughtApi from "../services/ThoughtAPI";
import IThought from "../interfaces/Thought";
import ImageUploadService from "../services/ImageUploadService";
import IPreviewThought from "../interfaces/PreviewThought";

enum PostStatus{
    Idle = "Idle",
    Uploading = "Uploading",
    Error = "Error",
    Completed = "Completed"
}

interface IThoughtContext{
    topicList: string[]
    toneList: string[]
    thoughts: IThought[]
    setThoughts: Dispatch<SetStateAction<IThought[]>>
    fetchThoughts: () => Promise<void>
    fetchThoughtsByTopic: (topic : string) => Promise<void>
    fetchThoughtsByTone: (tone : string) => Promise<void>
    fetchThoughtsByToneAndTopic: (tone : string, topic : string) => Promise<void>
    removeThought : (thought : IThought) => Promise<void>
    modifyThought : (thought : IThought) => Promise<void>
    topicFilter : string,
    setTopicFilter : Dispatch<SetStateAction<string>>
    toneFilter : string,
    setToneFilter : Dispatch<SetStateAction<string>>
}

const ThoughtContext = createContext<IThoughtContext>({
    topicList : [],
    toneList : [],

    thoughts : [],
    setThoughts: () => {},
    fetchThoughts : async() => {}, 
    fetchThoughtsByTopic: async() => {},
    fetchThoughtsByTone: async() => {},
    fetchThoughtsByToneAndTopic: async() => {},
    removeThought: async() => {},
    modifyThought: async() => {},
    topicFilter : "",
    toneFilter : "",
    setTopicFilter : () => {},
    setToneFilter: () => {},
})

interface IThoughtProvider {
    children : ReactNode
}

export const ThoughtProvider : FC<IThoughtProvider> = ({ children }) => {

    const [thoughts, setThoughts] = useState<IThought[]>([]) 

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

    const [rawImageFile, setRawImageFile] = useState<FileList | null>(null)
    
    const [previewThought, updatePreviewThought] = useState<IPreviewThought>({
        title : "",
        topic : "",
        tone : "",
        statement : "",
        imageUrl : "",
    })
    
    const [resetState, initiateReset] = useState<boolean>(false)    

    const [topicFilter, setTopicFilter] = useState<string>("")
    const [toneFilter, setToneFilter] = useState<string>("")

    const fetchThoughts = async() => {
        try {
            const thoughts = await ThoughtApi.getAll()
            setThoughts(thoughts)
        } catch(error){
            console.error(error);
            setThoughts([])
        }
    }

    const fetchThoughtsByTopic = async(topic : string) => {
        try {
            const thoughts = await ThoughtApi.getByTopic(topic)
            setThoughts(thoughts)
        } catch(error){
            console.error(error)
            setThoughts([])
        }
    }

    const fetchThoughtsByTone = async(tone : string) => {
        try{
            const thoughts = await ThoughtApi.getByTone(tone)
            setThoughts(thoughts)
        } catch(error) {
            console.error(error)
            setThoughts([])
        }
    }

    const fetchThoughtsByToneAndTopic = async(tone : string, topic : string) => {
        try {
            const thoughts = await ThoughtApi.getByToneAndTopic(tone, topic)
            setThoughts(thoughts)
        } catch(error){
            console.error(error)
            setThoughts([])
        }
    }

    const removeThought = async(thought : IThought) => {
        try {
            if(thought.id === undefined) return

            await ThoughtApi.remove(thought.id)
            await ImageUploadService.remove(thought.imageUrl, false)
        } catch(error){
            console.error(error)
        }
    } 


    const modifyThought = async(thought : IThought) => {
        try{
            if(thought.id === undefined) return

            await ThoughtApi.modify(thought.id, thought)
            
        } catch (error){
            console.error(error)
        }
    }

    return(
        <ThoughtContext.Provider value={{
            thoughts, 
            setThoughts, 
            fetchThoughts,
            fetchThoughtsByTopic, 
            fetchThoughtsByTone, 
            fetchThoughtsByToneAndTopic, 
            removeThought,
            modifyThought,
            topicFilter,
            setTopicFilter,
            toneFilter,
            setToneFilter,
            topicList, 
            toneList,
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


