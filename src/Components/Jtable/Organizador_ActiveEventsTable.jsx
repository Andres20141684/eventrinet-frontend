import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';

const Networking = require('./../../Network/Networking.js') ;


class Organizador_ActiveEventsTable  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA");
      
      
      
      console.log("PROPS del active events"+this.props);
   }
   componentDidMount(){
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
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
   state = {
      idUser_recived: 13,
      datos_tabla: {
         Eventos:[
         ]
   }
  }
   handleClick = () => {
    console.log('this is:', this);
    
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
                  <td >
                     <ActionButton id_evento={idEvento} button_class ="fa fa-check-circle" redirect_to="/"/>
                     
                     -
                     
                     <ActionButton id_evento={idEvento} button_class ={( {programaCompletado} ===1 )  ? "fa fa-check-circle":"fa fa-times-circle"} redirect_to="/"/>

                  </td> 
               <td>
                  
                  <ActionButton id_evento={idEvento} button_class ="fa fa-edit" 
                  onClick={this.handleClick} redirect_to="/organizerNewEvent"/>

               </td> 
               <td>
               
                  <ActionButton id_evento={idEvento} button_class ="fa fa-plus" redirect_to="/"/>
               </td> 
               <td>
                  
                  <ActionButton id_evento={idEvento} button_class ="fa fa-play" redirect_to="/"/>
               </td> 
               <td>
                  
                  <ActionButton id_evento={idEvento} button_class ="fa fa-times" redirect_to="/"/>

               </td> 
         </tr>
         )
      })
    }
  
  
     render() {
      console.log(this.state.datos_tabla.Eventos.length);
      //superWait(this.state.datos_tabla.Eventos);
        //this.state = this.props.data
        //console.log('this.props.data:', this.props.data);
        console.log('RENDER DE MRD! se loqueo');
         return (
           <div class="panel panel mypanel" >
              <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                  <h3>Lista de Eventos activos</h3>
                  <a  class="pull-right" href="/organizerNewEvent" value="Nuevo"style={{marginRight:30,marginBottom:20}}>Nuevo</a>
               </div>
              <div  class="table-responsive">
              <table class="table  table-hover">
               <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                  <tr >
                     <th align= "left" scope="col">Lista de eventos</th>
                     <th scope="col">Call for Papers-> Prog. comp. </th>
                     <th scope="col">Editar</th>
                     <th scope="col">Seg. de fases</th>
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
