import NavController from "../components/NavBar";

import {useEffect, useState } from "react";
import { useThoughtContext } from "../context/ThoughtContext";
import IThought from "../interfaces/Thought";
import Creator from "../components/Creator";
import Preview from "../components/Preview";

import "../App.css"

function CreatePage(){

    const { 
        status, 
        postThought, 
        previewThought,
        resetState,
        removeTempImage,
        initiateReset,
    } = useThoughtContext() 

    const convertPreviewThought = () : IThought => {
        return {
            title : previewThought.title,
            topic : previewThought.topic,
            statement : previewThought.statement,
            tone : previewThought.tone!!,
            imageUrl : previewThought.imageUrl
        }
    }


    // using Set because its a lot more reliable than a number[], and elements have to be unique
    const [emptyFields, setEmptyFields] = useState<Set<number>>(new Set([1,2,3,4,5]))


    const findEmptyFields = () => {
        const newSet = new Set<number>()

        if(previewThought === null) return

        if(previewThought.title === "") newSet.add(1)           

        if(previewThought.topic === "a topic*" || previewThought.topic === "") newSet.add(2)            

        if(previewThought.statement === "") newSet.add(3)            

        if(previewThought.tone === "" || previewThought.tone === null) newSet.add(4)

        if(previewThought.imageUrl === "") newSet.add(5)

        setEmptyFields(newSet) 
    } 

    const submitThought = async(thought : IThought) => {
        try {
            await postThought(thought)
        } catch(e){
            console.error("error in POST", e)
        }
    }

    const [attemptedSubmit, setAttemptedSubmit] = useState<boolean>(false)
    
    const handleSubmit = async() => {
        setAttemptedSubmit(true)
        if(emptyFields.size === 0 && previewThought !== null){
            const newThought = convertPreviewThought()

            if(previewThought !== null){
                await submitThought(newThought)
            }
        } else {
            console.log("Fields are not filled.")
        }
    }
    const handleReset = async() => {
        initiateReset(true)
        removeTempImage(previewThought.imageUrl)
    }


    useEffect(() =>{
        findEmptyFields()
    }, [previewThought])

    return(
        <main className="flex flex-col items-center">
            <NavController 
                navState={true}
            />

            <section className="create__grid mt-24">   
                <Creator elementStyle="create__item flex flex-col items-center"
                    attemptedSubmit={attemptedSubmit}
                    setAttemptedSubmit={setAttemptedSubmit}
                    emptyFields={emptyFields}
                    setEmptyFields={setEmptyFields}
                    initiateReset={resetState}
                    setResetState={initiateReset}
                />

                <section className="create__item flex flex-col max-md:flex-col-reverse items-center">
                    <Preview 
                        emptyFieldCount={emptyFields.size}
                        thoughtPreview={convertPreviewThought()}
                    />             

                    {(status === "Idle" || status === "Error") &&
                    <div className="flex flex-row items-center justify-center my-2 w-full">
                        <input className="text-xl text-red-500 border-2 border-red-500 rounded w-3/4 h-12 m-2 hover:bg-red-500"
                            type="button" value="Reset"
                            onClick={() => initiateReset(true)}
                        />
                        <input className="text-xl border-2 border-black rounded w-3/4 h-12 m-2 hover:bg-lime-400"
                            type="button" value="Submit"
                            onClick={handleSubmit}
                        />
                    </div>
                    }{status === "Uploading" &&
                        <h2 className="text-2xl text-amber-400 my-2">Uploading to API ...</h2>
                    }{status === "Completed" &&
                        <h2 className="text-2xl text-lime-500 my-2">Post was successful!</h2>
                    }
                </section>
            </section>
        </main>
    )
}
export default CreatePage


