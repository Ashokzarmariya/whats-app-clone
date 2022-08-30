/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import {
  BsThreeDotsVertical,
  BsFilter,
  BsMicFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { TbCircleDashed } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import UserChat from "./UserChat";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, searchUser } from "../../Redux/Auth/Action";
import { createSingleChat, getAllChat } from "../../Redux/Chat/Action";
import { createNewMessage, getAllMessage } from "../../Redux/Message/Action";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

var soket, selectedChatCompare;
const HomePage = () => {
  const dispatch = useDispatch();
  const { auth, chat, message } = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const [querys, setQuerys] = useState("");
  const [content, setContent] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  // console.log("curentChats", currentChat);
  // console.log("currentChat", currentChat);
  // console.log("message", messages,"------",message.newMessage);
  // console.log(auth.reqUser, "----------------req User");
  //dispatch current user if user signup or login
  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);

  //redirect to signup page if user not authenticate
  useEffect(() => {
    if (!auth.reqUser) navigate("/signup");
    if (chat.chats) setCurrentChat(chat.chats[0]);
  }, [auth.reqUser]);

  useEffect(() => {
    soket = io("http://localhost:5000/");
    if(auth.reqUser)soket.emit("setup", auth.reqUser);

    // socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, [auth.reqUser]);

  //setCurrentChat
  useEffect(() => {
    if (chat.singleChat) setCurrentChat(chat.singleChat);
  }, [chat.singleChat]);

  //create new Single chat
  const createNewChat = (userId) => {
    const data = { token, userId };
    if (token) dispatch(createSingleChat(data));
  };

  //get all chats
  useEffect(() => {
    if (token) dispatch(getAllChat(token));
  }, [token, chat.singleChat]);

  //createnew message
  const handleCreateNewMessage = () => {
    const data = { token, chatId: currentChat?._id, content };
    dispatch(createNewMessage(data));
  };

  //get all message
  useEffect(() => {
    if (!currentChat?._id) return;
    dispatch(getAllMessage({ chatId: currentChat._id, token }));
    soket.emit("join_room", currentChat?._id);
  }, [currentChat]);

  //setMessage and sent soket to new_message
  useEffect(() => {
    if (message.messages) setMessages(message.messages);
    if (message.newMessage) {
      soket.emit("new_message", message.newMessage);

      setMessages([...messages, message.newMessage]);
    }
  }, [message.newMessage, message.messages]);

  //search user by name
  const handleSearch = (keyword) => {
    dispatch(searchUser(keyword));
  };

  //all chat isReqUser or Another User
  const isAnotherUser = (item) => {
    if (auth.reqUser?._id !== item.users[0]._id) {
      return item.users[0].username;
    }
    return item.users[1].username;
  };

  useEffect(() => {
    
    soket.on("message_recieved", (newMessageRecieved) => {
      console.log("newMessageRecived---", newMessageRecieved)
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
     
    });
  });

  return (
    <div className="relative">
      <div className="py-14 bg-[#00a884] w-full"></div>
      <div className="absolute w-[97vw] h-[94vh] bg-[#f0f2f5] top-6 left-6 flex">
        <div className="w-[30%] bg-[#e7e7e7] h-full ">
          <div className=" w-full ">
            {/* profile img and icons */}
            <div className="flex justify-between items-center  px-3 py-1">
              <div className="flex items-center space-x-3">
                <img
                  className="rounded-full w-16 h-16"
                  src="https://mock-12-api.herokuapp.com/s/ashok"
                  alt=""
                />
                <p>{auth.reqUser?.username}</p>
              </div>
              <div className="space-x-3 text-2xl flex">
                <TbCircleDashed />
                <BiCommentDetail />
                <BsThreeDotsVertical />
              </div>
            </div>
            {/* input */}
            <div className="relative flex justify-center items-center bg-white py-4 px-3">
              <input
                onChange={(e) => {
                  setQuerys(e.target.value);
                  handleSearch(e.target.value);
                }}
                className="border-none outline-none py-2 bg-slate-200 rounded-md w-[93%] pl-9"
                type="text"
                placeholder="Search or start new Chat"
                value={querys}
              />
              <AiOutlineSearch className="absolute top-7 left-5" />
              <div>
                <BsFilter className="ml-4 text-3xl" />
              </div>
            </div>
          </div>
          {/* all user */}
          <div className="bg-white overflow-y-scroll h-[73vh]">
            {querys &&
              auth.searchUser?.map((item, index) => (
                <div
                  onClick={() => {
                    createNewChat(item._id);
                    setQuerys("");
                  }}
                  key={item._id}
                >
                  <hr />
                  <UserChat
                    isChat={false}
                    name={item.username}
                    userImg={item.profilePic}
                  />
                </div>
              ))}

            {chat.chats &&
              chat.chats?.map((item, index) => (
                <div onClick={() => setCurrentChat(item)} key={item._id}>
                  <hr />
                  <UserChat
                    isChat={true}
                    name={
                      auth.reqUser?._id !== item.users[0]._id
                        ? item.users[0].username
                        : item.users[1].username
                    }
                    userImg={
                      auth.reqUser._id !== item.users[0]._id
                        ? item.users[0].profilePic
                        : item.users[1].profilePic
                    }
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="w-[70%] bg-blue-100 relative">
          {/* header part */}
          <div className="header absolute top-0 w-full bg-[#f0f2f5]">
            <div className="  flex justify-between ">
              <div className="py-3 space-x-4 flex items-center px-3 bg">
                <img
                  className="w-10 h-10 rounded-full"
                  src={auth.reqUser?._id !== currentChat?.users[0]._id
                    ? currentChat?.users[0].profilePic
                    : currentChat?.users[1].profilePic}
                  alt=""
                />
                <p>{auth.reqUser?._id !== currentChat?.users[0]._id
                        ? currentChat?.users[0].username
                        : currentChat?.users[1].username}</p>
              </div>
              <div className="py-3 space-x-4 flex items-center px-3 bg">
                <AiOutlineSearch />
                <BsThreeDotsVertical />
              </div>
            </div>
          </div>

          {/* message secition */}

          <div className="px-10   h-[85vh] overflow-y-scroll">
            <div className=" space-y-1 flex flex-col justify-center border mt-20 py-2">
              {messages.length > 1 &&
                messages?.map((item, index) => (
                  <Message
                    key={item._id}
                    isReqUserMessage={index % 2 === 0}
                    content={`${item.content}`}
                  />
                ))}
            </div>
          </div>

          {/* footer send message part */}
          <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
            <div className="flex justify-between items-center px-5">
              <BsEmojiSmile />
              <ImAttachment />
              <input
                onChange={(e) => setContent(e.target.value)}
                className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                placeholder="Type message"
                value={content}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleCreateNewMessage();
                    setContent("");
                  }
                }}
              />
              <BsMicFill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
