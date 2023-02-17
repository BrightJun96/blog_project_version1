import React, { useState } from "react";
import Modal from "./Modal";
import {
  ActionButton,
  PostActionButtonBlock,
} from "./styledcomponent/styledPostActionButtons";

const PostActionButtons = ({ onEdit, onRemove }) => {
  const [modal, setModal] = useState(false);

  const appearModal = () => setModal(true);

  const onCancel = () => setModal(false);
  const ondelete = () => {
    onRemove();
    setModal(false);
  };
  return (
    <PostActionButtonBlock>
      <ActionButton onClick={onEdit}>수정</ActionButton>
      <ActionButton onClick={appearModal}>삭제</ActionButton>
      <Modal visible={modal} ondelete={ondelete} onCancel={onCancel} />
    </PostActionButtonBlock>
  );
};

export default PostActionButtons;
