import produce from "immer";
import { handleActions } from "redux-actions";
import * as postAPI from "../lib/api/post";
import createActionTypes from "./../lib/createActionTypes";
import createThunk from "./../lib/createThunk";

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] =
  createActionTypes("posts/LIST_POSTS");

export const getListThunk = () => createThunk(LIST_POSTS, postAPI.listPost);

const initialState = {
  posts: null,
  error: null,
};

export const postsReducer = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.posts = action.payload;
      }),
    [LIST_POSTS_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.error = action.payload;
      }),
  },
  initialState
);

export const postsSelector = ({ postsReducer }) => ({
  posts: postsReducer.posts,
  error: postsReducer.error,
});
