import React from "react";
import { Link } from "react-router-dom";
import Button from "./../common/Button";
import {
  AuthFormBlock,
  ErrorMessage,
  StyledInput,
  Footer,
} from "./styled/styledAuthForm";
import { AuthTemplateBlock, WhiteBox } from "./styled/styledAuthForm";

const AuthForm = ({ type, form, onChange, onSubmit, errorText }) => {
  const text = type === "login" ? "로그인" : "회원가입";
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <AuthFormBlock>
          <h3>{text}</h3>
          <form onSubmit={onSubmit}>
            <StyledInput
              autoComplete="username"
              name="username" // 각 input을 가져오기위한 name
              placeholder="아이디"
              value={form.username}
              onChange={onChange}
              required
            />
            <StyledInput
              autoComplete="new-password"
              name="password"
              placeholder="비밀번호"
              type="password"
              value={form.password}
              onChange={onChange}
              required
            />
            {type === "register" && (
              <StyledInput
                autoComplete="new-password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                value={form.passwordConfirm}
                onChange={onChange}
                required
              />
            )}
            {errorText && <ErrorMessage>{errorText}</ErrorMessage>}
            <Button hasTopMargin fullWidth>
              {text}
            </Button>
          </form>
          <Footer>
            <div className="link-box">
              <Link to="/">홈으로</Link>
              {type === "login" ? (
                <Link to="/register">회원가입</Link>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </div>
          </Footer>
        </AuthFormBlock>
      </WhiteBox>
    </AuthTemplateBlock>
  );
};

export default AuthForm;
