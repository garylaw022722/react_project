import React from 'react'
import axios from 'axios'
const useAPI_Fetch = async({url, methood, body={} }) => {
      try{
        const data  =  await axios({
          method: methood,
          url: url,
          data: body
        })

      }catch(Err){ console.log(Err)}

  return [];
}

export default useAPI_Fetch
