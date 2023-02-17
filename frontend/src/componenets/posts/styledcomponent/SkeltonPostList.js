import React from "react";
import styled from "styled-components";
import { PostItemBlock } from "./styledPostList";
import Responsive from "./../../common/Responsive";
import Skeleton from "react-loading-skeleton";
const SkeltonPostContainer = styled.div`
  margin-top: 96px;
`;

const SkeltonPostItemBlock = styled(PostItemBlock)`
  .common {
    background-color: lightgray;
    border-radius: 0.5rem;
  }
  .post-title {
    height: 32px;
    width: 100%;
  }
  .post-tagList {
    margin-top: 0.5rem;
    display: flex;
    .post-tag {
      width: 40px;
      height: 16px;
      margin-right: 0.5rem;
    }
  }

  .post-body {
    margin-top: 0.5rem;
    width: 100%;
    height: 40px;
  }
`;

const SkeltonSubInfo = styled.div`
  display: flex;
  margin-top: 1rem;
  .post-subInfo {
    margin-right: 0.5rem;
    width: 80px;
    height: 16px;
  }
`;

const SkeltonPostItem = () => {
  return (
    <SkeltonPostItemBlock>
      <div className="post-title common"></div>
      <SkeltonSubInfo>
        <div className="post-subInfo common"></div>
        <div className="post-subInfo common"></div>
      </SkeltonSubInfo>
      <div className="post-tagList">
        <div className="post-tag common"></div>
        <div className="post-tag common"></div>
        <div className="post-tag common"></div>
      </div>
      <div className="post-body common"></div>
    </SkeltonPostItemBlock>
  );
};

const SkeltonPostList = () => {
  return (
    <Responsive>
      <SkeltonPostContainer>
        <SkeltonPostItem />
        <SkeltonPostItem />
        <SkeltonPostItem />
        <SkeltonPostItem />
        <SkeltonPostItem />
        <SkeltonPostItem />
      </SkeltonPostContainer>
    </Responsive>
  );
};

export default SkeltonPostList;
