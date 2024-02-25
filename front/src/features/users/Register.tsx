import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useFetcher, useNavigate } from 'react-router-dom';
import { RegisterMutation } from '../../types';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLogin, selectRegisterLoading, selectRegisterError } from './usersSlice';
import { fetchUserLogin, register } from './usersThunk';
import FileInput from '../../components/UI/FileInput/FileInput';

const Register = () => {
  const [state, setState] = useState<RegisterMutation>({
    firstName: '',
    lastName: '',
    middleName: '',
    birthYear: '',
    image: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    userLogin: ''
  });
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const error = useAppSelector(selectRegisterError);
  const loginCheck = useAppSelector(selectLogin);
  const loading = useAppSelector(selectRegisterLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

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

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (state.password !== state.passwordConfirm) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
        await dispatch(register(state)).unwrap();
        navigate('/');
      } catch (e) {  
        //шмашибка
      }
  };


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
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
            <Grid item xs={12}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required
                name="password"
                value={state.password}
                onChange={inputChangeHandler}
              />
              {error && <Typography color="error">{getFieldError('password')}</Typography>}
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="outlined-adornment-password">Confirm password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm password"
                required
                name="passwordConfirm"
                value={state.passwordConfirm}
                onChange={inputChangeHandler}
              />
              {error && <Typography color="error">{getFieldError('passwordConfirm')}</Typography>}
            </Grid>
          </Grid>
          {passwordError && (
            <Grid item xs={12}>
              <Typography color="error">{passwordError}</Typography>
            </Grid>
          )}
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
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

}


export default Register;