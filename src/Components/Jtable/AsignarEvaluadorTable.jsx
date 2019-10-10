import React, { Component } from 'react'
import './../../styles/Jtab.css'

const Networking = require('./../../Network/Networking.js') ;

class AsignarEvaluadorTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataPresiTab_asignar_evaluadores(3).then((value) => {
            this.setState({datos_tabla: value});   
            
      });
      console.log("rzwetxrytcvygbuhnj"+this.props);
   }
   state = {
      datos_tabla: [
         {  nombre: 'AWS communnity day',
            propAsignadas: '1/15', 
            iniEval: '25/08/2019'
         }]
      

  }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.datos_tabla.map((element, index) => {
            const { nombre, propAsignadas, iniEval} = element //destructuring
            
                     return (
                        
                        <tr>
                           <td>{nombre} </td>
                           <td>{propAsignadas}</td>
                           <td>{iniEval}</td>
                           <td>
                              <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
                           </td>  
                           <td>
                              <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-edit"></i></button>
                           </td>  
                        </tr>
                  )

        })
    }
    renderTableHeader() {
      return (
         <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
            <tr>
               <th width="20%">Lista de eventos</th>
               <th width="18%">Propuestas<br/>Asignadas/Total </th>
               <th width="22%">Inicio Evaluacion Limite</th>
               <th width="15%">Asignar Evaluadores (Evaluador - Presidente) </th>
               <th width="15%">Editar fases</th>
            </tr>
       </thead>
      )
   }

  
     render() {
        return (
            
         <div  class="table-responsive">
              <table class="table  table-hover" >
                  {this.renderTableHeader()}
                  <tbody>                    
                    {this.renderTableData()}
                  </tbody>
              </table>
           </div>
        )
     }
}

export default AsignarEvaluadorTable //exporting a component make it reusable and this is the beauty of react
