import styled from "styled-components";
import palette from "../../../lib/styles/palette";

export const TagBoxBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  border-top: 1px solid ${palette.gray[4]};
  padding-bottom: 3rem;
`;

export const TagForm = styled.form`
  display: flex;
  border: 1px solid black;
  width: 250px;
  border-radius: 4px;
  overflow: hidden;
  input {
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0.5rem;
    flex: 1; // remaining space 차지
    min-width: 0;
  }

  button {
    border: none;
    outline: none;
    font-size: 1rem;
    padding: 0 1rem;
    color: white;
    font-weight: bold;
    cursor: pointer;
    background-color: ${palette.gray[7]};
    &:hover {
      background-color: ${palette.gray[6]};
    }
  }
`;

export const TagList = styled.div`
  margin-top: 1rem;
`;

export const TagItem = styled.span`
  margin-left: 0.5rem;
  color: ${palette.gray[6]};
  cursor: pointer;
  background-color: ${palette.violet[1]};
  border-radius: 2rem;
  padding: 0.2rem 1rem;
  &:hover {
    opacity: 0.5;
  }
`;
