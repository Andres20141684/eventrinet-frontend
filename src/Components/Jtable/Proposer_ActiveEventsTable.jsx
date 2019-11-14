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


class Proposer_ActiveEventsTable  extends Component {
   constructor(props) {
      super(props) 
      
      this.state = {
         idProposer: 0,
         datos_tabla1: []

      }
      
      console.log("Holiboni",this.props);
   }
   

   handleClick = () => {
      console.log('this is:', this);
   }

   handleClickMore = () => {

   
   }
   componentDidMount(){
      /** existirá el servicio de obtener los eventos y adentro las categorias con mi Id */
      
      
   }
   handleEditButton(){
      this.props.onNextChildComponentChange(EventDetail);
   }
   renderProposals(listProp) {
      console.log("llegue 1",listProp);
      /* el Link se va al detalle de propuesta */
      return listProp.Propuestas.map((propuesta, index) => {
         console.log("llegue 2");
         const { idPropuesta,nombPropuesta,estado,fechaLim } = propuesta 
         return(
            
            <tr key = {idPropuesta}>
               {console.log("llegue 1",propuesta.idPropuesta)}
               <td> {index+1} &nbsp;&nbsp; {nombPropuesta} </td>
               <td> N-ésima </td>
               <td> {estado} </td>
               <td> {fechaLim} </td>
               <td>
                  <JActionButton
                  onClick = {()=>this.handleEditButton(
                                 
                              )}
                  button_class ="fa fa-plus-circle"
                  />
                  
               </td> 
            </tr>
         )})
   }
   showModalDetalle(){

   }



   handleDetail =(idE,nom)=>{
    
    this.handleNextChildComponentChangeProps({   
      id_evento_nextProps: idE,
      nomb_evento: nom
      
   });
    //this.handleNextChildComponentChange(NewEventPage);
 }
   tableData() {
      return this.props.data.map((evento, index) => {
         const { idEvento,nombEvento,faseActual,totFases,listProp} = evento 
         console.log("llegue 0",evento);
         var idAccordion = "accordion"+ index
         var idIndex = "customCheck"+ index
          var indexEvent =idEvento
         return( 

            <Card>
            <Card.Header className="col-md-12">
              <div className="custom-control custom-checkbox  col-md-1">
                  <input type="checkbox" className="custom-control-input" id={idIndex} />
                  <label class="custom-control-label" for={idIndex}/>
              </div>
              
              <div className="col-md-6">
                <a  data-title="Edit" 
                    data-toggle="modal" 
                    data-target="#modalDetalleProp" 
                    onClick={e => {this.showModalDetalle();}} 
                    style={{color:"#337ab7", cursor:'pointer'}}>
                {nombEvento} - Fase Actual: {faseActual}/{totFases}
                </a>
              </div>
              
              <div className="col-md-2">
                {<p>Activo</p>}
              </div>
              
              <div className="col-md-1">
                <a  data-title="Edit" data-toggle="modal" data-target="#modalObs" onClick={e => {this.showModalDetalle();}}>
                  <JActionButton button_class ="fa fa-file" onClick={()=>{return;}}/>
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
                                    
                                    body ={()=>this.renderProposals(evento)}
                                    headers={()=>(<tr >
                                                  <th align= "left" scope="col">Nombre de la propuesta</th>
                                                  <th scope="col">N° Fases Comp. </th>
                                                  <th scope="col">Estado</th>
                                                  <th scope="col">Fecha límite</th>
                                                  <th align="right" scope="col">Detalle</th>
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

export default Proposer_ActiveEventsTable 