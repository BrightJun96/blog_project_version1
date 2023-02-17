import produce from "immer";
import { handleActions } from "redux-actions";
import * as postAPI from "./../lib/api/post";
import createActionTypes from "./../lib/createActionTypes";
import createThunk from "./../lib/createThunk";

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] =
  createActionTypes("post/READ_POST");

const UNLOAD_POST = "post/UNLOAD_POST";

export const unloadPost = () => ({ type: UNLOAD_POST });

export const readThunk = (id) => createThunk(READ_POST, postAPI.readPost, id);

const initialState = {
  post: null,
  error: null,
};

export const postReducer = handleActions(
  {
    [READ_POST_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload;
      }),
    [READ_POST_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.error = action.payload;
      }),
    [UNLOAD_POST]: (state) => (state = initialState),
  },
  initialState
);

export const postSelector = ({ postReducer }) => ({
  post: postReducer.post,
  error: postReducer.error,
});
