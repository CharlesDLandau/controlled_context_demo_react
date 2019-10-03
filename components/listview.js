import React, { useContext } from 'react';
import { ControlledContext } from '../contexts/contextcontroller';


function ListView(){
    let value = useContext(ControlledContext);
    return(
        <div>
        {
        value.arr.map((item, idx)=>{
        return (
            <div 
            key={`${idx}-listitem`}
            style={{border: '1px solid black', padding: '20px'}}>
            <p>
                {`${item}`}
            </p>
            </div>
                )
            })
        }
        </div>
    );
};

export default ListView
