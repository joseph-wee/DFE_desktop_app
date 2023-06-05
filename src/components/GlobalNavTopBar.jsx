import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GlobalNavTopBar = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Logo onClick={() => navigate("/")}>DFE</Logo>
      <MenuContianer>
        <Menu onClick={() => navigate("/write")}>일기 작성</Menu>
        <Menu onClick={() => navigate("/list")}>일기 목록</Menu>
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
  font-size: 30px;
  font-weight: 700;
  cursor: pointer;
`;

export default GlobalNavTopBar;
