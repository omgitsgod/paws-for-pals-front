import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import { Pets } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function SpeedDialMenu(props) {
  const { onClickActions, handleBackdrop } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const actions = [
    { icon: <Pets />, name: 'Cats', action: onClickActions },
    { icon: <Pets />, name: 'Dogs', action: onClickActions },
    ];

  const handleVisibility = () => {
    setHidden((prevHidden) => !prevHidden);
  };

  const handleOpen = () => {
    setOpen(true);
    handleBackdrop(true)
  };

  const handleClose = () => {
    setOpen(false);
    handleBackdrop(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel='Choose pet'
        className={classes.speedDial}
        hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={'up'}
        mr={-5}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              handleClose();
              action.action()}}
          />
        ))}
      </SpeedDial>
    </div>
  );
}

export default SpeedDialMenu;