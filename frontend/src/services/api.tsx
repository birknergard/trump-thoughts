import axios from 'axios';
import IThought from '../interfaces/thought';


const ThoughtApi = (() => {

    const url : string = "localhost:5026/api/thoughts"
      
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
        try{
            const response = await axios.get<Array<string>>(`${url}/${topic}`)
            console.log(response.data)
            return response.data
        } catch(error){
            console.error("Error with GET method.")
            return null
        }
    }

    return {
        getAll,
        getByTopic
    }
        
})()

export default ThoughtApi;