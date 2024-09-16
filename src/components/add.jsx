import React from "react";
import { useState } from "react";

const Add =()=>{
   const [sum,setsumdata] = useState(0);
  const zoro =() =>{
    const num = sum+1;
    setsumdata(num);
  }

  const sub = () =>{
    setsumdata(0);
  }
    return (
        <div>
     <h1>{sum}</h1>
     <button onClick={zoro}>+</button>
     <button onClick={sub}>-</button>
     </div>

   

    );

};

export default Add;