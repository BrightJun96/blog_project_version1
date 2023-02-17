import React from "react";
import Responsive from "../componenets/common/Responsive";
import TagBoxContainer from "../containers/write/TagBoxContainer";
import EditorContainer from "./../containers/write/EditorContainer";
import WriteActionButtonContainer from "./../containers/write/WriteActionButtonContainer";

const WritePage = () => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonContainer />
    </Responsive>
  );
};

export default WritePage;
