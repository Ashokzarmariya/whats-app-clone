import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

//create new message
export const createNewMessage = (data) => async (dispatch) => {
  const res = await fetch(
    `https://whatsapp-clone-ashok.herokuapp.com/messages/createnew`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify({
        content: data.content,
        chatId: data.chatId,
      }),
    }
  );
  const newMessage = await res.json();
 

  dispatch({ type: CREATE_NEW_MESSAGE, payload: newMessage });
  return newMessage;
};

//get all message
export const getAllMessage = (data) => async (dispatch) => {
 
  const res = await fetch(
    `https://whatsapp-clone-ashok.herokuapp.com/messages/getall/${data.chatId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    }
  );
  const messages = await res.json();

  dispatch({ type: GET_ALL_MESSAGE, payload: messages });
};
