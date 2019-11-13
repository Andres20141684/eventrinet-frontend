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
import { Card } from '@material-ui/core';
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
        var indexEvent =index
         return( 
          <div>
          <div>
            <Card>
              <Card.Header 
                    className="col-md-12" 
                    id={"heading-"+String(idAccordion)+ "-2"}
                    key={idEvento}
                    >
              
              <div className="custom-control custom-checkbox  col-md-1">
              {idAccordion}
                    <label class="custom-control-label" for={idIndex}/>
                </div>
                
                <div className="col-md-6">
                  <a  data-title="Edit" data-toggle="modal" data-target="#modalDetalleProp" 
                  onClick={e => {this.showModalDetalle();}}>
                  {nombEvento}
                  </a>
                </div>
                
                <div className="col-md-2">
                  {"En fase"}
                </div>
                
                <div className="col-md-1">
                  <a  data-title="Edit" data-toggle="modal" data-target="#modalObs" 
                  onClick={e => {this.showModalDetalle();}}>
                    <JActionButton
                     onClick = {()=>this.handleDetail(evento.idEvento,
                                                               evento.nombre)}
                     button_class ="fa fa-file" 
                  />
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
          </div>

               <div class="card z-depth-0 bordered">
                  
                  <div class="card-header" id={"heading-"+String(idAccordion)+ "-2"} key={idEvento}>
                     <h5 class="mb-0">
                        <button 
                           class="btn btn-link" 
                           type="button" 
                           onClick = {this.handleClickMore}
                           data-toggle="collapse" 
                           data-target={"#collapse"+String(idAccordion)+"2"}
                           aria-expanded="true" 
                           aria-controls={"collapse"+String(idAccordion)+"2"}>
                           {nombEvento} - Fase: {faseActual}/{totFases}
                        </button>
                     </h5>
                  </div>
                  
                  <div id={"collapse"+String(idAccordion)+"2"} class="collapse" aria-labelledby={"heading-"+String(idAccordion)+ "-2"}
                     data-parent="#accordionExample275">
                     <div class="card-body">                
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
                     </div>
                  </div>
               </div></div>
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

/*
[
   {
     "idEvento": 1,
     "nombEvento": "Evento de la vaca 2",
     "faseActual": 2,
     "totFases": 2,
     "Propuestas": [
       {
         "idPropuesta": 36,
         "nombPropuesta": "eVENTO DE PRUEBA",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 37,
         "nombPropuesta": "eVENTO DE PRUEBA",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 38,
         "nombPropuesta": "eVENTO DE PRUEBA",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 39,
         "nombPropuesta": "eVENTO DE PRUEBA",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 40,
         "nombPropuesta": "eVENTO DE PRUEBA",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 41,
         "nombPropuesta": "Evento de JIN SAYAJIN",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 42,
         "nombPropuesta": "Evento de JIN SAYAJIN",
         "estado": "SUBIDO",
         "fechaLim": ""
       }
     ]
   },
   {
     "idEvento": 253,
     "nombEvento": "Evento de prueba",
     "faseActual": 2,
     "totFases": 3,
     "Propuestas": [
       {
         "idPropuesta": 44,
         "nombPropuesta": "tyvbunj",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 45,
         "nombPropuesta": "SSJ2",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 46,
         "nombPropuesta": "awer",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 47,
         "nombPropuesta": "WEF",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 48,
         "nombPropuesta": "AEFR",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 49,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 50,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 51,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 52,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 53,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 54,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 55,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 56,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 57,
         "nombPropuesta": "WCE",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 58,
         "nombPropuesta": "",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 59,
         "nombPropuesta": "avw",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 60,
         "nombPropuesta": "AEv",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 61,
         "nombPropuesta": "advf",
         "estado": "SUBIDO",
         "fechaLim": ""
       },
       {
         "idPropuesta": 62,
         "nombPropuesta": "como transformarse enSSJ",
         "estado": "SUBIDO",
         "fechaLim": ""
       }
     ]
   }
 ]
 
 */