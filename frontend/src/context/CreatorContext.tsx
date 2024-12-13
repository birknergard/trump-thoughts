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

interface ICreatorContext{
    topicList: string[]
    toneList: string[]

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

const CreatorContext = createContext<ICreatorContext>({
    topicList : [],
    toneList : [],

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

interface ICreatorProvider {
    children : ReactNode
}

export const CreatorProvider : FC<ICreatorProvider> = ({ children }) => {

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
            setTimeout(() => {
                setStatus(PostStatus.Idle)
            }, 2000)
        } catch(e){
            setStatus(PostStatus.Error)
            console.error("Error with post method.", e)
        }
    }

    useEffect(() => {
        setStatus(PostStatus.Idle)
    }, [])

    return(
        <CreatorContext.Provider value={{
            previewThought,
            updatePreviewThought,
            postThought, 
            uploadTempImage,
            removeTempImage,
            status, 
            topicList, 
            toneList,
            rawImageFile,
            setRawImageFile,
            resetState,
            initiateReset,
        }}>
            {children}
        </CreatorContext.Provider>
    )
}

export const useCreatorContext = () => {
    return useContext(CreatorContext)
}


