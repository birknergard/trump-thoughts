import { createContext, Dispatch, FC, Provider, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import ThoughtApi from "../services/thoughtService";
import IThought from "../interfaces/thought";
import ImageUploadService from "../services/imageUploadService";
import IPreviewThought from "../interfaces/previewThought";

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
    postThought: (thought : IThought) => Promise<void>
    uploadImage : (image : File | null) => Promise<string> 
    removeImage : (imageUrl : string) => Promise<void>
    removeThought : (thought : IThought) => Promise<void>
    removeAndReload: (thought : IThought) => Promise<void>
    modifyThought : (thought : IThought) => Promise<void>
    modifyAndReload : (thought : IThought) => Promise<void>
    rawImageFile : FileList | null,
    setRawImageFile : Dispatch<SetStateAction<FileList | null>>
    status: PostStatus,
    topicList: string[]
    toneList: string[]
    reset : () => void
    resetState : boolean
    initiateReset: Dispatch<SetStateAction<boolean>> 

    previewThought : IPreviewThought,
    updatePreviewThought : Dispatch<SetStateAction<IPreviewThought>>
}

const ThoughtContext = createContext<IThoughtContext>({
    thoughts : [],
    setThoughts: () => {},
    fetchThoughts : async() => {}, 
    fetchThoughtsByTopic: async() => {},
    fetchThoughtsByTone: async() => {},
    fetchThoughtsByToneAndTopic: async() => {},
    postThought: async() => {},
    uploadImage: async() => "",
    removeImage: async() => {},
    removeThought: async() => {},
    removeAndReload: async() => {},
    modifyThought: async() => {},
    modifyAndReload: async() => {},
    rawImageFile : null,
    setRawImageFile : () => null,
    status : PostStatus.Idle,
    topicList : [],
    toneList : [],
    reset : () => {},
    resetState : false,
    initiateReset: () => {},

    previewThought : {
        title: "",
        topic: "",
        tone: "",
        statement: "",
        imageUrl: "",
    },
    updatePreviewThought: () => null 
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

    const [rawImageFile, setRawImageFile] = useState<FileList | null>(null)
    
    const [previewThought, updatePreviewThought] = useState<IPreviewThought>({
        title : "",
        topic : "",
        tone : "",
        statement : "",
        imageUrl : "",
    })
    
    const [resetState, initiateReset] = useState<boolean>(false)    
    const reset = () => initiateReset(true)

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


    const uploadImage = async(image : File | null) => {
        try{
            if(image != null){
                console.debug("Uploading image with name: ", image.name)
                const response = await ImageUploadService.upload(image)
                return response.data.fileName
            }  
        } catch(e) {
            console.error()
        }
    }

    const removeImage = async(imageUrl : string) => {
        try {
            console.debug("Removing image with name:", imageUrl)
            await ImageUploadService.remove(imageUrl)
        } catch (error) {
            console.error("thoughtContext: line 195 - Error caught.", error) 
        }
    }


    const postThought = async(
        newThought : IThought
    ) => {
        try{
            setStatus(PostStatus.Uploading)

            console.log("ThoughtContext: Posted new thought:" + newThought)
            await ThoughtApi.create(newThought)

            setStatus(PostStatus.Completed)

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
            previewThought,
            updatePreviewThought,
            thoughts, 
            setThoughts, 
            postThought, 
            uploadImage,
            removeImage,
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
            toneList,
            rawImageFile,
            setRawImageFile,
            reset,
            resetState,
            initiateReset,

        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


