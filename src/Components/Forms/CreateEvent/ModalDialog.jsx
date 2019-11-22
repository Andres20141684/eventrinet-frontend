import React, { Component }  from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import OrganActiveEvents from '../../../Pages/OrganActiveEvents.jsx';
import PresiAsignarEvalEvents from '../../../Pages/PresiAsignarEvalEvents.jsx';

const Networking = require('../../../Network/Networking.js') ;

class ModalDialog extends Component{
    constructor(props){
      super(props);
      this.state={
        open:false,
        data:null,
        succeed:''
      }
      this.handleClickOpen=this.handleClickOpen.bind(this)
      this.handleClose=this.handleClose.bind(this)
      this.handleSave=this.handleSave.bind(this)
      this.handleExit=this.handleExit.bind(this)
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this)
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

    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);

    }

    handleExit(){
      if(this.props.rol===0){ //Si es organizador
        this.handleNextChildComponentChange(OrganActiveEvents);
      }
      else if (this.props.rol === 1){ //Si es presidente
        this.handleNextChildComponentChange(PresiAsignarEvalEvents);
      }
      
    }
    render(){
      return (
        <div>
          <button style={{float:'right'}} class="mybutton" onClick={this.handleClickOpen}>Guardar</button>
          <Dialog
            component={'span'}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            disableBackdropClick={true}
          >
            <div>
              {this.state.succeed===''? 
              <div>
              <DialogContent component={'span'}>
                <DialogContentText>
                  <h2>Está seguro de guardar?</h2>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button type="button"  onClick={this.handleClose}  className="btn btn-secondary">Cerrar</button>
                <button type="button" onClick={this.handleSave} className="btn btn-primary"  autoFocus>Aceptar</button>
              </DialogActions>
              </div>
              :
              <div>
                {this.state.succeed==='wait'?
                <div>
                  <DialogContent component={'span'}>
                    <div class='col-md-4'></div>
                    <div class='col-md-4'>
                      <Fade
                      in={this.state.succeed === 'wait'}
                      style={{
                        transitionDelay: this.state.succeed === 'wait' ? '800ms' : '0ms',
                      }}
                      unmountOnExit
                      >
                      <CircularProgress />
                      </Fade>
                    </div>
                    <div class='col-md-4'></div>
                      <DialogContentText>
                          <h2>Procesando...</h2>
                        </DialogContentText>
                  </DialogContent>

                </div>
                :
                <div>
                  {this.state.succeed===true?
                    <div>
                      <DialogContent>
                        <DialogContentText>
                          <h2>La transacción fue exitosa</h2>
                        </DialogContentText>
                      </DialogContent>
                    </div>
                    :
                    <div>
                      <DialogContent>
                        <DialogContentText>
                          <h2>La transacción falló</h2>
                        </DialogContentText>
                      </DialogContent>
                    </div>
                    }
                    <DialogActions>
                      <button onClick={this.handleExit} color="primary"  className="btn btn-primary" autoFocus>
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
