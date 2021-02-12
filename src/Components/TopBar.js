import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Link, Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle, VpnKey } from '@material-ui/icons';
import { googleAuthUrl } from '../config'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
  height: '48px',
  width: '48px',
  float: 'right',
  borderRadius: '50%',
}

}));

function TopBar({ user, isAuthenticated, handleLogout }) {
  const classes = useStyles();
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            paws for pals
          </Typography>
          {isAuthenticated ? (
            <div>
              {user.photo ? (
                <img
                  className={classes.avatar}
                  src={user.photo}
                  alt={'avatar'}
                  onClick={handleMenu}
                />
              ) : (
                <IconButton
                  aria-label='account'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              )}
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link href={googleAuthUrl} color='inherit'>
              <IconButton
                aria-label='account'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <VpnKey />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default TopBar;
