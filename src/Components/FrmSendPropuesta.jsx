import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './../styles/modal.css';
import StepOneSendPropuesta from './StepOneSendPropuesta';
import StepTwoSendPropuesta from './StepTwoSendPropuesta';
import SendProposal from './SendProposal';
import JModal from './Special/JModal';
import Jloading from './Special/Jloading';
import PropoMyProposals from '../Pages/ProposerMyProposals';
const Networking = require('./../../src/Network/Networking') ;

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
        myId:0,
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
        /****************** */
        modal:0
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    
      this.handleValue=this.handleValue.bind(this);
      this.makeModalLoad=this.makeModalLoad.bind(this);
      this.makefooterModal=this.makefooterModal.bind(this);
    
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
        let retrievedObject = sessionStorage.getItem('dataUser');
        let retrievedJson = JSON.parse(retrievedObject);  
        this.setState({myId: retrievedJson.infoUsuario.idUsuario});


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
      if(this.state==0){
        this.handleNextChildComponentChange(SendProposal);
        console.log("No redirije la wea");
        return;
      }
      this.setState({currentstep:0});
      /** desaparezco el button finish y reaparece next */
      document.getElementById("button_next").style.display = "block";
      document.getElementById("button_finish").style.display = "none";
    };

    handleFinish = () =>{
      //console.log("getttttte",document.getElementById("myModal"));
      
      //document.getElementById("myModal").modal({backdrop: "static"});
      console.log("final",this.state);
      /********aqui debo enviar******** */
      Networking.NetworkMutation_JAchievingData(
        {
          methodPath: 'propuesta/registrar_propuesta',
          JsonToBack:{
              idEvento: this.props.nextChildComponentProps.evento.idEvento,
              idUsuario: 13,
              anho: 2019,
              paper: this.state.archivo,
              nombre : this.state.actividad,
              coautores : this.state.authorName,
              categorias: this.state.categorias,
              RptaCamposPers: [
                { respuesta:"Kameeeeeee Hameeeeee" },
                { respuesta:"HAAAAAAAAAAAAAAAAA!!!" }
              ],
              
          },
        }
      ).then((value) => {
        console.log(value);
        if(value == null || value.succeed==false){
          console.error('FALLO FATAL');
          /************** si fallo mensaje de error************ */
          this.setState({modal:-1});
        }else {
           console.log('si hay algo:');
          //this.handleNextChildComponentChange(PropoMyProposals);
          this.setState({modal:1});
        }
     });
     this.setState({modal:0});
      
      
    }
/**************************************** */
    handle_redirect (i){
      //document.getElementById("myModal").style.display = "none";
      console.log("redireccion del buton ok");
      switch (i) {
        case 1: this.props.onNextChildComponentChange(PropoMyProposals); 
      }
    }
    
    handleValue(value){ 
      console.log("Handle_input",value.to,value.value);
      /* dropbox select */
      if(value.to =='categorias'){

        console.log("Categoria a tratar:",value.value.value);
        if(value.value.mode=='add'){
          console.log("agregando:",value.value.value);
          this.state.categorias.push({'idCategoria':value.value.value});
        }else if(value.value.mode=='rmv'){
          console.log("quitando:",value.value.value);
          let sp= value.value.value;
          for( var i = 0; i < this.state.categorias.length; i++){ 
             if ( this.state.categorias[i]['idCategoria'] === sp) {
              this.state.categorias.splice(i, 1); 
             }
          }

        }
        console.log("resulta:",this.state.categorias);
        
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
    makeDetallePropuesta(){

    }
    //-1 = error 
    // 0 = enviando 
    // 1 = exitoso envio
    makeHeadModal(i){
      switch (i) {
        case -1:
            return 'Algo paso :(';
        case 0: 
            return 'Enviando Formulario:';
        case 1:
            return 'Felicitaciones :D';
      }
    } 
    makeModalLoad(i){
      switch (i) {
        case -1:
            return (
              <div>
                <h1>Error en el envio, intentalo mas tarde</h1>
              </div>
            );
        case 0: 
            return(
              <div>
                <Jloading />
              </div>
            );
        case 1:
            return (
              <div><h1>Se envió el formulario exitosamente</h1></div>
            );
      }
    }
    makefooterModal(i){
      switch (i) {
        case -1:
          return (
            <div>
              <button  
                  style={{float:'right'}}
                  class="mybutton"  
                  variant="contained" 
                  color="primary" 
                  data-dismiss="modal"
                  onClick={()=>this.handle_redirect(i)}
                >
                OK
              </button>
            </div>
            );
        case 0:
          return(
            <div>
              
            </div>
          );
        case 1:
          return(
          <div>
            <button  
                style={{float:'right'}}
                class="mybutton"  
                variant="contained" 
                color="primary" 
                data-dismiss="modal"
                onClick={()=>this.handle_redirect(i)}
                >
                Volver a Mis Propuestas
            </button>
          </div>
          );
      }
    }
  renderModal(i){
    
        return (
          <JModal
              class ="modal fade"
              id= "myModal"
              head={this.makeHeadModal(i)}
              body={()=>this.makeModalLoad(i)}
              footer={()=>this.makefooterModal(i)}
          />
        );
    
      
    }
    render() {
        console.log("rendering frmSendPropuesta");
        return (
           <div  style={styles.frmCreateEvent}>
             <h1>Registro de propuesta para el _Evento_</h1>
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
                            onClick={this.handleFinish}
                            data-toggle="modal" 
                            data-target="#myModal"
                            data-backdrop="static"
                            >
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

                
                <JModal
                  class ="modal fade"
                  id= "myModal"
                  head={this.makeHeadModal(this.state.modal)}
                  body={()=>this.makeModalLoad(this.state.modal)}
                  footer={()=>this.makefooterModal(this.state.modal)}
              />

                
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
 /*
  $(document).ready(function(){
    $("#button_finish").click(function(){
      $("#myModal3").modal({backdrop: "static"});
    });
  });

  */