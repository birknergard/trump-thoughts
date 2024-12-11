import NavController from "../components/navController";

import {useEffect, useState } from "react";
import { useThoughtContext } from "../context/thoughtContext";
import IThought from "../interfaces/thought";
import Creator from "../components/Creator";
import Preview from "../components/Preview";

import "../App.css"

function CreatePage(){

    const { 
        status, 
        postThought, 
        previewThought,
    } = useThoughtContext() 

    
    // Preview State :::::::::::::::::::::::::::::::::::::::::::::::::::

    const convertPreviewThought = () : IThought => {
        return {
            title : previewThought.title,
            topic : previewThought.topic,
            statement : previewThought.statement,
            tone : previewThought.tone!!,
            imageUrl : previewThought.imageUrl
        }
    }

    // :::::::::::::::::::::::::::::::::::::::::::::::::::

    const [emptyFields, setEmptyFields] = useState<Set<number>>(new Set([1,2,3,4,5]))
    const [initiateReset, setInitiateResetState] = useState<boolean>(false)    

    const findEmptyFields = () => {
        const newSet = new Set<number>()

        if(previewThought === null) return

        if (previewThought.title === "") {
            //console.log("Title is empty.");
            newSet.add(1)            
        }

        if (previewThought.topic === "a topic*" || previewThought.topic === "") {
            //console.log("Topic is set to the default placeholder.");
            newSet.add(2)            
        }

        if (previewThought.statement === "") {
            //console.log("Statement is empty.");
            newSet.add(3)            
        }

        if (previewThought.tone === "" || previewThought.tone === null) {
            //console.log("Tone is empty.");
            newSet.add(4)            
        }

        if (previewThought.image === null) {
            //console.log("Image is not provided.");
            newSet.add(5)        
        }

        setEmptyFields(newSet) 
    } 



    const submitThought = async(thought : IThought, imageFile: File) => {
        try {
            //setImageUrl(imageUploadResponse) Why is this here?
            await postThought(thought, imageFile)
        } catch(e){
            console.error("error in POST", e)
        }
    }

    const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false)
    
    const handleSubmit = () => {
        setAttemptedSubmit(true)
        if(emptyFields.size === 0 && previewThought !== null){
            const newThought = convertPreviewThought()
            if(previewThought.image !== null){
                submitThought(newThought, previewThought.image)
            }
            setInitiateResetState(true)
        } else {
            console.log("Fields are not filled.")
        }
    }

    useEffect(() =>{
        findEmptyFields()
    }, [previewThought])

    return(
        <main>
            <NavController navState={true}/>

            <section className="create__grid flex flex-col justify-evenly items-center mt-24 w-full">   
                <Creator elementStyle="create__item"
                    attemptedSubmit={attemptedSubmit}
                    setAttemptedSubmit={setAttemptedSubmit}
                    emptyFields={emptyFields}
                    setEmptyFields={setEmptyFields}
                    initiateReset={initiateReset}
                    setResetState={setInitiateResetState}
                />

                <div className="">
                    <div className="flex flex-row items-center justify-center my-2 w-full">
                        <input className="border-2 rounded w-1/4 h-10 m-2"
                            type="button" value="Reset"
                            onClick={() => setInitiateResetState(true)}
                        />
                    {status !== "Uploading" &&
                        <input className="border-2 rounded w-1/4 h-10 m-2"
                            type="button" value="Submit"
                            onClick={handleSubmit}
                        />
                    }
                    </div>
                </div>

                <Preview 
                    emptyFieldCount={emptyFields.size}
                    thoughtPreview={convertPreviewThought()}
                />             
            </section>
        </main>
    )
}
export default CreatePage


