import styled from "styled-components";
import palette from "../../../lib/styles/palette";

// 화면 전체 컨테이너
export const AuthTemplateBlock = styled.div`
  /*
  컴포넌트를 화면에 꽉 채우는 방법
  방법1.
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  방법2.
  min-height: 100vh;
  */

  min-height: 100vh;
  background: ${palette.gray[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 흰색 박스
export const WhiteBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 32px;
  width: 360px;
  background: white;
  border-radius: 2px;
`;

export const AuthFormBlock = styled.div`
  h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 30px;
    color: ${palette.gray[8]};
  }
`;

/* 스타일링된 input */
export const StyledInput = styled.input`
  font-size: 16px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 6px;
  width: 100%;
  &:focus {
    border-bottom: 1px solid ${palette.gray[8]};
  }

  // 간격
  & + & {
    margin-top: 20px;
  }
`;

// 폼 하단에 로그인 혹은 회원가입 링크를 보여줌.
export const Footer = styled.div`
  margin-top: 32px;
  .link-box {
    display: flex;
    justify-content: space-between;
  }
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;

    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
`;
