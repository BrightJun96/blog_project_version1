import React, { useEffect } from "react";
import Editor from "../../componenets/write/Editor";
import { useSelector, useDispatch } from "react-redux";
import {
  writeSelector,
  changeWriteField,
  initEntire,
} from "../../modules/write";

const EditorContainer = () => {
  const { title, body, field } = useSelector(writeSelector);

  const dispatch = useDispatch();

  const onChangeField = (e) => {
    console.log(e);
    if (typeof e === "string") {
      dispatch(changeWriteField({ key: "body", value: e }));
    } else {
      const { name, value } = e.target;
      dispatch(changeWriteField({ key: name, value }));
    }
  };

  // 컴포넌트가 사라질 때 전체 상태값 비워주기
  useEffect(() => {
    return () => dispatch(initEntire());
  }, []);

  return (
    <Editor
      field={field}
      title={title}
      body={body}
      onChangeField={onChangeField}
    />
  );
};

export default EditorContainer;
