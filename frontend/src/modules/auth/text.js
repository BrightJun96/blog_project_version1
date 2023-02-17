import produce from "immer";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const CHANGE_ERRORTEXT = "auth/CHANGE_ERRORTEXT";

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);

/*errorText를 전역적으로 사용하는 이유 : login form과 register form에서 둘 다 사용하고 있기 때문에*/
export const changeErrorText = createAction(CHANGE_ERRORTEXT, (text) => text);

export const initializeForm = createAction(INITIALIZE_FORM);

const initialState = {
  errorText: "",
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  login: { username: "", password: "" },
};

const textReducer = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        // 같은 state logic으로 접근함으로써
        // 여러개의 input state를 한번에 관리해줄 수 있다.
        //( 여러개의 action, action function,reducer logic을 구성할 필요없음.)
        // 객체 프로퍼티를 대괄호로 접근(유동적으로 사용 가능)
        // form => "register" or  "login"
        // key => "username" or  "password" or "passwordConfirm"
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state) => {
      state = initialState;
    },

    [CHANGE_ERRORTEXT]: (state, { payload: text }) =>
      produce(state, (draft) => {
        draft.errorText = text;
      }),
  },
  initialState
);
export const textSelector = ({ textReducer }) => ({
  loginText: textReducer.login,
  registerText: textReducer.register,
  errorText: textReducer.errorText,
});

export default textReducer;
