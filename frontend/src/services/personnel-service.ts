import axios from 'axios';
import IStaffMember from '../interfaces/staffmember';


const StaffApi = (() => {

    const url : string = "localhost:5026/api/thought"
      
    const getAll = async(): Promise<IStaffMember[] | null> => {
        try {
            const response = await axios.get<IStaffMember[]>(url)
            console.log(response.data)   
            return response.data;
        } catch(error){
            console.error("Error with GET method.", error)
            return null
        }
    }


    const create = async(newMember : IStaffMember) : Promise<void> => {
        try {
            await axios.post(url, {
                id: newMember.id,
                name: newMember.name,
                imageUrl: newMember.imageUrl,
                title: newMember.title
            })

        } catch (error){
            console.error("Error with POST method.", error)
        }
    }  


    const remove = async(id : number) : Promise<void> => {
        try {
            await axios.delete(`${url}/${id}`)
        } catch(error){
            console.error("Error with DELETE method.", error)
        }
    }

    const update = async(id : number, modifiedMember : IStaffMember) : Promise<void> => {
        try{
            await axios.put(`${url}/${id}`, modifiedMember)
        } catch(error){
            console.error("Error with PUT method.", error)
        }
    }

    return {
        getAll,
        create,
        update,
        remove
    }
})()

export default StaffApi;