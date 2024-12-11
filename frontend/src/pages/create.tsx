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
    const [initiateReset, setInitiateResetState] = useState<boolean>(false)    

    const findEmptyFields = () => {
        const newSet = new Set<number>()

        if(previewThought === null) return

        if(previewThought.title === "") newSet.add(1)           

        if(previewThought.topic === "a topic*" || previewThought.topic === "") newSet.add(2)            

        if(previewThought.statement === "") newSet.add(3)            

        if(previewThought.tone === "" || previewThought.tone === null) newSet.add(4)

        if(previewThought.image === null) newSet.add(5)

        setEmptyFields(newSet) 
    } 



    const submitThought = async(thought : IThought, imageFile: File) => {
        try {
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
        <main className="flex flex-col items-center">
            <NavController navState={true}/>

            <section className="create__grid mt-24">   
                <Creator elementStyle="create__item flex flex-col items-center"
                    attemptedSubmit={attemptedSubmit}
                    setAttemptedSubmit={setAttemptedSubmit}
                    emptyFields={emptyFields}
                    setEmptyFields={setEmptyFields}
                    initiateReset={initiateReset}
                    setResetState={setInitiateResetState}
                />

                <section className="create__item flex flex-col items-center">
                    <Preview 
                        emptyFieldCount={emptyFields.size}
                        thoughtPreview={convertPreviewThought()}
                    />             

                    <div className="flex flex-row items-center justify-center my-2 w-full">
                        <input className="border-2 rounded w-2/4 h-12 m-2"
                            type="button" value="Reset"
                            onClick={() => setInitiateResetState(true)}
                        />
                    {status !== "Uploading" &&
                        <input className="border-2 rounded w-2/4 h-12 m-2"
                            type="button" value="Submit"
                            onClick={handleSubmit}
                        />
                    }
                    </div>

                </section>
            </section>
        </main>
    )
}
export default CreatePage


