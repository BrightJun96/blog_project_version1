import styled from "styled-components";

import palette from "../../../lib/styles/palette";

export const EditorBlock = styled.div`
  // 너비를 Responsive 에게 상속받는다.
  padding: 5rem 0;
`;

export const TitleInput = styled.input`
  background-color: #f8f9fa;
  font-size: 3rem;
  outline: none;
  border: none;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  width: 100%;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${palette.gray[4]};
`;

export const QuillWrapper = styled.div`
  /*
React Quill Issue
https://codepen.io/ahutch1211/pen/OzWeqm?editors=0100
css-selector
*/
  .ql-container {
    font-size: 1.3rem;
    height: 400px;
  }
`;
