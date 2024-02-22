import React, { useState } from 'react';
import { Button, Grid, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { resetPassword } from '../../../features/users/usersThunk';
import { clearMessage, selectMessage } from '../../../features/users/usersSlice';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const message = useAppSelector(selectMessage);
  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(resetPassword(password));
    setPassword('');
    setTimeout(() => {
      dispatch(clearMessage());
    }, 2000);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12} mb={2}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
          {message && (<p style={{fontWeight: 'bold', color: 'green'}}>{message}</p>)}
        </form>
      </Grid>
    </Grid>
  );
};

export default PasswordReset;
