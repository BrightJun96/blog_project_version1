import React from "react";
import {
  WriteActionButtonBlock,
  StyledButton,
  ErrorBox,
} from "./styled-component/styledWriteActionButton";

const WriteActionButton = ({
  onPublish,
  onCancel,
  errorText,
  originalPostId,
}) => {
  return (
    <WriteActionButtonBlock>
      <StyledButton violet onClick={onPublish}>
        포스트 {originalPostId ? "수정" : "등록"}
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
      <ErrorBox>{errorText}</ErrorBox>
    </WriteActionButtonBlock>
  );
};

export default WriteActionButton;
