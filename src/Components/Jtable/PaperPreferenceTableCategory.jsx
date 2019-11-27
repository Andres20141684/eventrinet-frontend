import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import $ from 'jquery';
import {Link}  from "react-router-dom";
import { NetworkMutation_JAchievingData } from '../../Network/Networking';
import JTable from './JTable';
import JActionButton from '../Special/JActionButton';
import EventDetail from '../EventDetail';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


class PaperPreferenceTableCategory  extends Component {
   constructor(props) {
      super(props) 
      
      this.state = {
        idUser: 0,
         datos_tabla1: []

      }
      
      console.log("Proposer_ActiveEventsTable",this.props);
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  
  }
  /* aqui debo manejar lo cambios de redireccion y de props de mis tablas XD */
  handleNextChildComponentChange(_nextChildComponent){
  console.log('cambiando', _nextChildComponent);
      this.props.onNextChildComponentChange(_nextChildComponent);
      
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }

   componentWillMount(){
      /** existirá el servicio de obtener los eventos y adentro las categorias con mi Id */
      this.setState({idUser:this.props.idUser});
      
   }
   handleDetail(value){
    this.props.onNextChildComponentChangeProps(value);
      this.props.onNextChildComponentChange(EventDetail);
   }
   renderProposals(listEvaluador) {
      /* el Link se va al detalle de propuesta */
      console.log("lISTA DE EVALUADORES",listEvaluador)
      return listEvaluador.map((evaluador, index) => {
         
         const { nombreCompleto,eleccion } = evaluador 
         return(
            
            <tr key = {nombreCompleto}>
               <td> {index+1} &nbsp;&nbsp; {nombreCompleto} </td>
               <td> {eleccion}</td>
            </tr>
         )})
   }
 
   tableData() {
      return this.props.data.map((evento, index) => {
         const { DatosPropuesta,Prefencias} = evento 
         var idAccordion = "accordion"+ index
         var idIndex = "customCheck"+ index
          var indexEvent =DatosPropuesta
         return( 

            <Card>
            <Card.Header className="col-md-12" style={{height:"50px"}}>              
              <div className="col-md-6">
                <a  data-title="Edit" 
                    data-toggle="modal" 
                    data-target="#modalDetalleProp" 
                    onClick={e => {this.showModalDetalle();}} 
                    style={{color:"#337ab7", cursor:'pointer',fontSize: '15px'}}>
                {DatosPropuesta} 
                </a>
              </div>

              <div className="col-md-1" style={{float:'right', width:'50px'}}>
                <Accordion.Toggle as={Button} variant="link" eventKey={indexEvent}>
                  <a><i class="fa fa-angle-down"/></a>
                </Accordion.Toggle>
              </div>
              
            </Card.Header> 


            <Accordion.Collapse eventKey={indexEvent}>
                                  <JTable
                                    
                                    body ={()=>this.renderProposals(Prefencias)}
                                    headers={()=>(<tr >
                                                  <th align= "left" scope="col">Nombre del evaluador</th>
                                                  <th scope="col">Eleccion </th>
                                                  </tr>)}
                                    
                                />
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
               
      return (
        <div>
        <Accordion defaultActiveKey="0" className="table-responsive">
                {this.tableData()}
        </Accordion> 
        </div>

            
         )
     }
}

export default PaperPreferenceTableCategory 

