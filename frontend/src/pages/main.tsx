import React, { useState, useEffect } from "react"
import ThoughtList from "../components/thoughtList";
import ThoughtCreator from "../components/thoughtCreator";
import NavController from "../components/navController";

function MainPage(){
    return(

        <main className="w-full flex flex-col items-center mt-24">
            <NavController navState={false} />
            <ThoughtList />
        </main>
    )
}  

export default MainPage;