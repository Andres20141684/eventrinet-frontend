import React, { Component } from 'react'
import './../../styles/Jtab.css'
class Organizador_ActiveEventsTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
      
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.chupetinesGA.map((element, index) => {
        const { listaEventos} = element //destructuring
        return (
            <tr >
                <td>{listaEventos}</td>
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
        this.state = this.props.data
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

export default Organizador_ActiveEventsTable //exporting a component make it reusable and this is the beauty of react
