import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ListPage = () => {
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

    return `${year}${month}${date}`;
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

  useEffect(() => {
    listRender();
  }, [month]);

  useEffect(() => {
    let month = "";
    let date = "";
    if (Number(today.getMonth() + 1) < 10) {
      month = `0${today.getMonth() + 1}`;
    }
    if (Number(today.getDate()) < 10) {
      date = `0${today.getDate()}`;
    }

    callDiaryContent(`${year}${month}${date}`);
  }, []);

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
    let tempDate = `${date.substring(0, 4)}년 ${Number(
      date.substring(4, 6)
    )}월 ${Number(date.substring(6, 8))}일`;
    let tempContent = localStorage.getItem(date);

    setDate([...tempDate]);
    setContent([...tempContent]);
  };

  return (
    <Container>
      <SideBar>
        <DateWrapper>
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
            <List key={i} onClick={() => callDiaryContent(i)}>
              {`${i.substring(0, 4)}년 ${Number(i.substring(4, 6))}월 ${Number(
                i.substring(6, 8)
              )}일`}
            </List>
          );
        })}
      </SideBar>
      <DiaryContent>
        <DiaryDate>{date}</DiaryDate>
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
  width: 250px;
  border-right: 5px solid rgb(135, 231, 176);
  height: 100vh;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
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
`;

const DiaryContent = styled.div`
  padding-top: 20px;
  padding-left: 270px;
  font-size: 20px;
`;

const DiaryDate = styled.div`
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: 700;
`;

export default ListPage;
