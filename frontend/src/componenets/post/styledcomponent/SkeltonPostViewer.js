import React from "react";
import Responsive from "../../common/Responsive";
import { PostHead } from "./styledPostViewer";
import styled, { css } from "styled-components";

const commonProperty = css`
  background-color: lightgray;
  border-radius: 5px;
`;

const SkeltonPostViewerContainer = styled.div`
  margin-top: 4rem;

  .common {
    background-color: lightgray;
    border-radius: 0.5rem;
  }
  .post-body {
    width: 100%;
    height: 250px;
  }
`;
const SkeltonPostHead = styled(PostHead)`
  .post-title {
    width: 100%;
    height: 72px;
  }

  .post-tagList {
    display: flex;
    margin-top: 0.5rem;

    .post-tag {
      width: 40px;
      height: 1rem;
      margin-right: 0.5rem;
    }
  }
`;

const SkeltonSubInfo = styled.div`
  display: flex;
  margin-top: 1rem;
  div {
    width: 80px;
    height: 1rem;
    margin-right: 1rem;
  }
`;

const SkeltonPostViewer = () => {
  return (
    <Responsive>
      <SkeltonPostViewerContainer>
        <SkeltonPostHead>
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
        </SkeltonPostHead>
        <div className="post-body common"></div>
      </SkeltonPostViewerContainer>
    </Responsive>
  );
};
export default SkeltonPostViewer;
