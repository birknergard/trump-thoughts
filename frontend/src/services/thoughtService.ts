import axios from 'axios';
import IThought from '../interfaces/thought';

const ThoughtApi = (() => {

    const url : string = "http://localhost:5026/api/thought"
      
    const getAll = async(): Promise<IThought[]> => {
        try {
            const response = await axios.get<IThought[]>(url)
            console.log(response.data)   
            return response.data;
        } catch(error){
            console.error("Error with GET method.", error)
            return []
        }
    }

    const getByTopic = async(topic : string) => {
        try {
            const response = await axios.get<string[]>(`${url}/${topic}`)
            console.log(response.data)
            return response.data
        } catch(error){
            console.error("Error with GET method.", error)
            return []
        }
    }

    const getAllTopics = async() : Promise<string[]> => {
        try {
            const response = await axios.get<string[]>(`${url}/topics`)
            console.log(response.data)
            return response.data
        } catch(error) {
            console.error("Error with GET method.", error)
            return []
        }
    }


    const create = async(newThought : IThought) : Promise<void> => {
        try {
            const response = await axios.post(url, newThought)
            return response.data;
        } catch (error) {
            console.error("Error with POST method.", error)
        }
    }  


    const remove = async(id : number) : Promise<void> => {
        try {
            await axios.delete(`${url}/${id}`)
        } catch(error) {
            console.error("Error with DELETE method.", error)
        }
    }

    const update = async(id : number, modifiedThought : IThought) : Promise<void> => {
        try{
            await axios.put(`${url}/${id}`, modifiedThought)
        } catch(error) {
            console.error("Error with PUT method.", error)
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