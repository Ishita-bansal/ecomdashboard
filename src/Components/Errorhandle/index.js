import React from "react";

const ErrorHandle = ({touched , errors , fieldname}) =>{
    return(
        <>
         <div>
             {
                touched?.[fieldname] && errors?.[fieldname] ? <p style={{color:"red",fontSize:"20px",fontStyle:"italic",textAlign:"left"}}>{errors?.[fieldname]}</p> : <p style={{visibility:"hidden"}}>text</p>
             }

         </div>
        </>
    )
}

export default ErrorHandle;