import React from 'react'
import Group from './Group'
const Chat = (props) => {
    return (
        
        <>
        <input type="text" placeholder="Enter room name" value={props.roomName} onChange={props.change} />
        <button onClick={props.addroom}>Create Room</button>
        <input type="text" placeholder="Enter room name" value={props.joinRoomName} onChange={props.change2} />
        <button onClick={props.joinroom}>Join Room</button>
        <div>
        {props.rooms.length!=0?
        <div>
            <ul>
                {props.rooms.map((c,i)=>{
                   return <Group value={c} toggle={(id)=>props.toggle(id)}/>
                })}
            </ul>
        </div>
        :null}
        </div>
        <div>
        {props.users.length!=0?
        <div>
            <ul>
                {props.users.map((c,i)=>{
                   return <li>{c.name}</li>
                })}
            </ul>
        </div>
        :null}

        </div>


       
        </>
    )
}

export default Chat
