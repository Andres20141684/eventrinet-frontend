import React, { Component }  from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
//import OrganActiveEvents from '../../../Pages/OrganActiveEvents.jsx';
//const Networking = require('../../../Network/Networking.js') ;

class ModalLoader extends Component{
    constructor(props){
      super(props);
      this.state={
        open:false
      }
      this.handleClickOpen=this.handleClickOpen.bind(this)
      this.handleClose=this.handleClose.bind(this)
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      
    }
    
    handleClickOpen(){
      this.props.handlePrint();
      this.setState({open:true})   
    }
  
    handleClose () {
      this.setState({open:false})  
    }
  
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }

    render(){
      debugger;
      return (
        <Dialog 
            open = {this.state.open}
            onClose={this.handleClose}
            aria-labelledby="responsive-dialog-title"
            disableBackdropClick={true}> 
            <DialogContent>
                <DialogContentText><p>Cargando...</p></DialogContentText>
            </DialogContent>
        </Dialog>
      );
    }
    
  }

  export default ModalLoader;