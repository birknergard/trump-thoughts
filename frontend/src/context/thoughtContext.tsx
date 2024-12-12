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
    topicList: string[]
    toneList: string[]
    thoughts: IThought[]
    setThoughts: Dispatch<SetStateAction<IThought[]>>
    fetchThoughts: () => Promise<void>
    fetchThoughtsByTopic: (topic : string) => Promise<void>
    fetchThoughtsByTone: (tone : string) => Promise<void>
    fetchThoughtsByToneAndTopic: (tone : string, topic : string) => Promise<void>
    removeThought : (thought : IThought) => Promise<void>
    removeAndReload: (thought : IThought) => Promise<void>
    modifyThought : (thought : IThought) => Promise<void>
    modifyAndReload : (thought : IThought) => Promise<void>
    topicFilter : string,
    setTopicFilter : Dispatch<SetStateAction<string>>
    toneFilter : string,
    setToneFilter : Dispatch<SetStateAction<string>>
    updateThoughtList : () => void


    postThought: (thought : IThought) => Promise<void>
    uploadTempImage : (image : File | null) => Promise<string> 
    removeTempImage : (imageUrl : string) => Promise<void>
    setRawImageFile : Dispatch<SetStateAction<FileList | null>>
    rawImageFile : FileList | null,
    status: PostStatus,
    previewThought : IPreviewThought,
    updatePreviewThought : Dispatch<SetStateAction<IPreviewThought>>

    resetState : boolean
    initiateReset: Dispatch<SetStateAction<boolean>> 
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
    removeAndReload: async() => {},
    modifyThought: async() => {},
    modifyAndReload: async() => {},
    topicFilter : "",
    toneFilter : "",
    setTopicFilter : () => {},
    setToneFilter: () => {},
    updateThoughtList: () => {},

    postThought: async() => {},
    uploadTempImage: async() => "",
    removeTempImage: async() => {},
    rawImageFile : null,
    setRawImageFile : () => null,
    status : PostStatus.Idle,
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

    const [topicFilter, setTopicFilter] = useState<string>("")
    const [toneFilter, setToneFilter] = useState<string>("")

    const updateThoughtList = () => {
        if(topicFilter === "" && toneFilter === "") { 
            fetchThoughts()

        } else if(topicFilter !== "" && toneFilter === "") {
            fetchThoughtsByTopic(topicFilter)

        } else if(toneFilter !== "" && topicFilter === "") {
            fetchThoughtsByTone(toneFilter)

        } else if(toneFilter !== "" && topicFilter !== ""){
            fetchThoughtsByToneAndTopic(toneFilter, topicFilter)
        }
    } 

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
            await ImageUploadService.remove(thought.imageUrl, false)
        } catch(error){
            console.error(error)
        }
    } 

    const removeAndReload = async(thoughts : IThought) => {
        await removeThought(thoughts)
        updateThoughtList()
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
        updateThoughtList()
    } 


    const uploadTempImage = async(image : File | null) => {
        try{
            if(image != null){
                console.debug("Uploading image with name: ", image.name)
                const response = await ImageUploadService.upload(image, true)
                return response.data.fileName
            }  
        } catch(error) {
            console.error(error)
        }
    }

    const removeTempImage = async(imageUrl : string) => {
        try {
            console.debug("Removing image with name:", imageUrl)
            const result = await ImageUploadService.remove(imageUrl, true)
            console.log(result)
        } catch (error) {
            console.error("thoughtContext: removeTempImage", error) 
        }
    }


    const postThought = async(
        newThought : IThought
    ) => {
        try{
            setStatus(PostStatus.Uploading)

            await ThoughtApi.create(newThought)
            await ImageUploadService.process(newThought.imageUrl)
            //await ImageUploadService.upload(rawImageFile![0], false)
            console.log("ThoughtContext: Posted new thought:" + newThought)
            initiateReset(true);
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
            uploadTempImage,
            removeTempImage,
            fetchThoughts,
            fetchThoughtsByTopic, 
            fetchThoughtsByTone, 
            fetchThoughtsByToneAndTopic, 
            removeThought,
            removeAndReload,
            modifyThought,
            modifyAndReload,
            topicFilter,
            setTopicFilter,
            toneFilter,
            setToneFilter,
            status, 
            topicList, 
            toneList,
            rawImageFile,
            setRawImageFile,
            resetState,
            initiateReset,
            updateThoughtList
        }}>
            {children}
        </ThoughtContext.Provider>
    )
}

export const useThoughtContext = () => {
    return useContext(ThoughtContext)
}


