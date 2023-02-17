import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import qs from "qs";
import PostList from "./../../componenets/posts/PostList";
import { getListThunk, postsSelector } from "./../../modules/posts";
import { userSelector } from "../../modules/user";
const PostListContainer = () => {
  const dispatch = useDispatch();
  const { posts, error } = useSelector(postsSelector);
  const { user } = useSelector(userSelector);

  const location = useLocation(); //location.search로 query조회
  const { username } = useParams();
  /* qs => query값을 편하게 가져오기 위한 라이브러리 */

  const { tag } = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 앞에 ?를 제외하고 parsing해서 객체로 가져와줌.
  });
  //console.log("render"); // 총 2번 리렌더링 처음 check에서 한번 getListThunk에서 한번
  useEffect(() => {
    //  응닶값을 배열로써 응답을 받는데 배열은 객체로써 내부 프로퍼티 값이 같더라도 다른 참조값을 갖고 있기때문에 useSelector가 이를 인지하여 다른값으로 인식한다.
    // 때문에 이전 state와 이후 state가 다르면 리렌더링이 되기 때문에 무한리렌더링이 발생한다.
    dispatch(getListThunk());
  }, []);
  return (
    <PostList
      error={error}
      posts={posts}
      user={user}
      tag={tag}
      username={username}
    />
  );
};

export default PostListContainer;
