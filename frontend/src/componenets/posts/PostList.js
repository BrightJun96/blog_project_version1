import React from "react";
import { WritePostButtonWrapper } from "./styledcomponent/styledPostList";
import Button from "./../common/Button";
import { Link } from "react-router-dom";

import PostItem from "./PostItem";
import SkeltonPostList from "./styledcomponent/SkeltonPostList";
import Responsive from "../common/Responsive";

const PostList = ({ posts, error, user, tag, username }) => {
  if (error) {
    return (
      <Responsive>
        <h1>에러가 발생했습니다.</h1>
        <p>{error}</p>
      </Responsive>
    );
  }

  if (!posts) {
    return <SkeltonPostList />;
  }

  return (
    <Responsive>
      <div>
        {/* 포스팅 필터링 인풋 기능 구현 예정 */}
        {/* <input type="text" placeholder="원하시는 포스팅을 입력하세요." /> */}
        {user && (
          <WritePostButtonWrapper>
            <Link to="write">
              <Button violet>새 글 작성하기</Button>
            </Link>
          </WritePostButtonWrapper>
        )}
      </div>
      {
        <div>
          {posts
            ?.filter((post) => {
              if (!tag) {
                return post;
              }
              return post.tags.includes(tag);
            })
            .filter((post) => {
              if (!username) {
                return post;
              }
              return post.user.username === username;
            })
            .map((post) => (
              <PostItem post={post} key={post._id} />
            ))}
        </div>
      }
    </Responsive>
  );
};

export default PostList;
