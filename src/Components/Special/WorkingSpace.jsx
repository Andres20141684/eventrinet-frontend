import React, {Component, useCallback} from 'react';
import BannerTop from '../General/bannerTop';
import InscriptionEvent from '../../Components/InscriptionEvent';
import SendProposal from '../../Components/SendProposal'
import JMap from './JMap';
const Networking = require('./../../Network/Networking') ;


/****************************************************************
 *           Estoy en construccion no me mires asi putho!!!! XD
 ***************************************************************/
class WorkingSpace extends Component{
  constructor(props){

    super(props);
    this.state = {
        idUser : -1,
        Usuario: null,
        bannTop : BannerTop,
        /*new: base de navegacion inherente del working space*/
        historyNavegation: [],
        lastChildComponent:null,
        /* fin -> aun no conectado pero ya casi*/
        nextChildComponent: null,
        nextChildComponentProps:{ idUser:0,Usuario:null}
    }
    this.componentWillTryRedirect=this.componentWillTryRedirect.bind(this);
    this.getDataUser=this.getDataUser.bind(this);
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  }
  handleNextChildComponentChange(_nextChildComponent){
      this.setState(
        {nextChildComponent: _nextChildComponent}
      );
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.setState(
        {nextChildComponentProps: _nextChildComponentProps}
      );
      this.state.nextChildComponentProps.Usuario = this.props.Usuario;
  }
    setfutureProps(){
        /**los props del sgt componente ADIOS PAGINAS XD */
    }
    getDataUser(){
      
    }
    componentWillTryRedirect(busqueda){
      console.log("WS-> intento de busqueda en ",busqueda);
      if(busqueda === 0) {
        console.log("busqueda indefinido");
        return};
      if(busqueda === 0) {
          console.log("busqueda NULL");
          return};
      Networking.NetworkMutation_JAchievingData(
        {
          methodPath: 'eventos/mostrar_evento',
          JsonToBack:{
              idEvento: busqueda
          },
        }
      ).then((value) => {
        console.log(value);
        if(value == null || value.succeed==false){
          console.error('FALLO FATAL');
          /************** si fallo mensaje de error************ */
        }else {
          console.log('si hay algo:');
          //this.handleNextChildComponentChange(PropoMyProposals);
          // aligerando el javascript object
          try{
            delete value.resultado;
            delete value.tieneCameraRdy;
            delete value.programaCompletado;
            delete value.numeroPropuestas;
            delete value.fases;
          }catch(e){console.log("Se removio lo que se pudo XD")}
          console.log('Evento modo ligero',value);
          this.handleNextChildComponentChangeProps({evento:value});
          this.handleNextChildComponentChange(SendProposal);
          console.log('WS-> Dondoe toy',this.state);
          
          }
        } 
      );
    }
              
      
    
    componentWillMount(){
      window.scrollTo(0, 0);
      this.setState({Usuario: this.props.Usuario});
      //var Usuario_var = this.state.Usuario;
      this.state.nextChildComponentProps = this.props.nextComponentProps;
      this.state.nextChildComponent= this.props.nextComponent;

      console.log("WSWillMount ***");
      console.log("WSWillMount -> props: ",this.state.nextChildComponentProps);
      console.log("WSWillMount -> comp : ",this.state.nextChildComponent);
      let page = sessionStorage.getItem("currentPage");
      this.componentWillTryRedirect(this.props.searchEvent);
      try{
        if(page){
          console.log("page to redirect ",page);
          if (page == "InscriptionEvent"){
            this.state.nextChildComponent=InscriptionEvent;
            sessionStorage.setItem("currentPage",null);
          }
          if (page == "SendProposal"){
            this.state.nextChildComponent=SendProposal;
            sessionStorage.setItem("currentPage",null);
            
          }
          let alternativeProps =  sessionStorage.getItem("currentProps");
          console.log("WS->*** alternativeProps",alternativeProps );
          //console.log("currentProps to redirect ",alternativeProps);
          //console.log("currentProps to redirect ",JSON.parse(alternativeProps));
          console.log("currentProps to redirect ", JSON.parse(alternativeProps));
          //console.log("currentProps to redirect ",JSON.stringify(JSON.parse(alternativeProps)));
          if(alternativeProps){
            console.log("adding currentProps to redirect ");
            try{this.state.nextChildComponentProps=JSON.stringify(alternativeProps);}
            catch(e){
              console.log("Nose pudo con stringfy");
            }
            try{this.state.nextChildComponentProps=JSON.parse(alternativeProps);}
            catch(e){
              console.log("Nose pudo con Json.parse");
            }
            
            sessionStorage.setItem("currentProps",{});
          }else{
            console.log("adding currentProps to redirect were null ");
            this.setState({User:this.props});
            
          }
          /** esto es porque ya use los props y page que estaban en memoria */
        }else{
          console.log("page to redirect ","NULLLLLL");
        }
        this.state.nextChildComponentProps.Usuario=this.props.Usuario;
      }catch(e){
        console.error("WSWillMount error:",e);
      }
      
      console.log("WSWillMount");
      console.log("WSWillMount -> props: ",this.state.nextChildComponentProps);
      console.log("WSWillMount -> comp : ",this.state.nextChildComponent);
    }
    componentDidMount(){
      this.state.nextChildComponentProps = this.props.nextComponentProps;
      this.state.nextChildComponent= this.props.nextComponent;

    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.state.nextChildComponent  !== nextState.nextChildComponent){
          console.log("WS->Cambio state",nextState);
            return true;
        }
        if(this.props.nextChildComponent  !== nextProps.nextChildComponent){
          console.log("WS->cambio props",nextProps);
            return true;
        }
        return false;

    }
    setterEvento(){
      
    }
  
    render() {
      
      return (
      <div>
      
      <div className="App">
      <this.state.bannTop
        nextChildComponentProps={this.state.nextChildComponentProps}
        onNextChildComponentChange={this.handleNextChildComponentChange}
        onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
      /> 
      <div>
      <this.state.nextChildComponent
        nextChildComponentProps={this.state.nextChildComponentProps}
        onNextChildComponentChange={this.handleNextChildComponentChange}
        onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
        />
      </div>
      </div>
      </div>
    );}
  }
  
  export default WorkingSpace;
  