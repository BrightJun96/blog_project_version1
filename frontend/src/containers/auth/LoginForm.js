import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../componenets/auth/AuthForm";
import { checkThunk, userSelector } from "../../modules/user";
import { useNavigate } from "react-router-dom";
import {
  changeField,
  changeErrorText,
  initializeForm,
  textSelector,
} from "../../modules/auth/text";

import { authSelector, loginThunk } from "../../modules/auth/auth";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux state selector
  const { user } = useSelector(userSelector);
  const { auth, authError } = useSelector(authSelector);
  const { errorText, loginText } = useSelector(textSelector);

  // 인풋 변경 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "login", key: name, value }));
  };

  // 폼 등록 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = loginText;
    /* input tag에 required 속성을 입력해서 해결해줄 수 있는 기능  */
    // if ([username, password].includes("")) {
    //   dispatch(changeErrorText("빈 칸을 입력해주세요"));
    // }
    dispatch(loginThunk({ username, password }));
  };

  // 컴포넌트가 처음 렌더링될 때 init
  useEffect(() => {
    dispatch(initializeForm());
  }, [dispatch]);

  /* 로그인 성공 및 실패시 처리*/
  // 로그인시 서버에서 토큰을 생성해주고 해당 유저가 서버에서 검증됬는지 확인

  useEffect(() => {
    if (auth) {
      dispatch(checkThunk()); // 서버 state에 유저가 담겨있는지 확인
    }

    /* 에러 텍스트 처리를 서버 status를 이용하여 처리 */
    // 존재하지 않는 계정일 경우
    // 옵셔널 체이닝을 쓴 이유 : authError가 undefined이면 false를 반환하게 하고
    // &&연산자를 사용하면 코드가 길어지기 때문에 가독성을 위해 사용하였다.
    if (authError?.response.status === 400) {
      // authError && authError.response.status === 400
      dispatch(initializeForm());
      dispatch(changeErrorText("존재하지 않는 계정입니다."));
    }

    // 비밀번호가 틀릴 경우
    if (authError?.response.status === 444) {
      dispatch(initializeForm());
      dispatch(changeErrorText("비밀번호가 틀립니다."));
    }
  }, [authError, auth, dispatch]);

  /* 로그인 성공한뒤 확인된 유저가 있다면 메인페이지로 이동 */
  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type="login"
      form={loginText}
      onChange={onChange}
      onSubmit={onSubmit}
      errorText={errorText}
    />
  );
};

export default LoginForm;
