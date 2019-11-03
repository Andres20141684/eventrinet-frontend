import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
//import NewEventPage from './../../Pages/NewEventPage' //aca debería estar el modificar fases, pero ni en back hay :'v
const Networking = require('./../../Network/Networking.js') ;


class EvaluadorEventosPrefTable  extends Component {
   constructor(props){
      super(props);
      this.state = {
          msg: "Not Connected" ,
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: {
            Eventos_Evaluador:[
                           ]
         }
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  
    }
    handleNextChildComponentChange(_nextChildComponent){
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    handleClickRegistrarPref = () => {
      console.log('redireccionando a ... FakeNewIni evento');
      this.handleNextChildComponentChangeProps({  
         idOrganizador_nextProps: this.state.idUser_recived,
         id_evento_nextProps: 0, //para q se actualice el evento no?
         nomb_evento: "none"
         
      });
      
      //this.handleNextChildComponentChange(NewEventPage);
    }
   
   componentWillMount(){
      
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);


      Networking.populateDataEvalElegirPref(retrievedJson.infoUsuario.idUsuario).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
         }
         
      });
   }
   shouldComponentUpdate(nextProps, nextState){
      if(this.state.datos_tabla != nextState.datos_tabla){
         return true;
      }
      return false;
   }
  
  
      handleClick2 = () => {
         console.log('redireccionando a ... update evento');
         sessionStorage.setItem('nextProp',
              JSON.stringify(
                             {   idOrganizador_nextProps: this.state.idUser_recived,
                                id_evento_nextProps: 0,
                                nomb_evento: "none"
                                
                             }
                          ))
         //window.location.replace("./");
      }

 
   
   tableData() {
      //this.setState.idUser_recived=this.props.idUser_recived;

        return this.state.datos_tabla.Eventos_Evaluador.map((element, index) => {
         
         const {fechaMaxPref,idEvento,nombre,preferencia} = element
         return (
         <tr >
               <td >{nombre}</td>
               <td >{fechaMaxPref}</td>
               <td>{preferencia}</td>
               
               <td align="center">
                  <ActionButton id_evento={idEvento} button_class ="fa fa-plus" redirect_to="/"/>
               </td> 
         </tr>
         )
      })
    }
  
  
     render() {
         return (
            
           <div class="panel panel mypanel" >
              <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                  <h3>Lista de eventos a elegir preferencias</h3>
               </div>
              <div  class="table-responsive">
              <table class="table  table-hover">
               <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                  <tr >
                     <th align= "left" scope="col">Lista de eventos</th>
                     <th scope="col">Fecha máxima</th>
                     <th scope="col">Tipo de preferencia</th>
                     <th scope="col" align="right" >Agregar preferencias</th>
                  </tr>
               </thead>
              <tbody>{this.tableData()}</tbody>
              </table>
              </div>
           </div>
        )
     }
}

export default EvaluadorEventosPrefTable