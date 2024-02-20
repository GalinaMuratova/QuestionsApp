import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { IUser } from '../../../types';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <MenuItem>Admin panel</MenuItem>
            <MenuItem>Add question</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem>Logout</MenuItem>
        </>
        ) : (
            <>
                <MenuItem>My questions</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
            </>
            )}
      </Menu>
    </>
  );
};



export default UserMenu;