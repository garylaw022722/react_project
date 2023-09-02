import React from 'react'
import axios from "axios";


    
export const login_Api =async(formData)=>{

        let url = process.env.REACT_APP_API_BASE_URL+"/authetication" ;
        const res = await axios.post(url ,formData)
        console.log(res.data);
        return res.data;
}

export const getContactList =async(token)=>{
        try{

            let url = "http://127.0.0.1:4085/nusrRoute/getPrivateMessage";
            const res= await axios.get(url,{
                headers :{
                    Authorization :token
                }
            })
            return  res.data
        }catch(err){
            console.log(err);
        }
}
