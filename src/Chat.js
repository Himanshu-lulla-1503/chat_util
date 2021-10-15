import { current } from 'immer'
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
                   return <Group value={c} toggle={(id)=>props.toggle(id)} leavegroup={(id)=>props.leavegroup(id)}/>
                })}
            </ul>
        </div>
        :null}
        </div>
        <div>
        {props.users[props.current]&&
        <div>
            <ul>
                {props.users[props.current].map((c,i)=>{
                   return <li onClick={()=>props.toggleonetoonechat(c.id)}>{c.name}</li>
                })}
            </ul>
        </div>
        }

        </div>
        <div>
            <input type="text" placeholder="Enter Your message" onChange={props.messagechange} value={props.message} />
            <button onClick={props.sendmessage}>Send</button>
        </div>


       
        </>
    )
}

export default Chat
