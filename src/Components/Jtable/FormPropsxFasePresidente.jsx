import React, { Component } from 'react'
import '../../styles/style_sheets.css'; 
import ActionButton from './ActionButton';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Networking = require('../../Network/Networking') ;
 
class ModalObsAdicional extends Component{

}

class ModalReasignarEvaluador extends Component{

}

class ModalDetalleDeEvaluador extends Component{

}



class FormPropsxFasePresidente extends Component { 
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idEvento:0,
            tabla_propuestas: { //{nombre,idpropuesta,estado}
                Propuestas:[
                  {nombre:"Paper Big Gata invade pueblo perruno Estadistico", idPropuesta: 121, estado:"Aceptado",
                      evaluadores:[
                        {idEvaluador:20,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:21,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:22,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:23,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"}
                      ]
                  },
                  {nombre:"Paper Big Gata invade pueblo perruno Estadistico", idPropuesta: 121, estado:"Aceptado",
                      evaluadores:[
                        {idEvaluador:1,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:2,evaluador:"Lis Sanchez",calificacion:"Baja",experticie:"Alto"},
                        {idEvaluador:3,evaluador:"Julian Perez",calificacion:"Buena",experticie:"Alto"}
                      ]
                  },
                  {nombre:"Paper Big Gata invade pueblo perruno Estadistico", idPropuesta: 121, estado:"Aceptado",
                      evaluadores:[
                        {idEvaluador:4, evaluador:"Santi Moreno", calificacion:"Buena", experticie:"Alto"},
                        {idEvaluador:5, evaluador:"Marino Sanchez", calificacion:"Buena", experticie:"Regular"},
                        {idEvaluador:6, evaluador:"Marcelo Ruiz", calificacion:"Buena", experticie:"Alto"},
                        {idEvaluador:7, evaluador:"Sebastian Sanchez", calificacion:"Buena", experticie:"Regular"}
                      ]
                  },
                  {nombre:"MArimar Au costeñita soy invade pueblo", idPropuesta: 122, estado:"Aceptado",
                      evaluadores:[
                        {idEvaluador:8, evaluador:"Misael Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:9, evaluador:"Cristina Rene",calificacion:"Lacraza",experticie:"Alto"},
                        {idEvaluador:10, evaluador:"Nancy Felipe",calificacion:"Media",experticie:"Alto"},
                        {idEvaluador:11, evaluador:"Sebastian Sanchez",calificacion:"Caca",experticie:"Bajo"}
                      ]
                  },
                  {nombre:"Del pato al pozo y del pozo al pato", idPropuesta: 123, estado:"Aceptado",
                      evaluadores:[
                        {idEvaluador:31,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:32,evaluador:"Karla Marin",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:33,evaluador:"Marimar Auuu",calificacion:"Alta",experticie:"Alto"}
                      ]
                  },
                  
                ]
            },
            fase:0            
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    }
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    
     
   handleClick = () => {
    console.log('this is:', this);
  }
  componentWillMount(){
    console.log("cambie de componet y el props pasado es:",this.props.nextChildComponentProps);    
    this.setState(
        {idEvento:this.props.idEvent,
         fase:this.props.fase,
         });
    
    console.log("Seteado todos los valores del state",this.state);
    
    this.state.idEvento=this.props.idEvent;
    this.state.fase=this.props.fase;

    console.log("Seteado todos los valores del state pero a la mala xq no se pudo :v",this.state);
  }
  renderAccordionData(evaluadores){
    return evaluadores.map((element, index) => {
      const {evaluador,calificacion,experticie,idEvaluador} = element
      var indexEvent =index
      return (
        <tbody>
          <tr>
            <td>{evaluador} </td>
            <td>{calificacion}</td>
            <td>{experticie}</td>
            <td>
              <ActionButton id_evento={this.state.idEvento} button_class ="fa fa-arrow-right" redirect_to="/"/>              
            </td>  
            <td>
              <ActionButton id_evento={this.state.idEvento} button_class ="fa fa-plus" redirect_to="/"/>              
            </td>  
        </tr>
        </tbody>
     )
  })
}

  tableData() {
    //this.setState.idUser_recived=this.props.idUser_recived;

      return this.state.tabla_propuestas.Propuestas.map((element, index) => {       
        const {idPropuesta,nombre,estado,evaluadores} = element
        var idIndex = "customCheck"+ index
        var indexEvent =index
        return (
          <div>
            <Card>
              <Card.Header className="col-md-12">
                <div className="custom-control custom-checkbox  col-md-1">
                    <input type="checkbox" className="custom-control-input" id={idIndex} />
                    <label class="custom-control-label" for={idIndex}/>
                </div>
                
                <div className="col-md-6">
                  <Accordion.Toggle as={Button} variant="link" eventKey={indexEvent}>
                  {nombre}
                  </Accordion.Toggle>
                </div>
                
                <div className="col-md-2">
                  {estado}
                </div>
                
                <div className="col-md-1">
                  <ActionButton id_evento={this.state.idEvento} button_class ="fa fa-file" redirect_to="/"/>
                </div>
                <div className="col-md-1" style={{float:'right', width:'15px'}}>
                  <a>
                    <i class="fa fa-angle-down"/>
                  </a>
                </div>
                
              </Card.Header>
            
              <Accordion.Collapse eventKey={indexEvent}>
                <div  class="table-responsive" style={{paddingTop:'20px',paddingLeft:'20%', paddingRight:'20%'}}>
                  <table class="table  table-hover" >
                  <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                    <tr>
                      <th >Evaluador</th>
                      <th >Calificación</th>
                      <th >Experticie</th>
                      <th >Reasignar</th>
                      <th >Ver más</th>
                    </tr>
                  </thead>
                  {this.renderAccordionData(evaluadores)}                      
                  </table>
                </div>
              </Accordion.Collapse>
            </Card>
          </div>
       )
    })
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

export default FormPropsxFasePresidente

