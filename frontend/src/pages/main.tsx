import React, { useState, useEffect,  } from "react"
import IThought from "../interfaces/thought"
import ThoughtApi from "../services/thought-service"

function Main(){
    const [thoughts, setThoughts] = useState<IThought[] | null>([])

    const updateThoughts = async() => {
        try {
            const fetchedThoughts = await ThoughtApi.getAll() 
            setThoughts(fetchedThoughts)
        } catch(error){
            console.log(error);
        }
    }

    
    return(
        <div> 
            <button>Update</button>
        </div>
    )
}  

export default Main;