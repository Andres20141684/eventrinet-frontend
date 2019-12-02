import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import FormPropsxFasePresidente from './FormPropsxFasePresidente';
import '../../styles/style_sheets.css'

const Networking = require('../../Network/Networking');

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    fontSize:'15px'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

  },
}));

function getSteps(fases) {
  let nombres_fases = [];
  fases.map((element, index) => {
    const {nombre} = element
      nombres_fases.push(nombre);
  })
  return nombres_fases;
}

function getStepContent(props,activeStep) {
  
  let propsPasados = {
    myProps : props,
    activeStep : activeStep,
  }
    
  if (activeStep !== -1){        
    return <FormPropsxFasePresidente key = {"step-"+ activeStep}  _props = {propsPasados}/>;
  }
  else{
    return "Cargando datos"
  }

}

export default function HorizontalNonLinearStepper(props) {  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps(props.fases);
  const [flag, setFlag] = React.useState(true);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };  
    
  React.useEffect(() => {
    if (flag){
      console.log("una sola vez",flag)
      setActiveStep(props.faseActualSecuencia-1)
      if (props.faseActualSecuencia-1 !== -1) {
        setFlag(false)
      }
    }
    
  });  
  

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };  
  
  console.log("this.rpos.FASEFORM_______",props)
  return (
    <div className={classes.root} >
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>            
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(props, activeStep)}</Typography>
            <div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}