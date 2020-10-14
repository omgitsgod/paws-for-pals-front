import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Icon, IconButton, MenuItem, Menu, Button, Drawer, List, ListItemText, Divider, ListItem, ListItemIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import { Home, AccountBalance, LineWeight, ThumbsUpDown, Chat, LockOpen, Create, Star, Search, CreditCard, HowToVote, Event, People, AccountCircle } from '@material-ui/icons'


function NavDrawer (props) {
  const { toggleDrawer, drawerStatus, classes } = props;

  return (
    <Drawer open={drawerStatus} onClose={toggleDrawer(false)}>
      <div
        tabIndex={0}
        role='button'
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
          <div >
            <ListItem button>
              <ListItemIcon
               
                onClick={toggleDrawer(true)}
                aria-label='Menu'
              >
                <MenuIcon />
              </ListItemIcon>
              <ListItemText primary='paws for pals' />
            </ListItem>
            <Divider />
            <Divider />
            <List>
                <ListItem button>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary='Home' />
                </ListItem>
             
            </List>
          </div>
      </div>
    </Drawer>
  );
}

export default NavDrawer;