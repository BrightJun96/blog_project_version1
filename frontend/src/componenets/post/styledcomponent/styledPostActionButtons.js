import styled from "styled-components";
import palette from "./../../../lib/styles/palette";

export const PostActionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

export const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.gray[6]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    color: ${palette.violet[7]};
  }

  & + & {
    margin-left: 0.25rem;
  }
`;
