
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import ThoughtItem from "../components/thoughtItem";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";

interface IThoughtPreview {
    emptyFieldCount : number
    thoughtPreview : IThought
}

const Preview : FC<IThoughtPreview> = ({emptyFieldCount, thoughtPreview}) => {

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h2 className="text-2xl mb-2">
                Preview
            </h2>

            {emptyFieldCount <= 4 && 
                <div className="flex flex-col items-center w-full">
                    <ThoughtItem 
                        isPreview={true}
                        thought={thoughtPreview}
                    />
                </div>
            }  
            {emptyFieldCount === 5 &&
                <p>Enter a field to show preview.</p> 
            }
        </div>
    )
}
export default Preview