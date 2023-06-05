import React from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <Logo>DFE</Logo>

      <Text>
        환영합니다! <br />
        상단 메뉴를 터치하여
        <br />
        서비스를 이용해주세요!
      </Text>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 150px;
  padding-bottom: 100px;
`;
const Logo = styled.div`
  margin: 0 auto;
  margin-bottom: 30px;
  width: 200px;
  font-size: 80px;
  font-weight: 900;
  color: rgb(135, 231, 176);
  text-align: center;
`;
const Text = styled.div`
  margin: 0 auto;
  margin-bottom: 10px;
  width: 500px;
  font-size: 30px;
  font-weight: 700;
  line-height: 50px;
  text-align: center;
`;

export default Home;
