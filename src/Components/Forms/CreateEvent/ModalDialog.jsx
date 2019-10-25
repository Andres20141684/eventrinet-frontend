import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function ModalSave(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      props.handlePrint();
      setOpen(false);
    };


  
    return (
      <div>
        <button style={{float:'right'}} class="mybutton" onClick={handleClickOpen}>Guardar</button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          disableBackdropClick={true}
        >
          <DialogTitle id="responsive-dialog-title">{"Esta seguro de guardar"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <h2>La informacion ingresada sera registrada como un nuevo evento</h2>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose} color="primary">
              Rechazar
            </button>
            <button onClick={handleSave} color="primary" autoFocus>
              Aceptar
            </button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }