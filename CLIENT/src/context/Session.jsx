import React, {createContext,useEffect,useState} from 'react';
import axios from 'axios';
import { getSession } from '../sessionUtils/jwtSession';

export const session = createContext({});

export default function Context(props){

    const [userObject,setUserObject] = useState();

    useEffect(() => {
        axios.get("http://localhost:3001/auth/user",{withCredentials:true}).then(res => {
            if(res.data){
                console.log(res.data);
                setUserObject(res.data);
            }else{
                setUserObject(getSession());
            }
        },(err) => {
            console.log("no google user data");
        }) 
    },[userObject])
    return(
        <session.Provider value={userObject}>{props.children}</session.Provider>
    );
}