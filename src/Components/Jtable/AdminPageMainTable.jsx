import React, { Component } from 'react'
import './../styles/Jtab.css'
import ActionButton from './ActionButton';


const Networking = require('../Network/Networking') ;

class AdminPageMainTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = {
         idUser_recived:0,
      datos_tabla: {
                     Eventos:[
                        
                     ]
      }
   }
   }
   componentDidMount(){
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      //this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      

/*
      Networking.populateDataOrgTab2(this.state.idUser_recived)
      .then((value) => {

         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
         }   
            
      });*/
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.datos_tabla.Eventos.map((element, index) => {
         const {idEvento, nombre,email,vigInicio,vigFin} = element
            return (
            <tr >
                <td>{nombre}</td>
                <td>{email}</td>
                <td>{vigInicio}</td>
                <td>{vigFin}</td>
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
    renderTableHeader() {
      return (
         <tr>
             <th width="30%">Nombre completo</th>
             <th width="30%">Correo</th>
             <th width="15%">Vigencia Inicio</th>
             <th width="15%">Vigencia Fin</th>
             <th width="10%">Eliminar</th>
         </tr>

     )
     }
  
     render() {
        //this.state = this.props.data
        return (
        <div>
            <div style={{marginLeft:15}}>
                <h1><br/>Otorgar permiso de crear evento</h1>
            </div>
            <div style={{marginLeft:40,marginTop:25}} ><h4>Gestión de eventos a asignar evaluadores y en fase de evaluación</h4></div>            

            <div class="panel panel mypanel" >
            <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                <h3>Lista de organizadores que pueden crear evento</h3>
                <a  class="pull-right" onClick={this.handleClickCrearActualizar} 
                  value="Nuevo" style={{marginRight:30,marginBottom:20}}>Otorgar permiso</a>
            </div>
            <div  class="table-responsive">
                <table class="table  table-hover" >
                <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                {this.renderTableHeader()}
                </thead>
                    <tbody>{this.renderTableData()}</tbody>
                </table>
            </div>
        </div>
    </div>
        )
     }
}

export default AdminPageMainTable//exporting a component make it reusable and this is the beauty of react

