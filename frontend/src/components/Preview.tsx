
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import ThoughtItem from "../components/thoughtItem";
import IThought from "../interfaces/thought";
import { useThoughtContext } from "../context/thoughtContext";

interface IThoughtPreview {
    style?: string
    emptyFieldCount : number
    thoughtPreview : IThought
}

const Preview : FC<IThoughtPreview> = ({style, emptyFieldCount, thoughtPreview}) => {

    const {rawImageFile} = useThoughtContext()

    return (
        <div className={`${style} flex flex-col items-center`}>
            <h2 className="text-2xl m-5">
                Preview
            </h2>

            {emptyFieldCount <= 4 && 
                <div className="flex flex-col items-center w-full">
                    <ThoughtItem 
                        isPreview={true}
                        thought={thoughtPreview}
                        previewImageSrc={rawImageFile !== null ? URL.createObjectURL(rawImageFile[0]) : ""}
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