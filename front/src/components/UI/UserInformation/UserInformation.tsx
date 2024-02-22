import React from 'react';
import { Typography, Grid, Avatar } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import CheckIcon from '@mui/icons-material/Check';

const UserInformation = () => {
  const user = useAppSelector(selectUser);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  let avatarImage;
  if (user) {
    avatarImage = 'http://localhost:8000' + '/images/' + user.image;
  }
  return (
    <>
      {user && (
        <Grid container spacing={2} justifyContent="center" mt={3} mb={3}>
          <Grid item xs={12} md={4} textAlign="center">
            <Avatar alt="User Image" src={avatarImage} sx={{width: 300, height: 300, marginBottom: 2}}/>
          </Grid>
          <Grid item xs={12} md={4} textAlign="left" style={{backgroundColor: 'aliceblue'}}>
            <Typography variant="h4" mt={3} mb={3}>User information</Typography>
            <Typography variant="h6">First name: {user.firstName}</Typography>
            <Typography variant="h6">Last name: {user.lastName}</Typography>
            <Typography variant="h6">Middle name: {user.middleName}</Typography>
            <Typography variant="h6">Login:{user.userLogin}</Typography>
            <Typography variant="h6">Birthdate: {formatDate(user.birthYear)}</Typography>
            <Typography variant="h6">Phone Number: {user.phoneNumber}</Typography>
            {user.statusUser ? (
              <Typography variant="h6" style={{color: 'green'}}>
                Authorizated <CheckIcon/>
              </Typography>
            ) : (
              <Typography variant="h6" style={{color: 'red'}}>Unauthorizate</Typography>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserInformation;



