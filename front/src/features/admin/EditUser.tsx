import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectDetailUser, selectEditUserLoading, selectLogin } from '../users/usersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { editUser, fetchAllUsers, fetchOneUser, fetchUserLogin } from '../users/usersThunk';
import { IUserMutation } from '../../types';
import { Avatar, Box, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import FileInput from '../../components/UI/FileInput/FileInput';

const EditUser = () => {
  const { id } = useParams();
  const user = useAppSelector(selectDetailUser);
  const loading = useAppSelector(selectEditUserLoading);
  const loginCheck = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>();
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthYear: '',
    image: '',
    phoneNumber: '',
    userLogin: '',
    _id: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchOneUser(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setState((prevState) => ({
        ...prevState,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        middleName: user.middleName || '',
        birthYear: user.birthYear ? new Date(user.birthYear).toISOString().split('T')[0] : '',
        image: user.image || '',
        phoneNumber: user.phoneNumber || '',
        userLogin: user.userLogin || '',
        _id: user._id || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (state.firstName && state.lastName) {
      generateLogin(state.firstName, state.lastName);
    }
  }, [state.firstName, state.lastName]);

  const generateLogin = async (firstName: string, lastName: string) => {
    let login = `${firstName.toLowerCase().charAt(0)}.${lastName.toLowerCase()}`;
    let counter = 1;
    const user = await checkLoginExists(login);
    if (user) {
      login = `${firstName.toLowerCase().charAt(0)}${firstName.toLowerCase().charAt(counter)}.${lastName.toLowerCase()}`;
      counter++;
    }
    setState(prevState => ({
      ...prevState,
      userLogin: login
    }));
  };

  const checkLoginExists = async (login: string) => {
    await dispatch(fetchUserLogin(login));
    if (loginCheck === null) {
      return false;
    }
    return loginCheck;
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      let idNew: string = '';
      if (typeof id === 'string') {
        idNew = id;
      }
      const userMutation: IUserMutation = {
        _id: idNew,
        firstName: state.firstName,
        lastName: state.lastName,
        middleName: state.middleName,
        phoneNumber: state.phoneNumber,
        birthYear: new Date(state.birthYear),
        userLogin: state.userLogin,
        image: file ? file : null,
      };
      await dispatch(editUser(userMutation));
      await dispatch(fetchAllUsers())
      navigate('/admin-panel')
    } catch (e) {
      //
    }
  };

  let avatarImage;
  if (user) {
    avatarImage = 'http://localhost:8000' + '/images/' + user.image;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} md={4} textAlign="center">
          <Avatar alt="User Image" src={avatarImage} sx={{ width:70, height: 70, marginBottom: 2 }} />
        </Grid>
        <Typography component="h1" variant="h5">
          Edit user
        </Typography>
        <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="FirstName"
                name="firstName"
                autoComplete="new-firstName"
                value={state.firstName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="lastName"
                label="lastName"
                autoComplete="new-lastName"
                value={state.lastName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="middleName"
                label="middleName"
                autoComplete="new-middleName"
                value={state.middleName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="phoneNumber"
                label="phoneNumber"
                autoComplete="new-phoneNumber"
                value={state.phoneNumber}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="birthYear"
                label="Birth Year"
                type="date"
                value={state.birthYear}
                onChange={inputChangeHandler}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FileInput onChange={onChangeFile} name="image" label="image" />
            </Grid>
          </Grid>
          <Grid item xs={12} mb={2} mt={2}>
            {state.userLogin && (
              <Box border={1} borderRadius={5} p={1} mb={2}>
                <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                  Remember your login:
                </Typography>
                <Typography variant="h6" align="center" color="primary" gutterBottom>
                  {state.userLogin}
                </Typography>
              </Box>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Edit user'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditUser;