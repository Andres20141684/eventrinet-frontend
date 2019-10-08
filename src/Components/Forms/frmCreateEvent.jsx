import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepOne from './CreateEvent/StepOne';
import StepTwo from './CreateEvent/StepTwo'
import StepThree from './CreateEvent/StepThree'
import '../../styles/style_sheets.css'; 

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
    {activeStep === steps.length - 1 ? props.handlePrint() : setActiveStep(prevActiveStep => prevActiveStep + 1);}
    
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div style={{marginLeft:40,marginBotton:25}}>
    <div className={classes.root} style={styles.frmCreateEvent}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button class="mybutton" onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep,props)}</Typography>
            <div>
              {activeStep===0?
              null
              :
              <button  
                style={{float:'left'}}
                class="mybutton"
                onClick={handleBack}
                //className={classes.backButton}
              >
                Regresar
              </button>}
              <button  style={{float:'right'}} class="mybutton"  variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Fin' : 'Siguiente'}
              </button>
            </div>
          </div>
        )}
      </div>
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