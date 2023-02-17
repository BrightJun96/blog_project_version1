import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SkeltonPostViewer from "./componenets/post/styledcomponent/SkeltonPostViewer";
import SkeltonPostList from "./componenets/posts/styledcomponent/SkeltonPostList";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import Test from "./Test";
import { useDispatch } from "react-redux";
import { checkThunk } from "./modules/user";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkThunk());
  }, []);

  const PostListPage = React.lazy(() => import("./pages/PostListPage"));
  const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
  const LoginPage = React.lazy(() => import("./pages/LoginPage"));
  const WritePage = React.lazy(() => import("./pages/WritePage"));
  const PostPage = React.lazy(() => import("./pages/PostPage"));

  const StyledLoadingWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const Loading = () => {
    return (
      <StyledLoadingWrapper>
        <CircularProgress />
      </StyledLoadingWrapper>
    );
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<SkeltonPostList />}>
              <PostListPage />
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <RegisterPage />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/write"
          element={
            <Suspense fallback={<Loading />}>
              <WritePage />
            </Suspense>
          }
        />
        <Route
          path="/@:username"
          element={
            <Suspense fallback={<SkeltonPostList />}>
              <PostListPage />
            </Suspense>
          }
        />
        <Route
          path="/@:username/:postId"
          element={
            <Suspense fallback={<SkeltonPostViewer />}>
              <PostPage />
            </Suspense>
          }
        />
        <Route path="/test" element={<Test />} />
      </Routes>
    </div>
  );
};

export default App;
