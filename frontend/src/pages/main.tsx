import React, { useState } from "react"
import ThoughtApi from "../components/api"

function Main(){

    const [thoughts, setThoughts] = useState(() => {

    });

    const updateThoughts = async() => {
        try {
            setThoughts((await ThoughtApi.getAll()).data)
        } catch(error){
            console.log(error);
        }
    }

    return(
        <div> 
            <button>Update</button>
            <p>Thoughts: {thoughts}</p>
        </div>
    )
}

export default Main;