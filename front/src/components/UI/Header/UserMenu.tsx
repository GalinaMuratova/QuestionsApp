import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { unsetUser } from '../../../features/users/usersSlice';
import { fetchQuestions } from '../../../features/questions/questionsThunk';
import { Link } from 'react-router-dom';
import { logout } from '../../../features/users/usersThunk';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    await dispatch(logout());
    await dispatch(unsetUser());
    await dispatch(fetchQuestions())
  };

  let avatarImage = 'http://localhost:8000' + '/images/' + user.image;

  return (
    <>
      <img
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          marginBottom: '-15px',
          objectFit: 'cover',
        }}
        src={avatarImage}
        alt={user.firstName}
      />
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.firstName}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user.role === 'admin' ? (
          <>
            <MenuItem component={Link} to="/admin-panel">Admin panel</MenuItem>
            <MenuItem component={Link} to="/my-questions">My questions</MenuItem>
            <MenuItem component={Link} to="/profile">My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/my-questions">My questions</MenuItem>
            <MenuItem component={Link} to="/profile">My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};


export default UserMenu;