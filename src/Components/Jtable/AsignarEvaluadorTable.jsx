import React, { Component } from 'react'
import './../../styles/Jtab.css'
class AsignarEvaluadorTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
      
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.chupetinesGA.map((element, index) => {
            const { listaEventos, propAsignadas, iniEval} = element //destructuring
            
                     return (
                        
                        <tr>
                           <td>{listaEventos} </td>
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
       <tr>
          <th width="20%">Lista de eventos</th>
          <th width="18%">Propuestas<br/>Asignadas/Total </th>
          <th width="22%">Inicio Evaluadion Limite</th>
          <th width="15%">Asignar Evaluadores (Evaluador - Presidente) </th>
          <th width="15%">Editar fases</th>
       </tr>
      )
   }

  
     render() {
        this.state = this.props.data
        return (
            
           <div>
              <br/>
              <h1 id='title'><br/>Listado de enventos por iniciar</h1><br/><br/>
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

export default AsignarEvaluadorTable //exporting a component make it reusable and this is the beauty of react
