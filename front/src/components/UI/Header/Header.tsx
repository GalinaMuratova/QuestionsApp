import React from 'react';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const Header = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <div style={{paddingTop: '7px', paddingRight: '4px'}}>
          <DeviceUnknownIcon/>
        </div>
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <Link to="/">Question forum</Link>
        </Typography>
        <Grid item> <AnonymousMenu/></Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;