import React, { Component } from 'react'
import './../../styles/Jtab.css'
import { stringify } from 'querystring';
class EvaluadorEventosEvaluarTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
      
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  selectiva(calificado_Evaluador){
   if (stringify(calificado_Evaluador).localeCompare('Si')) {
      return 'si calificado_Evaluador'
   } else {
      return 'no calificado_Evaluador'
   }
  }
   renderTableData() {
        return this.state.chupetinesGA.map((element, index) => {
        const { listaeventos, Fase_Actual_Fases_Totales,calificado_Evaluador, Fecha_limite} = element //destructuring
        return (
            <tr>
                <td>{listaeventos}</td>
                <td>{Fase_Actual_Fases_Totales}</td>
                
                <td>{this.selectiva({calificado_Evaluador})}</td>
                  
                  
                <td>{Fecha_limite}</td>
                <td><button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
                </td>
            </tr>
        )
        })
    }
    renderTableHeader() {
        let header = Object.keys(this.state.chupetinesGA[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
  
     render() {
        this.state = this.props.data
        return (
            
           <div><br/><br/>
              <h1 id='title'>Elige un evento y evalua las propuestas asignadas</h1><br/><br/>
              <table id='chupetinesGA'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}

export default EvaluadorEventosEvaluarTable //exporting a component make it reusable and this is the beauty of react
