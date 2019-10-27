import React, { Component }  from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
const Networking = require('../../../Network/Networking.js') ;

class ModalDialog extends Component{
    constructor(){
      super();
      this.state={
        open:false,
        data:null,
        succeed:''
      }
      this.handleClickOpen=this.handleClickOpen.bind(this)
      this.handleClose=this.handleClose.bind(this)
      this.handleSave=this.handleSave.bind(this)
      this.handleExit=this.handleExit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      if(this.state.data!==nextProps.datajson){
        this.setState({data:nextProps.datajson})
      }
    }
    
    handleClickOpen(){
      this.props.handlePrint();
      this.setState({open:true})   
    }
  
    handleClose () {
      this.setState({open:false})  
    }

    handleSave () {
      this.setState({succeed:'wait'})
      Networking.insertNewEvent(this.state.data).then(
        (response)=>{
          this.setState({succeed:response.succeed})
          console.log(response);
        })
        .catch( (err) =>{
          console.log("error en conexión");
          console.log(err);
        })
    }

    handleExit(){
      window.location.assign("/organActiveEvents");
    }
    render(){
      return (
        <div>
          <button style={{float:'right'}} class="mybutton" onClick={this.handleClickOpen}>Guardar</button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            disableBackdropClick={true}
          >
            <div>
              {this.state.succeed===''?
              <div>
              <DialogContent>
                <DialogContentText>
                  <h2>Esta seguro de guardar</h2>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button onClick={this.handleClose} color="primary">
                  Rechazar
                </button>
                <button onClick={this.handleSave} color="primary" autoFocus>
                  Aceptar
                </button>
              </DialogActions>  
              </div>
              :
              <div>
                {this.state.succeed==='wait'?
                <div>
                  <DialogContent>
                    <Fade
                      in={this.state.succeed === 'wait'}
                      style={{
                        transitionDelay: this.state.succeed === 'wait' ? '800ms' : '0ms',
                      }}
                      unmountOnExit
                      >
                      <CircularProgress />
                      </Fade>
                      <DialogContentText>
                          <h2>Procesando</h2>
                        </DialogContentText>
                  </DialogContent>
                  
                </div>
                :
                <div>
                  {this.state.succeed===true?
                    <div>
                      <DialogContent>
                        <DialogContentText>
                          <h2>La transaccion fue exitosa</h2>
                        </DialogContentText>
                      </DialogContent>
                    </div>
                    :
                    <div>
                      <DialogContent>
                        <DialogContentText>
                          <h2>La transaccion fallo</h2>
                        </DialogContentText>
                      </DialogContent>
                    </div>
                    }
                    <DialogActions>
                      <button onClick={this.handleExit} color="primary" autoFocus>
                        Aceptar
                      </button>
                    </DialogActions> 
                </div>
                }
              </div>
              }
            </div>

            
          </Dialog>
        </div>
      );
    }
    
  }

  export default ModalDialog;