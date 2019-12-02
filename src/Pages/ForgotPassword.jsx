import React, { Component } from 'react';
import '../styles/style_signUp.css'; 
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button';

const Networking = require('../Network/Networking');

const useStyles = makeStyles(theme => ({
  modal: { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    borderRadius:'2px',
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
    paddingBottom:'10px',
    paddingLeft:'30px',
    paddingRight:'30px',
    paddingTop:'10px'
  },
}));

function SModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  console.log("porps",props)
  const handleClose = () => {
    //console.log("porps",props)
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">{props.header}</h2>
            <p id="spring-modal-description">{props.body}</p>
            <div className="modal-footer" style={{paddingRight:"0px", paddingBottom:'0px'}}>
              <Button type="button" class="btn btn-secondary" onClick={() => handleClose() }>Cerrar</Button>
            </div>
          </div>
    
        </Fade>
      </Modal>
    </div>
  );
}

class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.state = {      
      val_usuario : null,
      msgError:''
    } 
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  }

  handleNextChildComponentChange(_nextChildComponent){
    console.log('cambiando', _nextChildComponent);
      this.props.onNextChildComponentChange(_nextChildComponent);
      
  }

  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }

  onChangeInputEmail = (evt) =>{
    this.setState({val_usuario: evt.target.value});
  }

  onSubmitForm = (evt) => {
    evt.preventDefault()
    
    Networking.cambiar_contrasena(this.state.val_usuario).then(
      (response) => {
        console.log("Intento de cambiar contraseña",response);
        if (response.succeed){
          console.log(response);
          let inputEmail = document.getElementById("your-email");
          inputEmail.value="";
          this.setState({msgError:""});
          alert(response.message)
        }else{
          let inputEmail = document.getElementById("your-email");
          inputEmail.value="";
          this.setState({redirect:false,
            isLoading:false,
            buttonLoadingText:"Iniciar sesión",
            msgError:response.error});
            try{
              document.getElementById('alertErrorForgotPassword').style.display ="block";
            }
            catch(err){
              console.log(err)
            }          
        }
      } 
    )
    
  }

  render(){
    return(
      <div>
        <div className="component-header"  width="300"  style={{paddingLeft:20}}>
          <a className="component-logo customizable chart" href='/' title="Volver a pagina principal">
              <img className="component-logo" src="logo.png"  width="240"/> 
          </a>
        </div>
        <div className="page-content">

          <div className="form-v5-content">
            <form className="form-detail"  type="post" onSubmit={this.onSubmitForm}>
              <h2>Cambiar contraseña</h2>
              
              <div className="form-row">
                <label> Nombre de usuario o dirección de correo electrónico</label>
                <input name="your-email" id="your-email" className="input-text" onChange={this.onChangeInputEmail} autoFocus maxLength="45"/>
                <i className="fa fa-envelope" style={{top:"48%"}}></i>
              </div>
              <div className="alert alert-danger" id="alertErrorForgotPassword" role="alert" style={{display:'none',padding:'8px',height:'auto',fontSize:'13px'}}>
                  {this.state.msgError}
              </div>
              <div className="form-row">
                <input type="submit" name="Iniciar sesion"className="btn btn-primary btn-block" value="Obtener una contraseña nueva "/>
              </div>                         
            </form>
                          
        </div>
        </div>    
      </div>
    )
  }
}


export default ForgotPassword;
