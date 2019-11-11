import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import './../styles/modal.css';
import StepOneSendPropuesta from './StepOneSendPropuesta';
import StepTwoSendPropuesta from './StepTwoSendPropuesta';
import SendProposal from './SendProposal';
import PropoMyProposals from '../Pages/ProposerMyProposals';
import { thisExpression } from '@babel/types';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

class FrmSendPropuesta extends React.Component {
    constructor(){
      super();
      this.state={
        msgDialog: "",
        steps:['Autores', 'Información'],
        currentstep:0,
        step1:StepOneSendPropuesta,
        step2:StepTwoSendPropuesta,
        Propuesta: null,
        /* step 1 */
        authorName: "",
        authorLastname: "",
        telefono: "",
        email: "",
        academicLevel: "",
        /* step 2 */
        actividad: "",
        resumen: "",
        categorias: [],
        archivo: null,
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    
      this.handleValue=this.handleValue.bind(this);
    
    }
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
/********************************************************** */
    handleClickCrearActualizar = () => { 
      this.handleNextChildComponentChange("");
    }

    componentWillMount(){
        console.log("FrmSendPropuesta:",this.props);
    }

   componentDidMount(){
        /**desabilitar y desaparecer el finish */
      //document.getElementById("button_finish").disabled = true;
      document.getElementById("button_finish").style.display = "none";
   }
   
   shouldComponentUpdate(nextProps, nextState){
      if(this.state.currentstep != nextState.currentstep){
         return true;
      }
      return false;
   }
  
  
    handleClick2 = () => {
        console.log('redireccionando a ... update evento');
    }
    /******************************************************* */
    handleNext = () => {
      this.setState({currentstep:1});
      /** desaparezco el button sig y reaparece finish */
      document.getElementById("button_next").style.display = "none";
      document.getElementById("button_finish").style.display = "block";
    };
  
    handleBack = () => {
      if(this.state===0){
        this.handleNextChildComponentChange(SendProposal);
        return;
      }
      this.setState({currentstep:0});
      /** desaparezco el button finish y reaparece next */
      document.getElementById("button_next").style.display = "block";
      document.getElementById("button_finish").style.display = "none";
    };

    handleFinish = () =>{
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      console.log("final",this.state);
      /********aqui debo enviar******** */
      /**************luego redireccionar************ */
      //this.handleNextChildComponentChange(PropoMyProposals);
    }
/**************************************** */
    handle_redirect =() =>{
      document.getElementById("myModal").style.display = "none";
      console.log("redireccion del buton ok");
    }
    
    handleValue(value){ 
      console.log("Handle_input",value.to,value.value);
      /* dropbox select */
      if(value.to =='categorias'){
        console.log("Categoria concatenada:",value.value);
        this.state.categorias.push(value.value);
        
        return;
      }
      /** input */
      this.state[value.to] = value.value;
    }

    
    renderStep(i){
      switch (i) {
        case 0:
          return <this.state.step1 
                  multiHandle={this.handleValue}
                />;
        case 1:        
          return <this.state.step2 
                  Categorias={this.props.nextChildComponentProps.Categorias}
                  multiHandle={this.handleValue}
                />;
        default:
          return 'Uknown stepIndex';
      }
    }
    changeMsgDialog(_msg){
      this.setState({msgDialog:_msg});
    }
    render() {
        console.log("rendering frmSendPropuesta");
        return (
           <div style={styles.frmCreateEvent}>
             <h1>Registro de Propuesta para el _Evento_</h1>
                <div style={{alignItems: "center"}}
                      class=" mx-auto" style={{width:"700px"}}
                >
                <Stepper 
                    activeStep={this.state.currentstep} alternativeLabel>
                    {this.state.steps.map(label => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                  ))}
                </Stepper>
                    {this.renderStep(this.state.currentstep)}
                    <div>
                      <button  
                          id="button_back"
                          style={{float:'left'}}
                          class="mybutton"
                          onClick={this.handleBack}
                      >
                        Regresar
                      </button>

                      <button  
                            id="button_finish"
                            style={{float:'right'}} 
                            class="mybutton" 
                            color="primary" 
                            onClick={this.handleFinish}>
                      Finalizar
                      </button>
                      </div>
                        <div>
                      <button  
                            id="button_next"
                            style={{float:'right'}} 
                            class="mybutton"  
                            variant="contained" 
                            color="primary" 
                            onClick={this.handleNext}>
                      Siguiente
                      </button>
                    </div>


                </div>

                <div class="container">
                  <div id="myModal" class="modal" style={{width: "50px"},{align: "center"}}>
                      <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>{this.state.msgDialog}</p>
                        <button  style={{float:'right'}}
                        class="mybutton"  
                        variant="contained" 
                        color="primary" 
                        onClick={this.handle_redirect}>OK</button>
                    </div>
                  </div>
                </div>

           </div>
        )
    }
}

export default FrmSendPropuesta;  //exporting a component make it reusable and this is the beauty of react

var styles = {
    frmCreateEvent:{
      paddintTop: 20,
      paddingBottom: 120,
      paddingLeft: 50,
    
        width: '90%',
    }
  }
  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }