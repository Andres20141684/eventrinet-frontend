import React, { Component } from 'react'
import './../../styles/Jtab.css'
class EvaluadorEventosTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
      
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.chupetinesGA.map((element, index) => {
        const { listaeventos, Fecha_maxima, Tipo_Preferencia} = element //destructuring
        return (
            <tr>
                <td>{listaeventos}</td>
                <td>{Fecha_maxima}</td>
                <td>{Tipo_Preferencia}</td>
                <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
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
            
         <div  class="table-responsive">
            <table class="table  table-hover" >
               <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                  <tr>{this.renderTableHeader()}</tr>
               </thead>
               <tbody>           
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
        )
     }
}

export default EvaluadorEventosTable //exporting a component make it reusable and this is the beauty of react
