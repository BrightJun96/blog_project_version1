import styled from "styled-components";

import palette from "../../../lib/styles/palette";

export const PostViewerBlock = styled.div`
  margin-top: 4rem;
`;

export const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

export const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[6]};

  span {
    margin-right: 1rem;
  }
`;

export const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.violet[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const PostContent = styled.div`
  font-size: 1.3rem;
  color: ${palette.gray[8]};
`;
