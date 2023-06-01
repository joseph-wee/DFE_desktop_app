import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalNavBar } from './components';
import { HomePage, ListPage, WirtePage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <GlobalNavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/write" element={<WirtePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
