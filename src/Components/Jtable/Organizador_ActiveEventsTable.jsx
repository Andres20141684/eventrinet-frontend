import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import NewEventPage from './../../Pages/NewEventPage'
const Networking = require('./../../Network/Networking.js') ;


class Organizador_ActiveEventsTable  extends Component {
   constructor(props){
      super(props);
      this.state = {
          msg: "Not Connected" ,
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: {
                  Eventos:[
                           ],
         data_default: {  
            idOrganizador_nextProps: 0,
            id_evento_nextProps: 0,
            nomb_evento: "none"
            
         }
         }
         
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
      //this.handleClickCrearActualizar=this.handleNextChildComponentChange.bind(this);
    }
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    handleClickCrearActualizar(idO,idE,nom) {
      console.log('redireccionando a ... NewEventPage evento');
      let dataFlow = {   
         idOrganizador_nextProps: idO,
         id_evento_nextProps: idE,
         nomb_evento: nom
         
      }
      console.log('Enviando a Armando se la come',dataFlow);
      this.handleNextChildComponentChangeProps(dataFlow);
      console.log('redireccionando a ... NewEventPage evento');
      this.handleNextChildComponentChange(NewEventPage);
    }
   
   componentWillMount(){
      
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);
      
      console.log("flag permisos", retrievedJson.permisos[7]);
      if (retrievedJson.permisos[7]){
         let btnCrearEvent = document.getElementById("btnCrearEvento");
         //btnCrearEvent.display="block";
         console.log("Cambios realizados");
      }
      

      Networking.populateDataOrgTab1(retrievedJson.infoUsuario.idUsuario).then((value) => {
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

        return this.state.datos_tabla.Eventos.map((element, index) => {
         
         const {idEvento, nombre,descripcion,fechaIni,
            fechaFin,lugar,precios,numFases,estado,
            preferencia,tieneCameraRdy,programaCompletado,
            fechaMaxPref,numeroPropuestas} = element
         return (
         <tr >
               <td >{nombre}</td>
               <td >{estado}</td>
               <td >{fechaIni}</td>
               <td >{fechaFin}</td>

               <td>
                  <ActionButton 
                        id_evento={idEvento} 
                        nomb_evento ={nombre} 
                        idUser_recived={this.state.idUser_recived} 
                        button_class ="fa fa-edit" 
                        onNextChildComponentChange={()=>this.handleClickCrearActualizar( 
                           this.state.idUser_recived, element.idEvento,  element.nombre)}
                        onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                        redirect_to="/"
                  />
               </td> 

               <td>
                  <ActionButton 
                     id_evento={idEvento} 
                     nomb_evento ={nombre} 
                     idUser_recived={this.state.idUser_recived} 
                     button_class ="fa fa-play" 
                     onNextChildComponentChange={this.props.onNextChildComponentChange}
                     onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                     redirect_to="/"
                  />
               </td> 

               <td>
                  <ActionButton
                     id_evento={idEvento} 
                     nomb_evento ={nombre} 
                     idUser_recived={this.state.idUser_recived} 
                     button_class ="fa fa-times" 
                     onNextChildComponentChange={this.props.onNextChildComponentChange}
                     onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                     redirect_to="/"
                  />
               </td> 
         </tr>
         )
      })
    }
  
  
     render() {
      //console.log(this.state.datos_tabla.Eventos.length);
      //superWait(this.state.datos_tabla.Eventos);
        //this.state = this.props.data
        //console.log('this.props.data:', this.props.data);
        console.log('RENDER DE MRD! se loqueo');
         return (
            
           <div class="panel panel mypanel" >
              <div className="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                  <h3>Lista de Eventos activos</h3>
                  
                  <a  class="pull-right" onClick={()=>this.handleClickCrearActualizar( 
                           this.state.idUser_recived, 0,  'ARMANDO SE LA COMEEEE')} 
                  value="Nuevo" style={{marginRight:30,marginBottom:20}}>Nuevo</a>


               </div>
              <div  class="table-responsive">
              <table class="table  table-hover">
               <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                  <tr >
                     <th align= "left" scope="col">Lista de eventos</th>
                     <th scope="col">Estado actual</th>
                     <th scope="col">Fecha Inicio </th>
                     <th scope="col">Fecha Fin </th>
                     <th scope="col">Editar</th>
                     <th scope="col">Publicar evento</th>
                     <th scope="col">Cancelar</th>
                  </tr>
               </thead>
              <tbody>{this.tableData()}</tbody>
              </table>
              </div>
           </div>
        )
     }
}

export default Organizador_ActiveEventsTable  //exporting a component make it reusable and this is the beauty of react
