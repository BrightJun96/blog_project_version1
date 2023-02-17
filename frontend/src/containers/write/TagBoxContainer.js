import React, { useCallback } from "react";
import TagBox from "./../../componenets/write/TagBox";
import { useSelector, useDispatch } from "react-redux";
import { writeSelector, changeWriteField } from "./../../modules/write";

const TagBoxContainer = () => {
  const { field } = useSelector(writeSelector);

  const { tagText, tags } = field;

  const dispatch = useDispatch();

  // tagTextChange
  const tagTextChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      dispatch(changeWriteField({ key: name, value }));
    },
    [dispatch]
  );

  // tag 추가
  // tags,tagText가 바뀌었을 때만 함수 새로 생성
  const onAddTag = useCallback(
    (e) => {
      e.preventDefault();
      // 공백이면 추가안함.
      if (tagText === "") return;

      // 이미 존재하는 것이면 추가안함.
      if (tags.includes(`${tagText}`)) return;
      const newTag = tags.concat(`${tagText}`);
      dispatch(changeWriteField({ key: "tags", value: newTag }));
      dispatch(changeWriteField({ key: "tagText", value: "" }));
    },
    [tagText, tags, dispatch]
  );

  const onRemoveTag = useCallback(
    (e) => {
      const clickedText = e.target.textContent;
      const filteringTag = tags.filter((tag) => {
        return `#${tag}` !== clickedText;
      });
      dispatch(changeWriteField({ key: "tags", value: filteringTag }));
    },
    [tags, dispatch]
  );

  return (
    <TagBox
      tags={tags}
      tagTextChange={tagTextChange}
      onAddTag={onAddTag}
      onRemoveTag={onRemoveTag}
      tagText={tagText}
    />
  );
};

export default TagBoxContainer;
