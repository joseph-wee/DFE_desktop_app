import React from "react";
import styled from "styled-components";

const Home = ({ size }) => {
  return (
    <Container>
      <Logo>DFE</Logo>
      <Text size={size}>
        환영합니다!
        <br />
        이용하려는 서비스를 터치하시거나 <br />
        음성으로 입력해주세요.
      </Text>
      {/* <Info>
        아래의 음성을 말하면 해당 기능이 작동합니다.
        <br />
        <br />
        일기 작성 : 일기 작성 페이지로 이동합니다.
        <br />
        일기 목록 : 일기 목록 페이지로 이동합니다.
        <br />
        홈 페이지 : 홈페이지로 이동합니다.
        <br />
        <br />
        아래는 일기 목록 페이지에서 음성으로 작동하는 기능입니다.
        <br />
        <br />
        다음 : 다음달에 작성한 일기 목록을 보여줍니다.
        <br />
        이전 : 이전달에 작성한 일기 목록을 보여줍니다.
        <br />
        0000년 0월 0일 : 해당 날짜의 일기 내용을 보여줍니다. <br />
      </Info> */}
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 100px;
`;
const Logo = styled.div`
  margin: 0 auto;
  margin-bottom: 30px;
  padding-top: 50px;
  width: 200px;
  font-size: 80px;
  font-weight: 900;
  color: rgb(135, 231, 176);
  text-align: center;
`;
const Text = styled.div`
  margin: 0 auto;
  margin-bottom: 50px;
  width: 600px;
  font-size: ${(props) => {
    return `${props.size}px`;
  }};
  font-weight: 700;
  line-height: 50px;
  text-align: center;
`;
const Info = styled.div`
  padding-left: 150px;
  font-size: ${(props) => {
    return props.size;
  }};
  font-weight: 700;
  line-height: 50px;
`;
export default Home;
