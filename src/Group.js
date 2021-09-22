import React from 'react'

const Group = (props) => {
    return(
        <>
        <div >
         <li onClick={()=>props.toggle(props.value.roomID)}>{props.value.roomName}</li>
        </div>
        </>
    );
}

export default Group
