import React, { memo } from "react";

import {
  TagBoxBlock,
  TagForm,
  TagList,
  TagItem,
} from "./styled-component/styledTagBox";
// Tag memoized
const Tag = ({ tag, onRemoveTag }) => {
  return <TagItem onClick={onRemoveTag}>{`#${tag}`}</TagItem>;
};

const MemoizedTag = memo(Tag);

// memo를 해줌으로써 input이 바뀌어도 Tags 컴포넌트는 리렌더링되지않는다.
// Tags memoized
const Tags = ({ tags, onRemoveTag }) => {
  return (
    <TagList>
      {tags.map((tag) => (
        // tag는 겹치지 않도록 추가되게 로직이 구성되있으므로 키값으로 설정해도 된다.
        <MemoizedTag key={tag} tag={tag} onRemoveTag={onRemoveTag} />
      ))}
    </TagList>
  );
};

const MemoizedTags = memo(Tags);

const TagBox = ({ tags, tagTextChange, onAddTag, onRemoveTag, tagText }) => {
  return (
    <TagBoxBlock>
      <h4>태그</h4>
      <TagForm onSubmit={onAddTag}>
        <input
          placeholder="태그를 입력하세요"
          value={tagText}
          onChange={tagTextChange}
          name="tagText"
        />
        <button>추가</button>
      </TagForm>
      <MemoizedTags tags={tags} onRemoveTag={onRemoveTag} />
    </TagBoxBlock>
  );
};

export default TagBox;
