import client from "./client";

// GET 전체게시물 조회
export const listPost = () => {
  return client.get("/api/posts");
};

// GET ID를 이용한 특정 게시물 조회
export const readPost = (id) => client.get(`/api/posts/${id}`);

// POST 게시물 등록
export const writePost = ({ title, body, tags }) =>
  client.post("/api/posts", { title, body, tags });

// PATCH 게시물 수정
export const updatePost = ({ id, title, body, tags }) =>
  client.patch(`/api/posts/${id}`, { title, body, tags });

// DELETE게시물 삭제
export const removePost = (id) => client.delete(`/api/posts/${id}`);

export const postLike = ({ id, likeCount }) =>
  client.patch(`/api/posts/${id}/like`, { likeCount });
