import { combineReducers } from "redux";
import user from "./user";
import write from "./write";
import { postReducer } from "./post";
import { postsReducer } from "./posts";
import textReducer from "./auth/text";
import authReducer from "./auth/auth";

const rootReducer = combineReducers({
  authReducer,
  textReducer,
  user,
  write,
  postReducer,
  postsReducer,
});

export default rootReducer;
