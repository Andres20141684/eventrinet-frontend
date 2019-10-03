import React, { Component } from 'react'
import './../../styles/Jtab.css'
class Organizador_HistoryventsTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
      
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.chupetinesGA.map((element, index) => {
        const { listaEventos, propRec, propEval, programa} = element //destructuring
        return (
            <tr>
                <td>{listaEventos}</td>
                <td>
                   <h1>
                      <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-check-circle"></i></button>
                    - <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-check-circle"></i></button>
                    - <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-check-circle"></i></button>
                  </h1>
               </td> 
               <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-edit"></i></button>
               </td> 
               <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
               </td> 
               
               <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-play"></i></button>
               </td> 
               <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-times-circle"></i></button>
               </td> 
                
            </tr>
        )
        })
    }
    renderTableHeader() {
        
        return (
            <tr>
                <th width="35%">Lista de eventos</th>
                <th width="30%">Prop. rec. -> En eval. -> Prog. comp. </th>
                <th width="12%">Editar</th>
                <th width="12%">Seg. de fases</th>
                <th width="8%">Publicar evento</th>
                <th width="4%">Cancelar</th>
            </tr>

        )
     }
  
     render() {
        this.state = this.props.data
        return (
            
           <div>
              <h1 id='title'><br/>Lista de Eventos activos</h1><br/>
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

export default Organizador_HistoryventsTable //exporting a component make it reusable and this is the beauty of react
