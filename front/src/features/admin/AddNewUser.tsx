import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box, Button, CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FileInput from '../../components/UI/FileInput/FileInput';
import { useNavigate } from 'react-router-dom';
import { RegisterAdminMutation } from '../../types';
import { createUser, fetchAllUsers, fetchUserLogin } from '../users/usersThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCreateError, selectCreateLoading, selectLogin, selectUser } from '../users/usersSlice';

const AddNewUser = () => {
  const [state, setState] = useState<RegisterAdminMutation>({
    firstName: '',
    lastName: '',
    middleName: '',
    birthYear: '',
    image: '',
    phoneNumber: '',
    userLogin: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const user = useAppSelector(selectUser);
  const loginCheck = useAppSelector(selectLogin);
  const loading = useAppSelector(selectCreateLoading);
  const error = useAppSelector(selectCreateError);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
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

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createUser(state)).unwrap();
      navigate('/admin-panel');
      await dispatch(fetchAllUsers());
    } catch (e) {
      //шмашибка
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const filesInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
      setImagePreview(imageUrl);
    }
  };

  const getFieldError = (name: string) => {
    try {
      if (error) {
        if ('errors' in error) {
          return error.errors[name]?.message;
        } else {
          return undefined;
        }
      }
    } catch {
      return undefined;
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create new user
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
                {error && <Typography color="error">{getFieldError('firstName')}</Typography>}
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
                {error && <Typography color="error">{getFieldError('lastName')}</Typography>}
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
                {error && <Typography color="error">{getFieldError('middleName')}</Typography>}
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
                {error && <Typography color="error">{getFieldError('phoneNumber')}</Typography>}
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
                {error && <Typography color="error">{getFieldError('birthYear')}</Typography>}
              </Grid>
              <Grid item xs={12}>
                <FileInput onChange={filesInputChangeHandler} name="image" label="image" />
                {error && <Typography color="error">{getFieldError('image')}</Typography>}
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
              {loading ? <CircularProgress size={24} /> : 'Create new user'}
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddNewUser;