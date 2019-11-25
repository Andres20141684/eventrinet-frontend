import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
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
  console.log("nombres_fases",nombres_fases);
  return nombres_fases;
}

function renderForm(flag, fase, responseObservaciones,responsePropuestas,props){
  console.log("Props para el ofrmpornsfasepresirente")
  console.log(fase)
  console.log(responseObservaciones)
  console.log(responsePropuestas)

    return (
      <div style={{marginLeft:'2%',marginRight:'2%'}} >
        <div className="Main-tittle">
            <div style={{ marginLeft: 40, marginTop: 25 }} >
              <h4>Descripcion: {fase.descripcion}</h4>
            </div>
        </div>
        <div class="container" style={{fontSize:'14px'}}>
          <div class="panel-body">
            
            <FormPropsxFasePresidente
              fase = {fase}
              obss = {responseObservaciones}
              propuestas = {responsePropuestas}

            />
              <div style={{ paddingTop: '20px' }}>
                <button
                    style={{ float: 'left' }}
                    class="mybutton"
                    onClick={props.handleReturn}
                >
                  Regresar
                </button>                                          
            </div>          
          </div>
          <br /><br />
        </div>
      </div>      
    )
  
}
function getStepContent(props,activeStep) {
  //console.log("Llamando al componenten de observaciones observaciones")  
  
  let propsPasados = {
    myProps : props,
    activeStep : activeStep,
  }
  console.log("______HOLA QUEUIERO______",props,activeStep)  
  console.log("HOLA QUIERO",propsPasados)

  return <FormPropsxFasePresidente key = {"step-"+ activeStep}  _props = {propsPasados}/>;

}

export default function HorizontalNonLinearStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps(props.fases);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  //console.log("this.rpos.FASEFORM_______",props)
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
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
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