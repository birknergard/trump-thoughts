import axios from 'axios';
import IThought from '../interfaces/thought';


const ThoughtApi = (() => {

    const url : string = "localhost:5026/api/thought"
      
    const getAll = async(): Promise<IThought[] | null> => {
        try {
            const response = await axios.get<IThought[]>(url)
            console.log(response.data)   
            return response.data;
        } catch(error){
            console.error("Error with GET method.")
            return null
        }
    }

    const getByTopic = async(topic : string) => {
        try {
            const response = await axios.get<string[]>(`${url}/${topic}`)
            console.log(response.data)
            return response.data
        } catch(error){
            console.error("Error with GET method.")
            return null
        }
    }

    const getAllTopics = async() : Promise<string[] | null> => {
        try {
            const response = await axios.get<string[]>(`${url}/topics`)
            return response.data
        } catch(error){
            console.error("Error with GET method.")
            return null
        }
    }


    const create = async(newThought : IThought) : Promise<void> => {
        try {
            await axios.post(url, {
                id: newThought.id,
                statement: newThought.statement,
                topic: newThought.topic,
                title: newThought.title
            })
        } catch (error){
            console.error("Error with POST method.")
        }
    }  


    const remove = async(id : number) : Promise<void> => {
        try {
            await axios.delete(`${url}/${id}`)
        } catch{
            console.error("Error with DELETE method.")
        }
    }

    const update = async(id : number, modifiedThought : IThought) : Promise<void> => {
        try{
            await axios.put(`${url}/${id}`, modifiedThought)
        } catch(error){
            console.error("Error with PUT method.")
        }
    }

    return {
        getAll,
        getByTopic,
        getAllTopics,
        create,
        update,
        remove
    }
        
})()

export default ThoughtApi;