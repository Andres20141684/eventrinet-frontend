import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'

const Networking = require('../../Network/Networking.js') ;


class Proposer_HistoryEventsTable  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataOrgTab1(8).then((value) => {
            this.setState({datos_tabla: value});   
            
      });
      console.log("rzwetxrytcvygbuhnj"+this.props);
   }
   
   handleClick = () => {
    console.log('this is:', this);
   }
 
   
   renderProposals(listProp){
      return listProp.map((element, index) => {
         const { prop} = element 
         return(
            <tr>
               <td  align= "left"> {index+1} &nbsp;&nbsp; {prop} </td>
               <td  align= "right">
                  <a href="#"> Ver detalle</a>
               </td> 
            </tr>
         )})
   }
   
   tableData() {
      return this.state.chupetines_RE.map((element, index) => {
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
                     data-parent="#accordionExample276">
                     <div class="card-body">
                        
                        <div  class="table-responsive">
                        <table class="table  table-hover">
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
         <div class="accordion" id="accordionExample276">
            {this.tableData()}
         </div>
            
         )
     }
}

export default Proposer_HistoryEventsTable  //exporting a component make it reusable and this is the beauty of react
