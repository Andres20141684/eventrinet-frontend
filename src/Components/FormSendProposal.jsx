import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import StepOneSendProp from './StepOneSendProp';
import StepTwoSendProp from './StepTwoSendProp'
//import ModalDialog from './CreateEvent/ModalDialog'

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
      alert("Se ha enviado la propuesta!")
      //elaizar servicio para guardar propuesta
      
  }
  return (
    <div className={classes.root} style={styles.frmCreateEvent}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep == steps.length - 1 ? (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep,props)}</Typography>
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
            <Typography className={classes.instructions}>{getStepContent(activeStep,props)}</Typography>
            <div>
              <button  style={{float:'right'}} class="mybutton"  variant="contained" color="primary" onClick={handleNext}>
              Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

var styles = {
  frmCreateEvent:{
    paddintTop: 20,
    paddingBottom: 20,
    paddingLeft: 50
  }
}