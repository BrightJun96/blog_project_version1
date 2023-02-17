import React, { useEffect, useState } from "react";
import WriteActionButton from "./../../componenets/write/WriteActionButton";
import { useSelector, useDispatch } from "react-redux";
import {
  initEntire,
  writeThunk,
  updateThunk,
  writeSelector,
} from "./../../modules/write";
import { useNavigate } from "react-router-dom";

const WriteActionButtonContainer = () => {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");

  const { field, error, response, originalPostId } = useSelector(writeSelector);

  const { title, body, tags } = field;

  const dispatch = useDispatch();
  const onPublish = () => {
    //originalPostId가 있으면 update
    if (originalPostId) {
      // PostViewerContainer 컴포넌트에서 설정
      // 포스팅 아이디로 데이터베이스에서 해당 포스팅 조회
      dispatch(updateThunk({ id: originalPostId, title, body, tags }));
    }
    // 없으면 그냥 새로운 posting 쓰기
    else {
      dispatch(writeThunk({ title, body, tags }));
    }
  };
  const onCancel = () => {
    const cancel = window.confirm("정말 취소하시겠습니까?"); // 확인 = true 취소 = false

    if (Boolean(cancel)) {
      navigate(-1);
    } // 이전 페이지로
  };

  useEffect(() => {
    // 포스팅을 작성하거나 업데이트하면 해당 포스팅의 주소로 라우팅
    if (Boolean(response)) {
      navigate(`/@${response.user.username}/${response._id}`);
      dispatch(initEntire());
    }
  }, [navigate, response, dispatch]);

  useEffect(() => {
    if (error?.response.status === 400) {
      setErrorText("모든 요소를 2글자이상 입력하세요.");
    }
    if (error?.response.status === 401) {
      setErrorText("로그인을 하셔야합니다.");
    }
    if (error?.response.status === 403) {
      setErrorText("작성한 유저만 포스팅을 수정할 수 있습니다.");
    }
  }, [error]);

  return (
    <WriteActionButton
      onPublish={onPublish}
      onCancel={onCancel}
      error={error}
      errorText={errorText}
      originalPostId={originalPostId}
    />
  );
};

export default WriteActionButtonContainer;
