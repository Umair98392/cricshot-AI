import {myAxios} from "./helper";


export const signUp=(user)=>{
    return myAxios.post('/register',user)
    .then((response)=>response)

};

export const loginUser=(loginDetail)=>{
   return myAxios.post('/login',loginDetail, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
   .then((response)=>response)
   
}