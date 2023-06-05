import React from "react";
import styled from "styled-components";

const GlobalNavBottomBar = () => {
  return (
    <Container>
      <Menu>글씨 크게</Menu>
      <Menu>글씨 작게</Menu>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: rgb(135, 231, 176);
  justify-content: space-around;
  width: 900px;
  height: 100px;
`;
const Menu = styled.nav`
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
`;
export default GlobalNavBottomBar;
