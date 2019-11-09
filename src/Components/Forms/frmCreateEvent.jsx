import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepOne from './CreateEvent/StepOne';
import Dialog from '@material-ui/core/Dialog';
import StepTwo from './CreateEvent/StepTwo'
import StepThree from './CreateEvent/StepThree'
import ModalDialog from './CreateEvent/ModalDialog'
import '../../styles/style_sheets.css'; 
import { fontSize } from '@material-ui/system';

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
  iconContainer: {
    transform: 'scale(2)',
  },
  alternativeLabel:{
    fontSize:'21px'
  }
}));

function getSteps() {
  return ['Datos Generales', 'Comites Responsables', 'Fases de Evaluacion'];
}
//handleChange={props.handleChange} nombre={props.nombre} apellido={props.apellido}
function getStepContent(stepIndex,props) {
  switch (stepIndex) {
    case 0:
      return <StepOne {...props}/>;
    case 1:
      return <StepTwo {...props}/>;
    case 2:
      return <StepThree {...props}/>;
    default:
      return 'Uknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  
  
  const handleNext = () => {
    window.scrollTo(0, 0);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root} style={styles.frmCreateEvent}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel classes={{iconContainer:classes.iconContainer,alternativeLabel: classes.alternativeLabel}}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div class=' form-group col-md-12'>
        {activeStep === steps.length - 1 ? (
          <div>
            <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep,props)}</Typography>
            <div class=' form-group col-md-12'>
              <div class='col-md-4'>
                  <button  
                  style={{float:'left'}}
                  class="mybutton"
                  onClick={props.handleCancel}
                >
                  Cancelar
                </button>
              </div>
              <div class='col-md-1'></div>
              <div class='col-md-2'>
                <button  
                style={{float:'rigth'}}
                class="mybutton"
                onClick={handleBack}
              >
                Regresar
              </button>
              </div>
              <div class='col-md-1'></div>
              <div class='col-md-4'>
                <ModalDialog {...props}/>
              </div>
              
            </div>
            
          </div>
        ) : (
          <div class= 'form-group  col-md-12'>
            <Typography component={'span'} className={classes.instructions}>{getStepContent(activeStep,props)}</Typography>
            <div class= 'form-group col-md-12'>
              <div class='col-md-4'>
                <button  
                style={{float:'left'}}
                class="mybutton"
                onClick={props.handleCancel}
              >
                Cancelar
              </button>
              </div>
              <div class='col-md-1'></div>
              <div class='col-md-2'>
                {activeStep===0?
                  null
                  :
                  <button  
                    style={{float:'right'}}
                    class="mybutton"
                    onClick={handleBack}
                  >
                    Regresar
                  </button>}
              </div>
              <div class='col-md-1'></div>
              <div class='col-md-4'>
                <button  style={{float:'right'}} class="mybutton"  variant="contained" color="primary" onClick={handleNext}>
                Siguiente
                </button>
              </div>
              
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
