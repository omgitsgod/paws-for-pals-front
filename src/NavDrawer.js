import React from 'react';
import { Drawer, List, ListItemText, Divider, ListItem, ListItemIcon } from '@material-ui/core';
import { Home, Close as CloseIcon } from '@material-ui/icons';


function NavDrawer (props) {
  const { toggleDrawer, drawerStatus } = props;

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
                <CloseIcon />
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