import React, { useState, useEffect,  } from "react"
import IThought from "../interfaces/thought"
import ThoughtApi from "../services/thought-service"
import Thought from "../components/thought"

function Main(){
    const [thoughts, setThoughts] = useState<IThought[]>([])

    const updateThoughts = async() => {
        try {
            const fetchedThoughts = await ThoughtApi.getAll()
            if(fetchedThoughts != null){
                setThoughts(fetchedThoughts)
            }
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        updateThoughts()
    }, [])
    
    return(
        <div> 

        </div>
    )
}  

export default Main;