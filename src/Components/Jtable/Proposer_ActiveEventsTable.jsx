import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import $ from 'jquery';
import {Link}  from "react-router-dom";
const Networking = require('./../../Network/Networking.js') ;


class Proposer_ActiveEventsTable  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      //console.log("HAAAAAAAAAAAAAAAAAAAAA")
      //Networking.populateDataOrgTab1(8).then((value) => {
            //this.setState({datos_tabla: value});   
      //});
      console.log("Holiboni"+this.props);
   }
   
   handleClick = () => {
    console.log('this is:', this);
  }

   handleClickMore = () => {
   
   }
     
   renderProposals(listProp){
      return listProp.map((element, index) => {
         const { prop, fase, estado, fechaLim } = element 
         return(
            <tr>
               <td> {index+1} &nbsp;&nbsp; {prop} </td>
               <td> {fase} </td>
               <td> {estado} </td>
               <td> {fechaLim } </td>
               <td>
                  <Link  to="/propDetailProposal"><i class="fa fa-plus-circle"/></Link>
               </td> 
            </tr>
         )})
   }
   
   tableData() {
      return this.state.chupetines_AE.map((element, index) => {
         const { evento,listProp} = element 
         var idAccordion = "accordion"+ index
         return(            
               <div class="card z-depth-0 bordered">
                  
                  <div class="card-header" id={"heading-"+String(idAccordion)+ "-2"}>
                     <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target={"#collapse"+String(idAccordion)+"2"}
                        aria-expanded="true" aria-controls={"collapse"+String(idAccordion)+"2"}>
                        {evento}
                        </button>
                     </h5>
                  </div>
                  
                  <div id={"collapse"+String(idAccordion)+"2"} class="collapse" aria-labelledby={"heading-"+String(idAccordion)+ "-2"}
                     data-parent="#accordionExample275">
                     <div class="card-body">
                        
                        <div  class="table-responsive">
                        <table class="table  table-hover">
                           <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                              <tr >
                                 <th align= "left" scope="col">Nombre de la propuesta</th>
                                 <th scope="col">N° Fases Comp. </th>
                                 <th scope="col">Estado</th>
                                 <th scope="col">Fecha límite</th>
                                 <th align="right" scope="col">Detalle</th>
                              </tr>
                           </thead>
                           <tbody>{this.renderProposals(listProp)}</tbody>
                        </table>
                        </div>                        
                     
                     </div>
                  </div>
               </div>
            )
         })

    }
  
      render() {
         this.state = this.props.data      
         return (
         <div class="accordion" id="accordionExample275">
            {this.tableData()}
         </div>
            
         )
     }
}

export default Proposer_ActiveEventsTable 