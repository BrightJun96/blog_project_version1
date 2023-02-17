import React from "react";
import {
  FullScreen,
  ModalBlock,
  StyledButton,
} from "./styledcomponent/styledModal";

const Modal = ({ visible, ondelete, onCancel }) => {
  if (!visible) {
    return null;
  }

  return (
    <FullScreen>
      <ModalBlock>
        <h2>포스트 삭제</h2>
        <p>포스트를 정말 삭제하시겠습니까?</p>
        <div className="buttons">
          <StyledButton onClick={ondelete} violet>
            삭제
          </StyledButton>
          <StyledButton onClick={onCancel}>취소</StyledButton>
        </div>
      </ModalBlock>
    </FullScreen>
  );
};

export default Modal;
