import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ListPage = ({ resetTranscript, finalTranscript, size }) => {
  let today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  /** 문자열 자르고 년월일 형태로 리턴하는 함수 */
  const cutting = (str) => {
    let year = str.substring(0, 4);
    let month = str.substring(4, 6);
    let date = str.substring(6, 8);

    return `${year}년 ${month}월 ${date}일`;
  };

  /** 로컬스토리지의 key값(날짜)를 list에 할당 */
  const listRender = () => {
    let temp = [];
    let i = 0;
    for (let key in localStorage) {
      if (i == localStorage.length) {
        temp.sort();
        setList([...temp]);
        break;
      }
      if (month == Number(key.substring(4, 6))) {
        temp.push(cutting(key));
      }
      i++;
    }
  };

  /** 달 변경시 새로 렌더링 */
  useEffect(() => {
    listRender();
  }, [month]);

  /** STT 필터링, 해당 날짜 불러오거나 다음, 이전 입력시 달 변경 */
  useEffect(() => {
    let temp = finalTranscript.replace(/\년+|\월+|\일/g, "");
    let year = temp.substring(0, 4);
    let month = temp.substring(5, 7).replace(/\s/g, "");
    let date = temp.substring(7).replace(/\s/g, "");
    if (Number(month) < 10) {
      month = `0${month}`;
    }
    if (Number(date) < 10) {
      date = `0${date}`;
    }
    temp = `${year}${month}${date}`;
    if (localStorage.getItem(temp)) {
      setDate([...finalTranscript]);
      setContent([...localStorage.getItem(temp)]);
      resetTranscript();
      return;
    }
    if (finalTranscript == "다음") {
      datePlus();
      resetTranscript();
      return;
    }
    if (finalTranscript == "이전") {
      dateMinus();
      resetTranscript();
      return;
    }
    resetTranscript();
  }, [finalTranscript]);

  /** 날짜 증가 함수 */
  const datePlus = () => {
    if (month == 12) {
      setYear((prev) => prev + 1);
      setMonth(1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  /** 날짜 감소 함수 */
  const dateMinus = () => {
    if (month == 1) {
      setYear((prev) => prev - 1);
      setMonth(12);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  /** 해당날짜의 일기 내용 불러오는 함수 */
  const callDiaryContent = (date) => {
    let tempDate = date.replace(/\s+|\년+|\월+|\일/g, "");
    let tempContent = localStorage.getItem(tempDate);
    setDate([...date]);
    setContent([...tempContent]);
  };

  return (
    <Container>
      <SideBar>
        <DateWrapper size={size}>
          <Button
            onClick={() => {
              dateMinus();
            }}
          >
            {" "}
            {"<"}{" "}
          </Button>
          {`${year}년 ${month}월`}
          <Button
            onClick={() => {
              datePlus();
            }}
          >
            {" "}
            {">"}{" "}
          </Button>
        </DateWrapper>
        {list.map((i) => {
          return (
            <List size={size} key={i} onClick={() => callDiaryContent(i)}>
              {i}
            </List>
          );
        })}
      </SideBar>
      <DiaryContent size={size}>
        <DiaryDate size={size}>{date}</DiaryDate>
        {content}
      </DiaryContent>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;
const SideBar = styled.div`
  padding-top: 10px;
  box-sizing: border-box;
  position: fixed;
  width: 350px;
  border-right: 5px solid rgb(135, 231, 176);
  height: 100vh;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => {
    return `${props.size}px`;
  }};
  font-weight: 700;
`;
const Button = styled.button`
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  background-color: #ffffff;
  font-size: 30px;
  font-weight: 900;
  cursor: pointer;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
  font-weight: 500;
  font-size: ${(props) => {
    return `${props.size}px`;
  }};
`;

const DiaryContent = styled.div`
  padding-top: 20px;
  padding-left: 370px;
  font-size: ${(props) => {
    return `${props.size}px`;
  }};
`;

const DiaryDate = styled.div`
  margin-bottom: 15px;
  font-size: ${(props) => {
    return `${props.size + 5}px`;
  }};
  font-weight: 700;
`;

export default ListPage;
