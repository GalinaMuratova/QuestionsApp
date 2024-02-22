import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Questions from './features/questions/Questions';
import OneQuestion from './features/questions/OneQuestion';
import Register from './features/users/Register';
import Login from './features/users/Login';
import UserPage from './features/users/UserPage';
import UserQuestions from './features/users/UserQuestions';

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
            <Route path="/questions/:id" element={<OneQuestion/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<UserPage/>}/>
            <Route path="/my-questions" element={<UserQuestions />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
