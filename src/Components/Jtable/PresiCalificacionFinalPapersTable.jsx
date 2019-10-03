import React, { Component } from 'react'
import './../../styles/Jtab.css'
class PresiCalificacionFinalPapersTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
      
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.chupetinesGA.map((element, index) => {
        const { listaEventos, fases, fechalimite, calEva,calPresi} = element //destructuring
        return (
            <tr>
                <td>{listaEventos}</td>
                <td>{fases}</td>
                <td>{fechalimite}</td>
                <td>{calEva}</td>
                <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
               </td>    
            </tr>
        )
        })
    }
    renderTableHeader() {
       
        return (
         <tr>
            <th width="40%">Lista de eventos</th>
            <th width="15%">Fase actual/Num. Fases </th>
            <th width="25%">Fecha Limite</th>
            <th width="25%">Calificación (Evaluador - Presidente) </th>
            <th width="15%">Aprobar Propuestas</th>
         </tr>
        )
     }
  
     render() {
        this.state = this.props.data
        return (
            
           <div>
              
              <h1 id='title'><br/>Listado de enventos en fases de evaluacion</h1><br/>
              <h2></h2>
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

export default PresiCalificacionFinalPapersTable //exporting a component make it reusable and this is the beauty of react
