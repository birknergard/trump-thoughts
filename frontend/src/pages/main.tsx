import React, { useState, useEffect } from "react"
import ThoughtList from "../components/thoughtList";
import ThoughtCreator from "../components/thoughtCreator";

function MainPage(){
    return(
        <main>
            <h1 className="m-4 text-sky-400 text-3xl flex justify-center">Trump man thinkin hmm</h1>
            <ThoughtList />
        </main>
    )
}  

export default MainPage;