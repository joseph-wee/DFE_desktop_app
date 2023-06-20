import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import { GlobalNavBottomBar, GlobalNavTopBar } from './components';
import { HomePage, ListPage, WirtePage } from './pages';
import { Route, BrowserRouter, Routes, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import SpeechRecognition from 'react-speech-recognition';

function App() {
  const [diaryText, setDiaryText] = useState("")
  const [path, setPath] = useState("")
  const [size, setSize] = useState(15)

  const {
    transcript,
    interimTranscript,
    resetTranscript,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()


  /** STT 필터링 */
  useEffect(() => {
    if (finalTranscript == "글씨 크게") {
      setSize((prev) => prev + 5)
      resetTranscript()
      return;
    }
    if (finalTranscript == "글씨 작게") {
      setSize((prev) => prev - 5)
      resetTranscript()
      return;
    }

    if (finalTranscript == "일기 작성") {
      setPath("/write")
      resetTranscript()
      return;
    }
    if (finalTranscript == "일기 목록") {
      setPath("/list")
      resetTranscript()
      return;
    }
    if (finalTranscript == "홈페이지") {
      setPath("/")
      resetTranscript()
      return;
    }
    resetTranscript()
  }, [finalTranscript])

  useEffect(() => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'ko-KR'
    })
  }, [])


  return (
    <Container >
      <BrowserRouter>
        <GlobalNavTopBar path={path} size={size} />
        <Routes>
          <Route path="/" element={<HomePage size={size} />} />
          <Route path="/list" element={<ListPage resetTranscript={resetTranscript} finalTranscript={finalTranscript} size={size} />} />
          <Route path="/write" element={<WirtePage diaryText={diaryText} setDiaryText={setDiaryText} finalTranscript={finalTranscript} resetTranscript={resetTranscript} size={size} />} />
        </Routes>
      </BrowserRouter>
      <GlobalNavBottomBar size={size} setSize={setSize} />
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 900px;
`

export default App;
