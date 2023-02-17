import React from "react";
import {
  PostContent,
  PostHead,
  PostViewerBlock,
  SubInfo,
  Tags,
} from "./styledcomponent/styledPostViewer";
import { Link } from "react-router-dom";
import PostActionButtons from "./PostActionButtons";
import Responsive from "../common/Responsive";
import SkeltonPostViewer from "./styledcomponent/SkeltonPostViewer";
import Like from "./Like";
const PostViewer = ({ post, error, onEdit, onRemove, ownPost }) => {
  if (error) {
    if (error.response?.status === 404) {
      return <PostViewerBlock>존재하지 않은 포스트입니다.</PostViewerBlock>;
    }
    return <PostViewerBlock>오류 발생!</PostViewerBlock>;
  }

  if (!post) {
    return <SkeltonPostViewer />;
  }
  console.log(post);
  const { title, body, user, date, tags } = post;
  return (
    <Responsive>
      <PostViewerBlock>
        <PostHead>
          <h1>{title}</h1>
          <SubInfo>
            <span>
              <b>
                <Link to={`/@${user.username}`}>{user.username}</Link>
              </b>
            </span>
            <span>{new Date(date).toLocaleDateString()} </span>
          </SubInfo>
          <Tags>
            {tags?.map((tag) => (
              <div className="tag" key={tag}>
                {`#${tag}`}
              </div>
            ))}
          </Tags>
          <Like />
        </PostHead>
        {ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />}
        <PostContent dangerouslySetInnerHTML={{ __html: body }} />
        <div className="bottom-space" style={{ height: "50px" }}></div>
        {/* {
      리액트에서 innerHTML을 사용하기 위한 대체 방법
      전달하고자 하는 값을 __html 프로퍼티의 value값으로 할당해주면 된다.
      } */}
      </PostViewerBlock>
    </Responsive>
  );
};
export default PostViewer;
