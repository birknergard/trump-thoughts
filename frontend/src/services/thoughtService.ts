import axios from 'axios';
import IThought from '../interfaces/thought';

const ThoughtApi = (() => {

    const url : string = "http://localhost:5026/api/thought"
      
    const getAll = async(): Promise<IThought[]> => {
        try {
            const response = await axios.get<IThought[]>(url)
            return response.data;
        } catch(error){
            console.error("Error with GET method: GetAll", error)
            return []
        }
    }

    const getByTopic = async(topic : string) => {
        try {
            const response = await axios.get<IThought[]>(`${url}/topic=${topic}`)
            return response.data
        } catch(error){
            console.error("Error with GET method: GetByTopic", error)
            return []
        }
    }

    const getByTone = async(tone : string) => {
        try {
            const response = await axios.get<IThought[]>(`${url}/tone=${tone}`)
            return response.data
        } catch(error){
            console.error("Error with GET method: GetByTone", error)
            return []
        }
    }

    const getByToneAndTopic = async(tone : string, topic : string) => {
        try {
            const response = await axios.get<IThought[]>(`${url}/multi/${tone}+${topic}`)
            return response.data
        } catch(error){
            console.error("Error with GET method: GetByToneAndTopic", error)
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
        getByTone,
        getByToneAndTopic,
        create,
        update,
        remove
    }
        
})()

export default ThoughtApi;