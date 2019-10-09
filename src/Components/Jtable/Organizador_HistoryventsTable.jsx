import React, { Component } from 'react'
import './../../styles/Jtab.css'

const Networking = require('./../../Network/Networking.js') ;

class Organizador_HistoryventsTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataOrgTab1(4).then((value) => {
            this.setState({datos_tabla: value});   
            
      });
   }
   state = {
      datos_tabla: []
  }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.datos_tabla.map((element, index) => {
         const {idEvento, nombre,descripcion,fechaIni,
            fechaFin,lugar,precios,numFases,estado,
            preferencia,tieneCameraRdy,programaCompletado,
            fechaMaxPref,numeroPropuestas} = element
            return (
            <tr >
                <td>{nombre}</td>
                <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-download"></i></button>
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
            
           <div>
              <br/>
              <h1 id='title'>Lista de eventos históricos</h1><br></br>
              <table id='chupetinesGA'>
                 <tbody>
                    {this.renderTableHeader()}
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}

export default Organizador_HistoryventsTable//exporting a component make it reusable and this is the beauty of react
