import React from 'react';


function NestingDoll(props){
    return(
        <div style={{border: '1px solid black', padding: '20px'}}>
            {props.children}
        </div>
    );
};

export default NestingDoll
