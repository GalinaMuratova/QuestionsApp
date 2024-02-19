import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Questions from './features/questions/Questions';
import OneQuestion from './features/questions/OneQuestion';

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
            <Route path="/" element={<Questions/>}/>
            <Route path="/questions/:id" element={(<OneQuestion/>)}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
