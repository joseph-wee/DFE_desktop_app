import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalNavBottomBar, GlobalNavTopBar } from './components';
import { HomePage, ListPage, WirtePage } from './pages';

function App() {
  return (
    <Container>
      <BrowserRouter>
        <GlobalNavTopBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/write" element={<WirtePage />} />
        </Routes>
      </BrowserRouter>
      {/* <GlobalNavBottomBar /> */}
    </Container>
  );
}

const Container = styled.div`
  width: 900px;
`

export default App;
