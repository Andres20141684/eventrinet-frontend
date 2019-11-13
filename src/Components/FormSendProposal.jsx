import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import StepOneSendProp from './StepOneSendProp';
import StepTwoSendProp from './StepTwoSendProp'
import './../styles/modal.css';
import PropoMyProposals from '../Pages/ProposerMyProposals';
//import ModalDialog from './CreateEvent/ModalDialog'

const useStyles = makeStyles(theme => (
  {
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

function getSteps() {
  return ['Autores', 'Información'];
}
//handleChange={props.handleChange} nombre={props.nombre} apellido={props.apellido}
function getStepContent(stepIndex,props) {
  switch (stepIndex) {
    case 0:
      return <StepOneSendProp {...props}/>;
    case 1:        
      return <StepTwoSendProp {...props}/>;
    default:
      return 'Uknown stepIndex';
  }
}

export default function FormSendProposal(props) {
  
  console.log("FormSendProposal props:");
  console.log(props);
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  
  
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };


  const handleFinish = () =>{
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    console.log("final",props);
  }
  const handle_redirect =() =>{
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    props.onNextChildComponentChange(PropoMyProposals);
  }
  return (
    <div>
    <div className={classes.root} style={styles.frmCreateEvent}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{alignItems: "center"}}>
      <div class=" mx-auto" style={{width:"700px"}}>
        {activeStep === steps.length - 1 ? (
          <div>
            <Typography className={classes.instructions}>{
              getStepContent(activeStep,props)}</Typography>
            <button  
                style={{float:'left'}}
                class="mybutton"
                onClick={handleBack}
              >
                Regresar
              </button>

              <button  
                    style={{float:'right'}} 
                    class="mybutton" 
                    color="primary" 
                    onClick={handleFinish}>
              Finalizar
              </button>
            {/*<ModalDialog {...props}/>*/}
          </div>
        ) : (
          <div>
            <Typography 
            className={classes.instructions}>
              {getStepContent(activeStep,props)}
              </Typography>
            <div>
              <button  
                  style={{float:'right'}} 
                  class="mybutton"  
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext}>
              Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
      
    </div>
    <div class="container">
    <div id="myModal" class="modal" style={{width: "50px"},{align: "center"}}>
        <div class="modal-content">
          <span class="close">&times;</span>
          <p>Se ha enviado la propuesta</p>
          <button  style={{float:'right'}}
           class="mybutton"  
           variant="contained" 
           color="primary" 
           onClick={handle_redirect}>OK</button>
        </div>

    </div></div>
    </div>
  );
}

var styles = {
  frmCreateEvent:{
    paddintTop: 20,
    paddingBottom: 120,
    paddingLeft: 50
  }
}
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
}