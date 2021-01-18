import React from 'react';
import { Modal, Backdrop } from '@material-ui/core';
import OptionsModal from './OptionsModal';
import { withStyles } from '@material-ui/core/styles';

function ModalContainer(props) {
  const { classes, open, setOpen, setAnimal, setOptions, initialType, initialOptions } = props;

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <>
        <OptionsModal
          open={open}
          setOpen={setOpen}
          setOptions={setOptions}
          setAnimal={setAnimal}
          initialType={initialType}
          initialOptions={initialOptions}
        />
      </>
    </Modal>
  );
}

const styles = (theme) => ({
  modal: {
    height: '-200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});

export default withStyles(styles)(ModalContainer);
