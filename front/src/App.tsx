import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Questions from './features/questions/Questions';

const App = () => {
  return (
    <>
      <CssBaseline/>
      <header>
        <Header/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Questions/>} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
