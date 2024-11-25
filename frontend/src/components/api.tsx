import axios from 'axios';


const ThoughtApi = (() => {

    const url : string = "localhost:5026/api/thoughts"
      
    const getAll = async() => {
        const response = await axios.get(url)
        console.log(response)
        return response;
    }

    return {
        getAll
    }
        
})()

export default ThoughtApi;