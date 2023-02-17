// write state 관리

import produce from "immer";
import { handleActions } from "redux-actions";
import createThunk from "../lib/createThunk";
import * as postAPI from "./../lib/api/post";
import createActionTypes from "./../lib/createActionTypes";

// 두 개의 state관리해주고 있음.
// 하나는 태그 input state이고
// 하나는 tag들이 들어간 state임.

const CHANGE_FIELD = "write/CHANGE_FIELD";

const INIT_ENTIRE = "write/INIT_ENTIRE";

const [WRITE, WRITE_SUCCESS, WRITE_FAILURE] = createActionTypes("write/WRITE");
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createActionTypes("write/UPDATE_POST");

const SET_ORIGINAL_POST = "write/SET_ORIGINAL_POST";

export const changeWriteField = ({ key, value }) => ({
  type: CHANGE_FIELD,
  payload: { key, value },
  // dispatch(changeWriteField({key: "title" , value}))
});

export const writeThunk = ({ title, body, tags }) =>
  createThunk(WRITE, postAPI.writePost, { title, body, tags });

export const setOriginalPost = (post) => ({
  type: SET_ORIGINAL_POST,
  payload: post,
});

export const updateThunk = ({ id, title, body, tags }) =>
  createThunk(UPDATE_POST, postAPI.updatePost, { id, title, body, tags });

export const initEntire = () => ({ type: INIT_ENTIRE });

const initialState = {
  error: null,
  response: null,
  originalPostId: "",
  field: {
    title: "",
    body: "",
    tagText: "",
    tags: [],
  },
};

const write = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        if (!key) {
          // key를 입력하지 않으면 field 전체값을 변경
          draft.field = value;
        }

        draft.field[key] = value;
      }),

    [INIT_ENTIRE]: (state) => (state = initialState),
    /*--------- */
    [WRITE_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.response = action.payload;
      }),

    [WRITE_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.error = action.payload;
      }),
    [SET_ORIGINAL_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.originalPostId = action.payload;
      }),
    [UPDATE_POST_SUCCESS]: (state, action) =>
      produce(state, (draft) => {
        draft.response = action.payload;
      }),
    [UPDATE_POST_FAILURE]: (state, action) =>
      produce(state, (draft) => {
        draft.error = action.payload;
      }),
  },
  initialState
);
export default write;

export const writeSelector = ({ write }) => ({
  title: write.title,
  body: write.body,
  tagText: write.tagText,
  tags: write.tags,
  error: write.error,
  response: write.response,
  originalPostId: write.originalPostId,
  field: write.field,
});
