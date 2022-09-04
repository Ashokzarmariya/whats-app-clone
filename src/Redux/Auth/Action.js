import { LOGIN, REGISTER, REQ_USER, SEARCH_USER } from "./ActionType";

export const register = (data) => async (dispatch) => {
  const res = await fetch("https://whatsapp-clone-ashok.herokuapp.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
 
  if (user.token) localStorage.setItem("token", user.token);
  dispatch({ type: REGISTER, payload: user });
};

export const login = (data) => async (dispatch) => {
  const res = await fetch("https://whatsapp-clone-ashok.herokuapp.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const user = await res.json();
  if (user.token) localStorage.setItem("token", user.token);
  
  dispatch({ type: LOGIN, payload: user });
};

export const currentUser = (token) => async (dispatch) => {
  const res = await fetch(
    `https://whatsapp-clone-ashok.herokuapp.com/users/currentUser`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const user = await res.json();

 dispatch({type:REQ_USER, payload:user})
};


export const searchUser = (data) => async (dispatch) => {
  const res = await fetch(
    `https://whatsapp-clone-ashok.herokuapp.com/users?search=${data.keyword}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const user = await res.json();

  const temp=user.filter((item)=>item._id!==data.userId)
 dispatch({type:SEARCH_USER, payload:temp})
};
