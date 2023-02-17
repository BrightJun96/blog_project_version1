import React from "react";
import palette from "../../lib/styles/palette";
import styled from "styled-components";
import { css } from "styled-components";

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  // 선택적 스타일링
  ${(props) =>
    props.violet &&
    css`
      background: ${palette.violet[4]};
      &:hover {
        background: ${palette.violet[3]};
      }
    `}

${(props) =>
    props.hasTopMargin &&
    css`
      margin-top: 1.5rem;
    `}




    &:disabled {
    background-color: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
