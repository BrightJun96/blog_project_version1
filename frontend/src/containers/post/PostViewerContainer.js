import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postSelector, readThunk, unloadPost } from "../../modules/post";
import PostViewer from "../../componenets/post/PostViewer";
import { changeWriteField, setOriginalPost } from "../../modules/write";
import * as postAPI from "../../lib/api/post";
import { userSelector } from "../../modules/user";
const PostViewerContainer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { postId } = params;
  const dispatch = useDispatch();
  const { post, error } = useSelector(postSelector);
  const { user } = useSelector(userSelector);

  useEffect(() => {
    dispatch(readThunk(postId));
    return () => dispatch(unloadPost());
    /* componentWillunmount*/
    // 컴포넌트가 사라질 때 post state를 초기화해줌.
    // cleanup 함수를 해주지 않으면 다른 포스팅을 조회할 때 전 포스팅을 잠시 나타나게 된다.
    // 따라서 해당 컴포넌트가 사라질 때 state값을 초기화해준다.
  }, []);

  const onEdit = () => {
    /* 기존 포스팅을 가져와야함. */

    dispatch(setOriginalPost(post?._id)); // write 페이지로 넘어갈 때 original 아이디를 넘겨준다.
    // 이 original 아이디는 write페이지에서 작성하는 포스팅이 업데이트할 포스팅인지 새로작성할 포스팅인지 구별해준다.
    dispatch(changeWriteField({ key: "tags", value: post?.tags }));
    dispatch(changeWriteField({ key: "title", value: post?.title }));
    dispatch(changeWriteField({ key: "body", value: post?.body }));

    /*
dispatch(changeWriteField({title : post?.title,body :post?.body ....}))
*/
    navigate("/write");
  };

  // 간단한 비동기 처리는 container내에서 해결해도 됨.
  const onRemove = async () => {
    try {
      await postAPI.removePost(postId);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  /* 포스팅을 작성한 유저가 로그인한 유저와 동일한지 확인하는 로직 */
  const ownPost = user?._id === post?.user._id; //  const ownPost = (user&&user._id) === (post&&post.user._id)
  // undefined이나 null은 false로 동적타입변환된다.

  return (
    <PostViewer
      post={post}
      error={error}
      onRemove={onRemove}
      onEdit={onEdit}
      ownPost={ownPost}
    />
  );
};

export default PostViewerContainer;
