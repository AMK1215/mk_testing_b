import { useContext } from "react";
 import { AuthContext } from "../providers/AuthProvider";

const useAuth=()=>{
    const data=useContext(AuthContext);
    if(data===null) throw new Error("useAuth must be used within AuthProvider!")
    else return data;
}

export default useAuth;