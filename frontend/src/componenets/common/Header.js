import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Responsive from "./Responsive";
import palette from "./../../lib/styles/palette";

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: ${palette.gray[1]};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// Responsive 컴포넌트의 속성에 스타일을 추가해서 새로운 컴포넌트 생성
const Wrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }

  .right {
    display: flex;
    align-items: center;
  }
`;

// 헤더가 fixed이기 때문에 공간을 주기 위해
const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  margin-right: 1rem;
  font-weight: 800;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Responsive>
          <Wrapper>
            <Link to="/" className="logo">
              Jelog
            </Link>
            {/* 검증된 유저가 있으면 로그인 상태가 유지되도록  */}
            {user ? (
              <div className="right">
                <UserInfo>{user.username}</UserInfo>
                <Button onClick={onLogout}>로그아웃</Button>
              </div>
            ) : (
              <Link to="/login" className="right">
                <Button>로그인</Button>
              </Link>
            )}
          </Wrapper>
        </Responsive>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
