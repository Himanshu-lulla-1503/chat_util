import React,{useEffect,useRef,useState} from 'react'
import Chat from './Chat';
import { v4 as uuidv4 } from 'uuid';
import io from 'socket.io-client';
const App = () => {
  const [chatRooms,setchatRooms]=useState([]);
  const [roomName,setRoomName] =useState('');
  const [joinRoomName,setjoinRoomName] =useState('');
  const [userslist,setUserslist]=useState([]);
  const [username,setUsername]=useState('');
  const socketRef=useRef();
  const rooms={}
  const [users,setUsers]=useState({});
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
   
  const togglechat=(id)=>{
    socketRef.current.emit('get room data',id);
    socketRef.current.on('room data',(users)=>{
      setUserslist(users);
    });

  }

 
  const addroom=()=>{
    if(roomName===''){
      alert('please fill room name to create room');
      
    }
    else{
      const payload={
        roomID:uuidv4(),
        name:username,
        roomName
      }
      
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
      socketRef.current.emit('join room',(payload));
      socketRef.current.on('rooms',(rooms)=>{
        setchatRooms(rooms);
      })
      setjoinRoomName('');

    }
  


  }
  return (
    <Chat addroom={addroom} joinroom={joinroom} joinRoomName={joinRoomName} roomName={roomName} change={(e)=>setRoomName(e.target.value)}
    change2={(e)=>setjoinRoomName(e.target.value)}
    rooms={chatRooms}
    toggle={togglechat}
    users={userslist}
    />

  )
}

export default App
