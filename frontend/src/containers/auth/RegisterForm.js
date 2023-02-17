import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../componenets/auth/AuthForm";
import { authSelector, registerThunk } from "../../modules/auth/auth";
import {
  textSelector,
  changeField,
  initializeForm,
  changeErrorText,
} from "../../modules/auth/text";
import { checkThunk, userSelector } from "../../modules/user";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  const { auth, authError } = useSelector(authSelector);

  const { registerText, errorText } = useSelector(textSelector);

  // 인풋 변경 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(changeField({ form: "register", key: name, value }));
  };

  // 폼 등록 핸들러
  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordConfirm } = registerText;

    /*     input tag에 required 속성을 입력해서 해결해줄 수 있는 기능  */

    // input 3개 모두 비어있을 때
    // if ([username, password, passwordConfirm].includes("")) {
    //   dispatch(changeErrorText("빈 칸을 모두 입력하세요."));
    //   return;
    // }

    // 비밀번호와 비밀번호확인이 같지않을 때
    if (password !== passwordConfirm) {
      dispatch(initializeForm()); // 초기화
      dispatch(changeErrorText("비밀번호가 일치하지 않습니다."));
      return;
    }

    dispatch(registerThunk({ username, password }));
  };

  // 처음 페이지 mount됬을 때 init
  useEffect(() => {
    dispatch(initializeForm());
    dispatch(changeErrorText(""));
  }, [dispatch]);

  // 회원가입 성공/실패
  useEffect(() => {
    if (authError?.response.status === 409) {
      dispatch(changeErrorText("이미 존재하는 계정입니다."));
      return;
    }
    if (auth) {
      dispatch(checkThunk());
    }
  }, [auth, authError, dispatch]);

  const navigate = useNavigate();

  // 회원가입되면 홈으로 이동
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type="register"
      form={registerText}
      onChange={onChange}
      onSubmit={onSubmit}
      errorText={errorText}
    />
  );
};

export default RegisterForm;
