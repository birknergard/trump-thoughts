import React, { useState, useEffect } from "react"
import ThoughtList from "../components/thoughtList";
import ThoughtCreator from "../components/thoughtCreator";
import { ThoughtProvider } from "../context/thoughtContext";

function Main(){

    return(
        <ThoughtProvider>
            <ThoughtList />
            <ThoughtCreator />
        </ThoughtProvider>
    )
}  

export default Main;