import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSpeechRecognition } from "react-speech-kit";
import { Configuration, OpenAIApi } from "openai";
import { useCallback } from "react";

const WirtePage = () => {
  const [soundText, setSoundText] = useState("");
  const [diaryText, setDiaryText] = useState("");
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setDiaryText((prev) => prev + result + " ");
      console.log(result);
    },
  });

  const navigate = useNavigate();

  const save = () => {
    if (Number(month) < 10) {
      month = `0${month}`;
    }
    if (Number(date) < 10) {
      date = `0${date}`;
    }
    localStorage.setItem(`${year}${month}${date}`, diaryText);
  };

  const saveHandler = () => {
    save();
    navigate("/list");
    console.log("?");
  };

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = today.getDay();
  let dayList = ["일", "월", "화", "수", "목", "금", "토"];

  const fetchOpenApi = useCallback((diaryText) => {
    const configuration = new Configuration({
      apiKey: "여기에 api key 값",
    });
    console.log(diaryText);

    new OpenAIApi(configuration)
      .createCompletion({
        model: "text-davinci-003",
        prompt: `correct this to standard Korean: ${diaryText}`,
        temperature: 0,
        max_tokens: 4000,
      })
      .then((res) => {
        const { data } = res;
        console.log("되고있는거여?");
        console.log(diaryText);
        setDiaryText(data.choices[0].text.substring(2));
        console.log(data.choices[0].text);
      });
  }, []);

  useEffect(() => {
    console.log(diaryText);
  }, [diaryText]);

  return (
    <Container>
      <Title>일기 작성</Title>
      <Today>
        {year} 년 {month} 월 {date} 일 {dayList[day]}요일
      </Today>
      <Textarea
        value={diaryText}
        onFocus={() => listen({ interimResults: false, lang: "ko-KR" })}
        onBlur={() => stop()}
        onChange={(e) => setDiaryText(e.target.value)}
      />
      <ButtonWrapper>
        <Button onClick={() => fetchOpenApi(diaryText)}>변환하기</Button>
        <Button onClick={() => saveHandler()}>저장하기</Button>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 30px;
  padding-bottom: 100px;
`;

const Title = styled.div`
  margin-bottom: 30px;
  padding-left: 100px;
  font-size: 30px;
  font-weight: 700;
`;

const Today = styled.div`
  padding-left: 100px;
`;

const Textarea = styled.textarea`
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 700px;
  height: 700px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  border: none;
  border: 3px solid rgb(127, 135, 143);
  border-radius: 4px;
  font-size: 20px;
`;
const ButtonWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 20px;
  width: 700px;
  display: flex;
  gap: 50px;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  background-color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  background-color: rgb(135, 231, 176);
  border-radius: 3px;
`;

export default WirtePage;
