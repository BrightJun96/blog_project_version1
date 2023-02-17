import React, { useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { postSelector } from "../../modules/post";
import { userSelector } from "../../modules/user";

const LikeContainer = styled.div`
  margin-top: 1rem;
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    background-color: inherit;
    padding: 10px;
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-color: blue;

    svg {
      width: 30px;
      height: 30px;
      fill: #7048e8;
    }
  }

  button[disabled] {
    color: #666666;
    border: 2px solid #999999;
    background-color: #cccccc;

    svg {
      fill: gray;
    }
  }

  span {
    margin-top: 0.5rem;
  }
`;

const Like = () => {
  const params = useParams();

  const { user } = useSelector(userSelector);
  const { post } = useSelector(postSelector);
  const { postId } = params;
  const [like, setLike] = useState({ activated: false });
  // 각 유저는 좋아요를 하나씩만 증가시킬 수 있다.
  // 유저가 없으면 좋아요 아이콘을 누를 수 없음. => 유저의 존재 여부에 따라 버튼의 disabled를 결정

  /*
  like.activated의 상태에 따라 like count가 추가되야함.
조건1. false면 count를 그대로 냅두고 true면 카운트 + 1 하지만 false가 되면 1이 감소되야함. 

하지만 처음 like.activated는 false이므로

  
  */

  /*
  해당 유저의 좋아요 상태가 해당 포스팅에 기록되있어야함
각 포스팅에는 각기 다른 유저의 좋아요 상태가 기록되야함.

  likeCount = Number(jev.like.activated) + Number(cjfwns96.like.activated) ....
  */

  const activateLike = () => {
    setLike({
      activated: !like.activated,
    });
  };

  // postLike({ id: postId, likeCount: post.like + Number(like.activated) });

  return (
    <LikeContainer>
      <button onClick={activateLike} disabled={!Boolean(user)}>
        {like.activated ? <AiFillLike /> : <AiOutlineLike />}
      </button>
      <span>{Number(like.activated)}</span>
    </LikeContainer>
  );
};

export default Like;
