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
import JStepper from './Special/JStepper';
import './../styles/styles_SendPropuesta.css';
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
  iconContainer: {
    transform: 'scale(2)',
  },
  alternativeLabel:{
    fontSize:'21px'
  }
}));



class FrmSendPropuesta extends React.Component {
    constructor(){
      super();
      this.state={
        idFase:0,
        descripcionFase:"",
        nombreFase: "",
        flagPrimeraFase:-1,
        myId:0,
        msgDialog: "",
        steps:['Autores', 'Información'],
        currentstep:-1,
        step1:StepOneSendPropuesta,
        step2:StepTwoSendPropuesta,
        Propuesta: null,
        /****USER */
        telefonoAuthor:"",
        gradoInstruccion:"",
        afilicacion:"_",
        /* step 1 */
        authorName: "",
        authorLastname: "",
        telefono: "",
        email: "",
        academicLevel: "",
        /* step 2 */
        titulo: "",
        resumen: "*****",
        categorias: [],
        archivo: null,
        fileNeeded: false,
        entregableNeeded: false,
        /****************** */
        modal:0,
        data:null,// /api/camposPEnun/listarCamposPEnunXFase
        fase : 1,
        Authors:[],
        CamposPers: [],
        respuestasPers:[],
        entregable:null,
        solicitaData:true,
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
      this.renderStepper=this.renderStepper.bind(this);
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
        


    }

   componentDidMount(){
     /********************************** */
     console.log("FrmSendPropuesta:",this.props);
        let retrievedObject = sessionStorage.getItem('dataUser');
        let retrievedJson = JSON.parse(retrievedObject);  
        this.setState({myId: retrievedJson.infoUsuario.idUsuario});

        //document.getElementById("button_finish").style.display="none";
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
            
            this.setState({idFase:value.idFase});
            this.setState({fileNeeded:value.necesitaArchivo});
            this.setState({nombreFase:value.nombre});
            this.setState({descripcionFase:value.descripcion});
            this.setState({flagPrimeraFase:value.flagPrimeraFase});
            
            console.log('flagPrimeraFase:value.flagPrimeraFase',this.state.flagPrimeraFase);
            this.setState({entregableNeeded:value.necesitaEntregable});
            
            console.log('si hay algo:');
            this.setState({CamposPers:value.CamposPerson});
            if(value.CamposPerson.length===0 &&
                          value.necesitaArchivo===0 &&
                          value.necesitaEntregable===0 && value.flagPrimeraFase===0){
                            this.setState({solicitaData:false});
                          }
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
            if(value.flagPrimeraFase==1){
              this.setState({currentstep:0});
              }
              if(value.flagPrimeraFase == 0){
                this.setState({currentstep:2});

              }

          }
       });
        /**desabilitar y desaparecer el finish */
      //document.getElementById("button_finish").disabled = true;
      this.setState({modal:0});

      
      
     

   }
   
   shouldComponentUpdate(nextProps, nextState){
     if(this.state.flagPrimeraFase != nextState.flagPrimeraFase){
       return true;
     }
      if(this.state.currentstep != nextState.currentstep){
         return true;
      }
      if(this.state.afilicacion != nextState.afilicacion){
        return true;
     }
      if(this.state.modal != nextState.modal){
        return true;
     }
     if(this.state.solicitaData != nextState.solicitaData){
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
      //document.getElementById("button_next").style.display = "none";
      //document.getElementById("button_finish").style.display = "block";
    };
  
    handleBack = () => {
      if(this.state.flagPrimeraFase===0){
        this.handleNextChildComponentChangeProps({Usuario:this.props.nextChildComponentProps.Usuario,evento:this.props.nextChildComponentProps.evento});
        this.handleNextChildComponentChange(PropoMyProposals);
        //window.location.replace("./?EventriEvents&idEvento="+this.props.nextChildComponentProps.evento.idEvento);
        return;
      }
      if(this.state.currentstep===0){
        //rediirige
        this.handleNextChildComponentChangeProps({Usuario:this.props.nextChildComponentProps.Usuario,evento:this.props.nextChildComponentProps.evento});
        this.handleNextChildComponentChange(SendProposal);
        //window.location.replace("./?EventriEvents&idEvento="+this.props.nextChildComponentProps.evento.idEvento);
    
      }else{
        var _currentStep = this.state.currentstep;
        _currentStep= _currentStep-1;
        this.setState({currentstep:_currentStep});
      }
      };
/** envio de los datos */
    handleFinish = () =>{
      //console.log("getttttte",document.getElementById("myModal"));
      
      //console.log("final",this.state);
      /********aqui debo enviar******** */
      
      if(this.state.flagPrimeraFase === 1){
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
    }else if (this.state.flagPrimeraFase === 0){
      Networking.NetworkMutation_JAchievingData(
        {
          methodPath: 'propuesta/actualizar_propuesta',
          JsonToBack:{
            idFaseActual:this.state.idFase,
              idEvento: this.props.nextChildComponentProps.evento.idEvento,
              idPropuesta: this.props.nextChildComponentProps.Propuestaprev.idPropuesta,
              RptaCamposPers: this.state.respuestasPers,
              paper: this.state.archivo,
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
    }
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

    renderbody(fase1){
      
    }
    renderStepper(i){
        this.state.steps.forEach((element,index) => {
          return(
          <li class={(i==index)?"completed":"active"}>
          <span class="circle">{index+1}</span>
            <span class="label">{element}</span>
        </li>
        )
          ;
        });
    }
    renderStep(i){
      
      switch (i) {
        case -1:
          return <div className="container"><Jloading/></div>;
        case 2:
          return (<div>
                    
                    <JStep
                    multiHandle={this.handleValue} 
                    nombreFase = {this.state.nombreFase}
                    descripcionFase =  
                     {this.state.descripcionFase}
                    CamposPerson={this.state.CamposPers}
                    fileNeeded={this.state.fileNeeded}
                    entregableNeeded={this.state.entregableNeeded}
                  />

                  <div>
                      <button  
                          id="button_back"
                          style={{float:'left'}}
                          class="mybutton"
                          onClick={this.handleBack}
                      >
                        Regresar
                      </button>
                      {
                        this.state.solicitaData===true
                          ?<button  
                        type="button"  data-toggle="modal" data-target="#JModal"
                            id="button_finish"
                            style={{float:'right',display:"block"}} 
                            class="mybutton" 
                            color="primary" 
                            onClick={this.handleFinish}
                            >
                        Finalizar
                      </button>:<></>}
                      
                      
                      </div>
                        

                  </div>); 
        case 0:        
          return (
            <div className={useStyles.root}>
          <this.state.step1 
                    Usuario={this.props.nextChildComponentProps.Usuario}
                    multiHandle={this.handleValue}
                    authorName={this.state.authorName}
                    authorLastname={this.state.authorLastname}
                    telefono={this.state.telefono}
                    email={this.state.email}
                    academicLevel={this.state.academicLevel}
                    afilicacion={this.state.afilicacion}
                  />
                   <div>
                      <button  
                          id="button_back"
                          style={{float:'left'}}
                          class="mybutton"
                          onClick={this.handleBack}
                      >
                        Regresar
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
              );
          
        case 1:        
          return (
          <div>
            
                
                <this.state.step2
          Usuario={this.props.nextChildComponentProps.Usuario}
          CamposPerson={this.state.CamposPers}
          multiHandle={this.handleValue} 
          Categorias={this.props.nextChildComponentProps.Categorias}
          titulo={this.state.titulo}
          resumen={this.state.resumen}
          selectedCategorias= {this.state.categorias}
          CamposPers={this.state.respuestasPers}
          fileNeeded={this.state.fileNeeded}
          entregableNeeded={this.state.entregableNeeded}
        />
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
                        
        </div>);
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

        console.log("rendering frmSendPropuesta y la fase sera 1 ?",this.state.flagPrimeraFase);
        
        
        
        return (
          
           <div className="wrapper_sendPropuesta">
            
           <div   style={styles.sendPropuesta}>
               <div className="md-stepper-horizontal blue" style={styles.wrapperForm}>
                <h1>Evento: {this.props.nextChildComponentProps.evento.nombre ||this.props.nextChildComponentProps.evento.nombEvento}</h1>
                <h1>Lugar: {this.props.nextChildComponentProps.evento.lugar} - {this.props.nextChildComponentProps.evento.fechaIni}</h1>
            
                <div style={{textAlign:"center",backgroundColor:"#002D3D",color:"#6CDCD6"}}>
                      <h1>Fase : {this.state.nombreFase}</h1>
                      <h2>{this.state.descripcionFase}</h2>
                </div>
            
            <JStepper
                content={this.state.solicitaData}
                flagPrimeraFase={this.state.flagPrimeraFase}
                currentStep={this.state.currentstep}
               
                labelfase={this.state.nombreFase}
            />
            
                
                    {this.renderStep(this.state.currentstep)}

                   
                    
                </div>
                
                <JModal
                    class ="modal fade"
                    id= "JModal"
                    head={this.makeHeadModal(this.state.modal)}
                    body={this.makeModalLoad(this.state.modal)}
                    footer={this.makefooterModal(this.state.modal)}
                  />

           </div></div>
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
    },
    sendPropuesta:{
      alignSelf:"center",
      padding: "2% 15% 2% 15%",
      backgroundColor:"#f2f2f2",
    },
    wrapperForm:{
      paddingTop: "2%",
      paddingBottom: "2%",
    }
  }
  

 /*
  $(document).ready(function(){
    $("#button_finish").click(function(){
      $("#myModal3").modal({backdrop: "static"});
    });
  });
  */ 
 /*
  $(document).ready(function(){
    $("#button_finish").click(function(){
      $("#myModal3").modal({backdrop: "static"});
    });
  });
  */ 