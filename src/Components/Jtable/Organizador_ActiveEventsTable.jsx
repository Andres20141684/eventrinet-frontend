import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class Organizador_ActiveEventsTable  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   tableData() {
        return this.state.chupetinesGA.map((element, index) => {
        const { nombre, propRec, propEval, programa} = element //destructuring
        return (
            <tr>
                <td>{nombre}</td>
                <td>
                   <h1>
                      <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-check-circle"></i></button>
                    -<button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-check-circle"></i></button>
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
  
     render() {
        this.state = this.props.data
        console.log('this.props.data:', this.props.data);
        console.log('this.props.dataSSJ:', this.props.dataSSJ);
        return (
           <div >
              <h2 class="card-title" id='title' >Lista de Eventos activos</h2>
              <div  class="table-responsive">
              <table class="table-light" id='chupetinesGA'>
                  <thead class="thead-light">
                  <tr>
                     <th scope="col">Lista de eventos</th>
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
