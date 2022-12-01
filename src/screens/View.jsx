import React from "react";
import Admin from "../components/AdminView";
import User from "../components/UserView";

function viewContainer ({user}){
    return( 
        <>
        {user.rol === "admin" ? <Admin user={ user }/> : <User user={ user }/> }
        </>
        )

}

export default viewContainer