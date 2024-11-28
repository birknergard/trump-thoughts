import React, { useState, useEffect } from "react"
import ThoughtList from "../components/thoughtList";
import ThoughtCreator from "../components/thoughtCreator";

function Main(){
    
    return(
        <div>
            <ThoughtList />
            <ThoughtCreator />
        </div>
    )
}  

export default Main;