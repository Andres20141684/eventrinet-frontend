import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'

const Networking = require('./../../Network/Networking.js') ;


class Organizador_ActiveEventsTable  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataOrgTab1(4).then((value) => {
            this.setState({datos_tabla: value});   
            
      });
      console.log("rzwetxrytcvygbuhnj"+this.props);
   }
   state = {
      datos_tabla: {
         Eventos:[
            {  
               nombre: 'Datos1', 
               fechaLimitePref: '21/03/2019',
               preferencia: 'Por Categoria' 
            }
         ]
   }
  }
   handleClick = () => {
    console.log('this is:', this);
  }
 
   
   tableData() {
      
        return this.state.datos_tabla.Eventos.map((element, index) => {
         
         const {idEvento, nombre,descripcion,fechaIni,
            fechaFin,lugar,precios,numFases,estado,
            preferencia,tieneCameraRdy,programaCompletado,
            fechaMaxPref,numeroPropuestas} = element
         return (
         <tr >
               <td >{nombre}</td>
                  <td >
                     
                     <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-check-circle"></i></button>
                     -
                     <button class="btn_plus" onClick={this.handleClick} >
                     {( {programaCompletado} ===1 )  ? <i class="fa fa-check-circle"></i> : <i class="fa fa-times-circle"></i> }
                     </button>
                     

                  </td> 
               <td>
                  <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-edit"></i></button>
               </td> 
               <td>
               
                  <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus "></i></button>
               </td> 
               <td>
                  <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-play"></i></button>
               </td> 
               <td>
                  <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-times"></i></button>

               </td> 
         </tr>
         )
      })
    }
  
     render() {
        //this.state = this.props.data
        //console.log('this.props.data:', this.props.data);
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
