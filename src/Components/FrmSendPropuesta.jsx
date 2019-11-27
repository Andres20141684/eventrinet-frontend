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
import Dashboard from './Dashboard';
import JStep from './JStep';
const Networking = require('./../../src/Network/Networking') ;

const classes =makeStyles(theme => ({

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
    fontSize: "5rem"
  },
  alternativeLabel:{
    fontSize:'21px'
  }
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
        /****USER */
        telefonoAuthor:"",
        gradoInstruccion:"",
        afilicacion:"_",
        /* step 1 */
        authorName: "*",
        authorLastname: "",
        telefono: "",
        email: "",
        academicLevel: "Secundaria",
        /* step 2 */
        titulo: "",
        resumen: "*****",
        categorias: [],
        archivo: null,
        fileNeeded: false,
        /****************** */
        modal:0,
        data:null,// /api/camposPEnun/listarCamposPEnunXFase
        fase : 1,
        Authors:[],
        CamposPers: [],
        respuestasPers:[],
        entregable:null,
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
      window.scrollTo(0, 0);
        console.log("FrmSendPropuesta:",this.props);
        let retrievedObject = sessionStorage.getItem('dataUser');
        let retrievedJson = JSON.parse(retrievedObject);  
        this.setState({myId: retrievedJson.infoUsuario.idUsuario});


        Networking.NetworkMutation_JAchievingData( 
          {
            methodPath: 'eventos/formularioActualEnviarPropuesta',
            JsonToBack:{
                idEvento: this.props.nextChildComponentProps.evento.idEvento
            },
          }
        ).then((value) => {
          console.log(value);
          if(value == null || value.succeed==false){
            console.error('FALLO FATAL');
            /************** si fallo mensaje de error************ */
            //this.setState({modal:-1});
          }else {
             console.log('si hay algo:');
            //this.handleNextChildComponentChange(PropoMyProposals);
            this.setState({fileNeeded:value.necesitaArchivo});
            console.log('si hay algo:');
            this.setState({CamposPers:value.CamposPerson});
            for(var _index=0; _index < this.state.CamposPers.length;_index++){
              this.state.respuestasPers.push(
                { idCampopersonalizado     : this.state.CamposPers[_index].idCamposPEnun,
                  enunciado       : this.state.CamposPers[_index].enunciado,
                  descripcion : this.state.CamposPers[_index].descripcion,
                  respuesta       : "",
                  index: _index
                }
                
                );
            }
            
            console.log('si hay algo:', this.state.respuestasPers);
            
          }
       });
       this.setState({modal:0});


    }

   componentDidMount(){
        /**desabilitar y desaparecer el finish */
      //document.getElementById("button_finish").disabled = true;
      document.getElementById("button_finish").style.display = "none";

      Networking.NetworkMutation_JAchievingData(
        {
          methodPath: 'eventos/formularioActualEnviarPropuesta',
          JsonToBack:{
              idEvento: this.props.nextChildComponentProps.evento.idEvento
              
              
          },
        }
      ).then((value) => {
        console.log('CAMPS',value.CamposPerson);
        if(value == null || value.succeed==false){
          console.error('FALLO FATAL');
          /************** si fallo mensaje de error************ */
          this.setState({modal:-1});
        }else {
           console.log('si hay algo:');
          //this.handleNextChildComponentChange(PropoMyProposals);
          value.CamposPerson.forEach(element => {
            this.state.CamposPers.push(
              {idCampo:element.idCamposPEnun,enunciado:element.enunciado});
          });
          


        }
     });
      


   }
   
   shouldComponentUpdate(nextProps, nextState){
      if(this.state.currentstep != nextState.currentstep){
         return true;
      }
      if(this.state.afilicacion != nextState.afilicacion){
        return true;
     }
      if(this.state.modal != nextState.modal){
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
        this.onNextChildComponentChangeProps({User: this.props.nextChildComponentProps.Usuario});
        this.handleNextChildComponentChange(Dashboard);
        console.log("No redirije la wea");
        return;
      }
      this.setState({currentstep:0});
      /** desaparezco el button finish y reaparece next */
      document.getElementById("button_next").style.display = "block";
      document.getElementById("button_finish").style.display = "none";
    };
/** envio de los datos */
    handleFinish = () =>{
      //console.log("getttttte",document.getElementById("myModal"));
      
      //console.log("final",this.state);
      /********aqui debo enviar******** */
      
      Networking.NetworkMutation_JAchievingData(
        {
          methodPath: 'propuesta/registrar_propuesta',
          JsonToBack:{
              idEvento: this.props.nextChildComponentProps.evento.idEvento,
              idUsuario: this.props.nextChildComponentProps.Usuario.idUsuario,
              anho: 2019,
              paper: this.state.archivo,
              afilicacion: this.state.afilicacion,
              resumen:this.state.resumen,
              nombre : this.state.titulo,
              coautores : this.state.authorName
                          + "&" +this.state.authorLastname
                          + "&" +this.state.telefono
                          + "&" +this.state.email
                          + "&" +this.state.academicLevel,
              Categorias: this.state.categorias,
              RptaCamposPers: this.state.respuestasPers,
              entregable:this.state.entregable,
              
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
     window.scrollTo(0, 0);
     window.document.getElementById("JinSSJ_body").style.paddingRight = "0px";
    }
/**************************************** */
    handle_redirect (i){
      //document.getElementById("myModal").style.display = "none";
      console.log("redireccion del buton ok");
      switch (i) {

        case 1: {
          this.props.onNextChildComponentChangeProps(
            {
              Usuario:this.props.nextChildComponentProps.Usuario
            }
          );
          this.props.onNextChildComponentChange(PropoMyProposals);
        }; 
      }
    }
    /** hadle generico */
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
      /* handle Campos Personalizados */
      if(value.to =='campoPEnun'){

        console.log("campoPEnun a tratar:",value);
        
          console.log("agregando:",value.value.value);
          this.state.respuestasPers[parseInt(value.value.index)].respuesta
           =value.value.value;

          
        console.log("resulta:",this.state.respuestasPers);
        
        return;
      }
      /** input con label apropiado, handle standar de textbox*/
      this.state[value.to] = value.value;
      console.log("resulta:",this.state[value.to]);
    }

    
    renderStep(i){
      switch (i) {
        
        case 0:
          return <this.state.step1 
                  Usuario={this.props.nextChildComponentProps.Usuario}
                  multiHandle={this.handleValue}
                  authorName={this.state.authorName}
                  authorLastname={this.state.authorLastname}
                  telefono={this.state.telefono}
                  email={this.state.email}
                  academicLevel={this.state.academicLevel}
                  afilicacion={this.state.afilicacion}
                />;
        case 1:        
          return <this.state.step2
                  Usuario={this.props.nextChildComponentProps.Usuario}
                  CamposPerson={this.state.CamposPers}
                  multiHandle={this.handleValue} 
                  Categorias={this.props.nextChildComponentProps.Categorias}
                  titulo={this.state.titulo}
                  resumen={this.state.resumen}
                  selectedCategorias= {this.state.categorias}
                  CamposPers={this.state.respuestasPers}
                  fileNeeded={this.state.fileNeeded}
                />;
        default:
          return 'Uknown stepIndex';
      }
    }
  
    makeDetallePropuesta(){

    }
    //falta satedo -2 en la que muestro resumen de la propuesta
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
      window.document.getElementById("JinSSJ_body").style.paddingRight = "0px";
      switch (i) {
        case -1:
            return (
              <div>
                <h1>Error en el envio, intentalo mas tarde</h1>
              </div>
            );
        case 0: 
            return(
              <div className="Row">
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
                style={{float:'center'}}
                class="mybutton"  
                variant="contained" 
                color="primary" 
                data-dismiss="modal"
                onClick={()=>this.handle_redirect(i)}
                >
                Hecho
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
              body={this.makeModalLoad(i)}
              footer={this.makefooterModal(i)}
          />
      );
    }
    render() {

        console.log("rendering frmSendPropuesta");
        return (
           <div  style={styles.frmCreateEvent}>
             <JStep/>
            <h1>Evento: {this.props.nextChildComponentProps.evento.nombre}</h1>
            <h1>Lugar: {this.props.nextChildComponentProps.evento.lugar} - {this.props.nextChildComponentProps.evento.fechaIni}</h1>
            <br/>
            <h2>Registro de propuestas:</h2>
                <div className={classes.root}
                      class=" mx-auto" style={{width:"700px"}}
                >
            
                <Stepper 
                        activeStep={this.state.currentstep} alternativeLabel>
                        {this.state.steps.map(label => (
        <Step key={label}>
            <StepLabel 
            classes={{
              iconContainer:classes.iconContainer,
            alternativeLabel: classes.alternativeLabel}}>
              {label}
              </StepLabel>
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
                        type="button"  data-toggle="modal" data-target="#JModal"
                            id="button_finish"
                            style={{float:'right'}} 
                            class="mybutton" 
                            color="primary" 
                            onClick={this.handleFinish}
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
                    id= "JModal"
                    head={this.makeHeadModal(this.state.modal)}
                    body={this.makeModalLoad(this.state.modal)}
                    footer={this.makefooterModal(this.state.modal)}
                  />

           </div>
        )
    }
}

export default FrmSendPropuesta;

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