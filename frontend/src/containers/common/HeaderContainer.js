import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../componenets/common/Header";
import { logoutThunk, userSelector } from "./../../modules/user";

// user : 로그인 후의 유저 정보를 담은 data
const HeaderContainer = () => {
  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutThunk());
  };
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
