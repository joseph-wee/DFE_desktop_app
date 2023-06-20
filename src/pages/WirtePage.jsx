import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Configuration, OpenAIApi } from "openai";
import { useCallback } from "react";

const WirtePage = ({
  diaryText,
  setDiaryText,
  finalTranscript,
  resetTranscript,
  size,
}) => {
  const navigate = useNavigate();

  /** 저장기능 */
  const save = () => {
    if (Number(month) < 10) {
      month = `0${month}`;
    }
    if (Number(date) < 10) {
      date = `0${date}`;
    }
    localStorage.setItem(`${year}${month}${date}`, diaryText);
  };

  /** 저장 플로우 */
  const saveHandler = () => {
    save();
    setDiaryText("");
    navigate("/list");
  };

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = today.getDay();
  let dayList = ["일", "월", "화", "수", "목", "금", "토"];

  /** text-davinci-003모델 api */
  const fetchOpenApi = useCallback((diaryText) => {
    const configuration = new Configuration({
      apiKey: "여기에 API KEY값",
    });

    new OpenAIApi(configuration)
      .createCompletion({
        model: "text-davinci-003",
        prompt: `correct this to standard Korean: ${diaryText}`,
        temperature: 0,
        max_tokens: 4000,
      })
      .then((res) => {
        const { data } = res;
        setDiaryText(data.choices[0].text.substring(2));
      });
  }, []);

  /** STT 필터링 */
  useEffect(() => {
    if (finalTranscript == "변환하기") {
      fetchOpenApi(diaryText);
      return;
    }
    if (finalTranscript == "저장하기") {
      saveHandler();
      return;
    }
    if (finalTranscript) {
      if (finalTranscript == "글씨 크게") {
        resetTranscript();
        return;
      }
      if (finalTranscript == "글씨 작게") {
        resetTranscript();
        return;
      }
      setDiaryText((prev) => prev + finalTranscript + " ");
      resetTranscript();
      return;
    }
  }, [finalTranscript]);

  /** 페이지 렌더링시 diaryText 초기화 */
  useEffect(() => {
    setDiaryText("");
  }, []);

  return (
    <Container>
      <Title size={size}>일기 작성</Title>
      <Today size={size}>
        {year} 년 {month} 월 {date} 일 {dayList[day]}요일
      </Today>
      <Textarea
        size={size}
        value={diaryText}
        onChange={(e) => setDiaryText(e.target.value)}
        autoFocus
      />
      <ButtonWrapper>
        <Button size={size} onClick={() => fetchOpenApi(diaryText)}>
          변환하기
        </Button>
        <Button size={size} onClick={() => saveHandler()}>
          저장하기
        </Button>
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
  font-size: ${(props) => {
    return `${props.size + 5}px`;
  }};
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
  font-size: ${(props) => {
    return `${props.size}px`;
  }};
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
  font-size: ${(props) => {
    return `${props.size}px`;
  }};
  font-weight: 700;
  cursor: pointer;
  background-color: rgb(135, 231, 176);
  border-radius: 3px;
`;

export default WirtePage;
