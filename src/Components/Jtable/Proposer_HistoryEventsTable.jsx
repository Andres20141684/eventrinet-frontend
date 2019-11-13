import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const Networking = require('../../Network/Networking.js') ;


class Proposer_HistoryEventsTable  extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataOrgTab1(8).then((value) => {
            this.setState({datos_tabla: value});   
            
      });
      console.log("rzwetxrytcvygbuhnj"+this.props);
      this.state = {
         datos_tabla1: []
      }
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
      return this.props.data.map((element, index) => {
         const { evento,listProp} = element 
         var idAccordion = "accordion"+ index
         var indexEvent=index
         return(            
            <Card>
               <Card.Header className="col-md-12">
                  <h5 class="mb-0">
                  <Accordion.Toggle as={Button} variant="link" eventKey={indexEvent}>
                     <button class="btn btn-link" type="button">
                     {evento}
                     </button>
                  </Accordion.Toggle>
                  </h5>
               </Card.Header>
               <Accordion.Collapse eventKey={indexEvent}>
                  <div class="card-body">
                     <div  class="table-responsive">
                     <table class="table  table-hover">
                        <tbody>{this.renderProposals(listProp)}</tbody>
                     </table>
                     </div>
                  </div>
               </Accordion.Collapse>
            </Card>
            )
         })

   }
   componentWillMount(){
      console.log("<<proposerAcTable: ",this.props );
      this.setState({
         datos_tabla: this.props.data
      });
   }
  
   render() {
      this.state = this.props.data      
      return (
         <Accordion defaultActiveKey="0" id="accordionExample275" className="table-responsive">
            {this.tableData()}
         </Accordion>
      )
   }
}

export default Proposer_HistoryEventsTable