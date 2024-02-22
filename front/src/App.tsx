import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/UI/Header/Header';
import Questions from './features/questions/Questions';
import OneQuestion from './features/questions/OneQuestion';
import Register from './features/users/Register';
import Login from './features/users/Login';
import UserPage from './features/users/UserPage';
import UserQuestions from './features/questions/UserQuestions';
import AdminPanel from './features/admin/AdminPanel';
import DetailUserInformation from './features/admin/DetailUserInformation';

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
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/user-information/:id" element={<DetailUserInformation />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
