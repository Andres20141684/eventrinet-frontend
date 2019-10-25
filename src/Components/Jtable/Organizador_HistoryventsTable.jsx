import React, { Component } from 'react'
import './../../styles/Jtab.css'

const Networking = require('./../../Network/Networking.js') ;

class Organizador_HistoryventsTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataOrgTab1(8).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
         }   
            
      });
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
  
   renderTableData() {
        return this.state.datos_tabla.Eventos.map((element, index) => {
         const {idEvento, nombre,descripcion,fechaIni,
            fechaFin,lugar,precios,numFases,estado,
            preferencia,tieneCameraRdy,programaCompletado,
            fechaMaxPref,numeroPropuestas} = element
            return (
            <tr >
                <td>{nombre}</td>
                <td>
                   <div >
                   <button class="btn_plus" style={{justifyContent:"center", alignItems:"center"}} onClick={this.handleClick} ><i class="fa fa-download"></i></button>
                   </div>
               </td> 
            </tr>
        )
        })
    }
    renderTableHeader() {
      return (
         <tr>
             <th width="70%">Lista de eventos</th>
             <th width="30%">Reporte </th>
         </tr>

     )
     }
  
     render() {
        //this.state = this.props.data
        return (
         <div class="panel panel mypanel" >
         <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
             <h3>Lista de eventos históricos</h3>
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

          
        )
     }
}

export default Organizador_HistoryventsTable//exporting a component make it reusable and this is the beauty of react
