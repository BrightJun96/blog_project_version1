import { Link } from "react-router-dom";
import { TagsBlock } from "./styledcomponent/styledPostList";

const Tags = ({ tags }) => {
  return (
    <TagsBlock>
      {tags.map((tag) => (
        // 이미 존재하는 태그는 container 로직에서 걸러주므로 key가 겹치지 않는다.
        <Link className="tag" to={`/?tag=${tag}`} key={tag}>
          {`#${tag}`}
        </Link>
      ))}
    </TagsBlock>
  );
};

export default Tags;
