import React, { useEffect, useState } from 'react';
import UserInformation from '../../components/UI/UserInformation/UserInformation';
import { Grid, Typography } from '@mui/material';
import PasswordReset from '../../components/UI/PasswordReset/PasswordReset';
import PhotoEdit from '../../components/UI/PhotoEdit/PhotoEdit';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './usersSlice';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [imageEditOpen, setImageEditOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handlePasswordClick = () => {
    setPasswordOpen(true);
    if (passwordOpen) {
      setPasswordOpen(false);
    }
  };

  const handleImageClick = () => {
    setImageEditOpen(true);
    if (imageEditOpen) {
      setImageEditOpen(false);
    }
  }

  return (
    <>
      <UserInformation/>
      <Grid container spacing={2} justifyContent="center" mt={3} mb={3}>
        <Grid item xs={12} md={4} mr={2} p={2} textAlign="center"
              style={{backgroundColor: '#ececec69', borderRadius: '8px'}}>
          <p onClick={handlePasswordClick} style={{cursor: 'pointer', marginBottom: '10px'}}>Password Reset</p>
          {passwordOpen && <PasswordReset/>}
        </Grid>
        <Grid item xs={12} md={4} p={2} textAlign="center" style={{backgroundColor: '#ececec69', borderRadius: '8px'}}>
          <p onClick={handleImageClick} style={{cursor: 'pointer'}}>Edit photo</p>
          {imageEditOpen && <PhotoEdit/>}
        </Grid>
      </Grid>

    </>
  );
};

export default UserPage;
