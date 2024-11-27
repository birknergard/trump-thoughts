import React from "react";
import IThought from "../interfaces/thought";

function Thought(thought : IThought){
    return(
        <div>
            <h1>{thought.title}</h1>
            <p>{thought.statement}</p>
        </div>
    )
}
export default Thought;




