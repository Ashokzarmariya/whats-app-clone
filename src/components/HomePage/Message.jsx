import React from 'react'

const Message = ({isReqUserMessage,content}) => {
  return (
    
      <span
              className={`bg-white py-2 px-2 rounded-md max-w-[50%] ${isReqUserMessage?"self-start":"self-end"}`}>
                {content}
              </span>
   
  )
}

export default Message
