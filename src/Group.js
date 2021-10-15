import React from 'react'

const Group = (props) => {
    return(
        <>
        <div >
         <li onClick={()=>props.toggle(props.value.roomID)}>{props.value.roomName}
         <button onClick={()=>props.leavegroup(props.value.roomID)}>Leave Group</button></li>
        </div>
        </>
    );
}

export default Group
