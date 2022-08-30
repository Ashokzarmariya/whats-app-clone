import React from "react";
import { AiOutlineDown } from 'react-icons/ai'

const UserChat = ({name,userImg,sentTime,isChat,message}) => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w=[20%]">
        <img
          className="h-14 w-14 rounded-full"
          src={userImg}
          alt=""
        />
      </div>
      <div className="pl-5 w-[80%]">
        <div className="flex justify-between items-center">
          <p className="text-lg">{name}</p>
          {isChat && <p className="text-sm">{sentTime}</p>}
        </div>
        <div className="flex justify-between items-center">
      {isChat && <p className="">{message}</p>}
      <div className="flex space-x-2 items-center">
       {isChat && <p className="text-xs p-1 px-2 text-white bg-green-500 rounded-full">4</p>}
       <AiOutlineDown className="hidden group-hover:block"/>
      </div>
         
        </div>
      </div>
    </div>
  );
};

export default UserChat;
