import React from "react"

function SelectionList({options, fieldName, fieldState, fieldSetter}){

    function Item({option, fieldSetter, fieldState}){
        const capitalizeFirst = (string) => {
            var result = string[0].toUpperCase()
            for(var i = 1; i < string.length; i++){
                if(result[result.length - 1] == " ") {
                    result += string[i].toUpperCase()
                } else {
                    result += string[i]
                }
            }
            return result;
        }
        
        const handleCheck = () => {
            fieldSetter(option)
        }

        return(
            <div className="flex flex-row ">
                <input 
                    className=""
                    type="radio" 
                    name={option} 
                    id={option}
                    checked={fieldState === option}
                    onChange={handleCheck}
                />
            
                <p className="">
                    {capitalizeFirst(option)}
                </p>
            </div>
        )
    }
    
    const getSelectionList = () => {  
        const itemComponents = options.map((_field, i) => (
            <Item 
                key={`item_${i}`}
                option={_field}
                fieldState={fieldState}
                fieldSetter={fieldSetter}
            />       
        ))    
        return itemComponents 
    }

    
    return(
        <>
        <h1 className="text-xl">Select a topic</h1>
        <div className="flex flex-col">
            {getSelectionList()}
        </div>
        <h2 className="text-xl">selected: {fieldState}</h2>
        </>
    )
}
export default SelectionList