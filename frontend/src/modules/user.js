// 사용자 상태를 담을 user redux module
import { createAction } from "redux-actions";
import * as authAPI from "../lib/api/auth";
import { handleActions } from "redux-actions";
import createActionTypes from "../lib/createActionTypes";
import createThunk from "../lib/createThunk";
import produce from "immer";

// 로그아웃
const LOGOUT = "user/LOGOUT";

// 로그인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createActionTypes("user/CHECK");

// 액션생성함수
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

export const checkThunk = () => createThunk(CHECK, authAPI.check);

export const logoutThunk = () => async (dispatch) => {
  authAPI.logout();
  dispatch(logout());
};

const initialState = {
  user: null,
  checkError: null,
};

const user = handleActions(
  {
    [CHECK_SUCCESS]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.user = user;
        draft.checkError = null;
      }),
    [CHECK_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.checkError = error;
      }),
    [LOGOUT]: (state) =>
      produce(state, (draft) => {
        draft.user = null;
      }),
  },
  initialState
);

//seletor
export const userSelector = ({ user }) => ({
  user: user.user,
  error: user.checkError,
});

export default user;
