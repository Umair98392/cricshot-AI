//isLoggedIn=>

export const isLoggedIn=()=>{
    let data=localStorage.getItem("data")
    if(data!=null){
        return true;
    }
    else
    {
        return false;
    }
};

//doLogin=>set to local storage

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
};

//doLogout=>remove from localStorage

export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
};

//get currentUser
export const getCurrentUserDetail=async()=>{
    if(isLoggedIn()){
        return await JSON.parse(localStorage.getItem("data"))?.user;
    }else{
        return undefined;
    }
};

//get token
export const getToken=async()=>{
    if(isLoggedIn()){
        return await JSON.parse(localStorage.getItem("data")).access_token
    }
    else{
        return null;
    }
}
