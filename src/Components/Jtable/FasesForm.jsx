import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormPropsxFasePresidente from './FormPropsxFasePresidente';
import '../../styles/style_sheets.css'
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
  let fases_ = ['FASE HARCODEADA 1', 'FASE HARDCODEADA 2'];
  return fases_;
}

function getStepContent(props,fase) {
  console.log("Llamando al componenten de observaciones observaciones")
  console.log("____________",props,fase)

  //LOS DATOS A ENVIAR ESTARAN HARDCODEADOS PORQUE EL BACK DEBE RETORNARME LA LISTA
  // DE FASES PARA ESE EVENTO Y LOS  IDFASESSSS
  return (
    <div>
      <div className="Main-tittle">
          <div style={{ marginLeft: 15 }}>
              <h1><br />{props.header}</h1>
          </div>
          <div style={{ marginLeft: 40, marginTop: 25 }} ><h4>Fase Actual: {'fase num2 Hardcodeada'}</h4></div>
      </div>
      <div class="container" style={{fontSize:'14px'}}>
        <div class="panel-body">
          <FormPropsxFasePresidente
              idEvento = {props.idEvento}
              nombreEvento = {props.nombreEvento}
              fasesTotales = {props.fasesTotales}
              secuencia = {props.secuencia}
              faseEscogida ={fase}
              fechaLimite = {props.fechaLimite}
              //idFase = {props.idFase[fase]}
              idFase = {2}
              nombreFase = {'Fase num2 Hardcodeada'}
              //nombreFase = {props.nombreFase[fase]}
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
            <Typography className={classes.instructions}>{getStepContent(props,activeStep)}</Typography>
            <div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}