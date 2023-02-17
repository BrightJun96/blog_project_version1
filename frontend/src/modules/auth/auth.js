import { handleActions } from "redux-actions";
import * as authAPI from "../../lib/api/auth";
import produce from "immer";

import createThunk from "./../../lib/createThunk";
import createActionTypes from "../../lib/createActionTypes";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createActionTypes("auth/REGISTER");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes("auth/LOGIN");

// export const registerThunk =
//   ({ username, password }) =>
//   async (dispatch) => {
//     try {
//       const response = await authAPI.register({ username, password });
//       dispatch({ type: REGISTER_SUCCESS, payload: response.data });
//     } catch (e) {
//       dispatch({ type: REGISTER_FAILURE, payload: e });
//     }
//     };

export const registerThunk = ({ username, password }) =>
  createThunk(REGISTER, authAPI.register, { username, password });

export const loginThunk = ({ username, password }) =>
  createThunk(LOGIN, authAPI.login, { username, password });

const initialState = {
  auth: null,
  authError: null,
};

const authReducer = handleActions(
  {
    [REGISTER_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.auth = auth;
      }),
    [REGISTER_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.authError = error;
      }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) =>
      produce(state, (draft) => {
        draft.auth = auth;
      }),
    [LOGIN_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.authError = error;
      }),
  },
  initialState
);

export const authSelector = ({ authReducer }) => ({
  auth: authReducer.auth,
  authError: authReducer.authError,
});

export default authReducer;
