import React, { useEffect } from 'react';
import { Typography, Grid, Avatar, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDetailUser, selectOneUserLoading } from '../users/usersSlice';
import { fetchOneUser } from '../users/usersThunk';

const DetailUserInformation = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectDetailUser);
  const loading = useAppSelector(selectOneUserLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneUser(id));
    }
  }, [dispatch, id]);

  const formatDate = (dateString: Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  let avatarImage;
  if (user) {
    avatarImage = 'http://localhost:8000' + '/images/' + user.image;
  }
  return (
    <>
      {loading? (
        <Grid item container justifyContent="center">
          <CircularProgress/>
        </Grid>
        ) : (
        <Grid container spacing={2} justifyContent="center" mt={3} mb={3}>
          <Grid item xs={12} md={4} textAlign="center">
            <Avatar alt="User Image" src={avatarImage} sx={{width: 300, height: 300, marginBottom: 2}}/>
          </Grid>
          <Grid item xs={12} md={4} textAlign="left" style={{backgroundColor: 'aliceblue', borderRadius: '8px'}}>
            <Typography variant="h5" mt={2} mb={2}>User information:</Typography>
            <Typography variant="h6">First name: {user?.firstName}</Typography>
            <Typography variant="h6">Last name: {user?.lastName}</Typography>
            <Typography variant="h6">Middle name: {user?.middleName}</Typography>
            <Typography variant="h6">Login: {user?.userLogin}</Typography>
            <Typography variant="h6">Birthdate: {formatDate(user?.birthYear)}</Typography>
            <Typography variant="h6">Phone Number: {user?.phoneNumber}</Typography>
            {user?.statusUser ? (
              <Typography variant="h6" style={{color: 'green'}}>
                Authorized <CheckIcon/>
              </Typography>
            ) : (
              <Typography variant="h6" style={{color: 'red'}}>Unauthorized</Typography>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default DetailUserInformation;
