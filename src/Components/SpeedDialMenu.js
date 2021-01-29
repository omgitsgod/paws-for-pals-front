import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { Pets, Tune } from '@material-ui/icons';
import CatIcon from '../CatIcon';
import DogIcon from '../DogIcon';

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

function SpeedDialMenu({ onClickActions }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const actions = [
    { icon: <Tune />, name: 'Options', action: onClickActions.changeOptions},
    { icon: <CatIcon />, name: 'Cats', action: onClickActions.getCats },
    { icon: <DogIcon />, name: 'Dogs', action: onClickActions.getDogs },
    ];
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel='Speeddial'
        className={classes.speedDial}
        hidden={hidden}
        icon={<Pets />}
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
            FabProps={{
              'aria-label': action.name
            }}
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
