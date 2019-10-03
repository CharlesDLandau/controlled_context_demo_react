import React, { useContext } from 'react';
import { ControlledContext } from '../contexts/contextcontroller';


function Buttoneer(){
    let value = useContext(ControlledContext);
    return(
        <div style={{height: 100, width:100}}>
            <button onClick={value.pushFoo}>Click me!</button>
        </div>
    );
};

export default Buttoneer
