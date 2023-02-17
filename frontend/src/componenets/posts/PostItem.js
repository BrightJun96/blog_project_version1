import { Link } from "react-router-dom";
import { PostItemBlock, SubInfo } from "./styledcomponent/styledPostList";
import Tags from "./Tags";

const PostItem = ({ post }) => {
  const { date, user, tags, title, body, _id } = post;

  return (
    <PostItemBlock>
      <h2>
        <Link to={`/@${user.username}/${_id}`}>{title}</Link>
      </h2>
      <SubInfo>
        <span>
          <b>
            <Link to={`/@${user.username}`}>{user.username}</Link>
          </b>
        </span>
        <span>{new Date(date).toLocaleDateString()}</span>
      </SubInfo>
      <Tags tags={tags} />
      <p>{body}</p>
    </PostItemBlock>
  );
};

export default PostItem;
