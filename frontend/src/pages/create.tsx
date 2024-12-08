import React from "react";
import ThoughtCreator from "../components/thoughtCreator";
import NavController from "../components/navController";

function CreatePage(){

    return(
        <main>

            <NavController navState={true}/>
            <ThoughtCreator />
        </main>
    )
}
export default CreatePage