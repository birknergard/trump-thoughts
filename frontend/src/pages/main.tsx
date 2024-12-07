import React, { useState, useEffect } from "react"
import ThoughtList from "../components/thoughtList";
import ThoughtCreator from "../components/thoughtCreator";

function MainPage(){
    return(
        <main className="w-full flex flex-col items-center">
            <h1 className="m-4 text-sky-400 text-3xl ">Trump man thinkin hmm</h1>
            <ThoughtList />
        </main>
    )
}  

export default MainPage;