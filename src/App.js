import React,{useEffect,useRef,useState} from 'react'
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
import immer from 'immer';
let initialmessages={}
let usersdata={}
const App = () => {
  const [chatRooms,setchatRooms]=useState([]);
  const [roomName,setRoomName] =useState('');
  const [message,setMessage]=useState('');
  const [messages,setMessages]=useState(initialmessages);
  const [current,setCurrent]=useState(null);
  const [joinRoomName,setjoinRoomName] =useState('');
  const [userslist,setUserslist]=useState(usersdata);
  const [username,setUsername]=useState('');
  const socketRef=useRef();
  const [users,setUsers]=useState({});
  const [isChannel,setisChannel]=useState(true);
  useEffect(()=>{
   const name=prompt('Enter Your name');
   if(!name){
     alert('please enter name');
    const name= prompt('Enter Your name');

   }
    setUsername(name)
    socketRef.current=io.connect("/");
    console.log(socketRef);
  },[])
  useEffect(()=>{
    setMessage('');

  },[messages])
  useEffect(()=>{
    socketRef.current.on('message',(payload)=>{
      setMessages(messages=>{
        const newmessages=immer(messages,draft=>{
          if(draft[payload.roomID]){
            draft[payload.roomID].push({user:payload.user,text:payload.text,senderID:payload.id});
          }
          else{
            draft[payload.roomID]=[{user:payload.user,text:payload.text,senderID:payload.id}];
          }
        });
        return newmessages;
      });
      
      
    })
  },[])

  useEffect(()=>{
    socketRef.current.on('room data',payload=>{
      console.log(payload);
      console.log(current);
      setUserslist(gotusers=>{
        const newusers=immer(gotusers,draft=>{
          draft[payload.roomID]=[...payload.arr]
        });
        return newusers;
      });
    },[]);

  },[])
  const togglechat=(id)=>{
    setCurrent(id);
    setisChannel(true);
  }
  const toggleonetoonechat=(id)=>{
    setCurrent(id);
    setisChannel(false);
  }

 
  const addroom=()=>{
    if(roomName===''){
      alert('please fill room name to create room');
    }
    else{
      let newid=uuidv4();
      const payload={
        roomID:newid,
        name:username,
        roomName
      }
      setCurrent(payload.roomID);
      socketRef.current.emit('create room',(payload));
      socketRef.current.on('rooms',(rooms)=>{
        console.log(rooms);
        setchatRooms(rooms);
      })
      
      setRoomName('');

    }
   
  }
  const joinroom=()=>{
    if(joinRoomName===''){
      alert('please fill room name to join');
    }
    else{
      const payload={
        roomjoined:joinRoomName,
        name:username
      }
      setCurrent(payload.roomjoined);
      socketRef.current.emit('join room',(payload));
      socketRef.current.on('rooms',(rooms)=>{
        setchatRooms(rooms);
      })
      setjoinRoomName('');

    }
  


  }
  const sendmessage=()=>{
    if(isChannel){
      socketRef.current.emit('send message',{sender:username,roomID:current,message,isChannel});
    }
    else{
      socketRef.current.emit('send message',{sender:username,roomID:current,message,isChannel,senderId:socketRef.current.id});
    }
     
  }
  const leavegroup=(id)=>{
    const payload={
      roomID:id,
      name:username,
      myid:socketRef.current.id
    }
    setMessages(messages=>{
      const newmessages=immer(messages,draft=>{
        if(draft[id]){
          delete draft[id]
        }
      });
      return newmessages;
    });
    setUserslist(userspresent=>{
      const newusers=immer(userspresent,draft=>{
        if(draft[id]){
          delete draft[id]
        }
      });
      return newusers;
    });
   

    socketRef.current.emit('leave room',(payload));
    socketRef.current.on('rooms',(rooms)=>{
      console.log(rooms);
      setchatRooms(rooms);
    })
  }
  return (
    <>
    <Chat addroom={addroom} joinroom={joinroom} joinRoomName={joinRoomName} roomName={roomName} change={(e)=>setRoomName(e.target.value)}
    change2={(e)=>setjoinRoomName(e.target.value)}
    rooms={chatRooms}
    toggle={togglechat}
    users={userslist}
    message={message}
    messagechange={(e)=>setMessage(e.target.value)}
    sendmessage={sendmessage}
    current={current}
    leavegroup={leavegroup}
    toggleonetoonechat={toggleonetoonechat}
    />
   {messages[current] &&
   <div>
    {messages[current].map((curele,index)=>{
      return <li>{curele.user}:{curele.text}</li>
    })}
    </div>
   }
    </>

  )
}

export default App
