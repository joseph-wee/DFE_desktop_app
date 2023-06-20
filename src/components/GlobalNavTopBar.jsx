import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const GlobalNavTopBar = ({ path, size }) => {
  const navigate = useNavigate();

  /** 음성인식 후 해당 페이지로 이동하는 기능 */
  useEffect(() => {
    navigate(path);
  }, [path]);

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>DFE</Logo>
      <MenuContianer>
        <Menu size={size} onClick={() => navigate("/write")}>
          일기 작성
        </Menu>
        <Menu size={size} onClick={() => navigate("/list")}>
          일기 목록
        </Menu>
      </MenuContianer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: rgb(135, 231, 176);
  justify-content: space-between;
  height: 100px;
`;
const Logo = styled.h1`
  font-size: 50px;
  color: #ffffff;
  font-weight: 900;
  width: 200px;
  cursor: pointer;
`;
const MenuContianer = styled.div`
  display: flex;
  box-sizing: border:box;
  align-itmes: center;
  gap: 20px;

`;
const Menu = styled.nav`
  font-size: ${(props) => {
    return `${props.size}px`;
  }};
  font-weight: 700;
  cursor: pointer;
`;

export default GlobalNavTopBar;
