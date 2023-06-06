import { useState } from "react";
import noteContext from "./noteContext";

const NoteSate = (props) => {
    const s1={
        "name":"aryan",
        "class":"2f"
    }       
    const [state,setState]=useState(s1);
    const update = ()=>{
        setTimeout(() =>{
            setState({
                "name":"Aryan",
                "class":"10f"
            })
        }, 5000);
    }

    return(
        <noteContext.Provider value={{state, update}}>
            {props.children}
        </noteContext.Provider>
    )
}


export default NoteSate;