import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatBody from '../chatBody/ChatBody';
import icon from '../assets/group-icons.jpg';
import image from '../assets/bg.gif';
import java from '../assets/java.png';
import python from '../assets/python.png';
import './chatBar.css';

const ChatBar = ({ socket }) => {
  const Token = useSelector((Item) => Item.token.data.success);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleChat = (username, profileImage, userId) => {
    setSelectedUser({
      username,
      profileImage,
      userId
    });
  };

  // Fetch all users
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/getall', {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.filter((user) => user.email !== Token.email));
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, [Token]);




  useEffect(() => {
    if (socket) {
      console.log('Socket connection established:', socket);
      socket.emit('register', Token._id);
    }
  }, [socket, Token]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="chat__sidebar">
          {/* <h2>
          <img className="chatbar-profile" src={Token.file} alt="Profile" />
          {Token.firstname} {Token.lastname}
        </h2> */}

          <div className="search-bar">
            <input type="text" placeholder="Search Contact" />
          </div>


          {/* <p>{Token.email}</p> */}

          <div>
            {/* <h4 className="chat__header">ACTIVE USERS</h4> */}
            <div className="chat__users">
              {users.map((user) => (
                <div key={user._id} style={{ display: 'flex' }}>
                  <div>

                    <img className="chatbar-profile" src={user.file} alt="User" />
                  </div>
                  <button className="chat__users_btn"
                    onClick={() =>
                      handleChat(
                        `${user.firstname} ${user.lastname}`,
                        user.file,
                        user._id
                      )
                    }
                  >
                   <h3>{user.firstname} {user.lastname}</h3> 
                  </button>
                </div>
              ))}
            </div>
          </div>


          {/* <div className="groups-section">
          <h5 className='group'>Groups(5)</h5>
          <div>


          <img className="group-profile" src={icon} alt="User" />
          </div>
          <div className="group">App Development</div>
        
          <div className="group">UI/UX Designers</div>
          
          <div className="group">Java Development</div>
        
          <div className="group">Python Development</div>

        </div>  */}


        </div>


        <div className="chat__sidebar">

          <div className="groups-section">
            <h5 className='group' >Groups(5)</h5>
            <div  style={{ display: 'flex'}}>
              <div> <img className="group-profile" src={icon} alt="User" /></div>
              <div className="group-name">App Developer</div>
            </div>
          </div>


      
            <div  style={{ display: 'flex'}}>
              <div> <img className="group-profile" src={java} alt="User" /></div>
              <div className="group-name">Java Developer</div>
            </div>


            <div  style={{ display: 'flex'}}>
              <div> <img className="group-profile" src={python} alt="User" /></div>
              <div className="group-name">Python Developer</div>
            </div>
     



        </div>

      </div>



      <div className="chat__main">
        {selectedUser ? (
          <ChatBody
            socket={socket}
            chat={selectedUser.username}
            profile={selectedUser.profileImage}
            token={`${Token.firstname} ${Token.lastname}`}
            receiverID={selectedUser}
          />
        ) : (
          <img src={image} width="125%" height="100%" alt="Background" />
        )}
      </div>



    </>
  );
};

export default ChatBar;
