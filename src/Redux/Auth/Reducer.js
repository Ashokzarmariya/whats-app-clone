import { LOGIN, REGISTER, REQ_USER, SEARCH_USER } from "./ActionType"

const initialState = {
 reqUser: null,
 isAtuh:false
}
export const authReducer = (store = initialState, { type, payload }) => {
 if (type === REGISTER) {
  return {...store, signup:payload, isAtuh:payload.isAtuh}
 }
 else if (type === LOGIN) {
  return {...store, login:payload, isAtuh:payload.isAtuh}
 }
 else if (type === REQ_USER) {
  return {...store, reqUser:payload}
 }
 else if (type === SEARCH_USER) {
  return {...store, searchUser:payload}
 }
 return store
}