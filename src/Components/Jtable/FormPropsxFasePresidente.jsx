import React, { Component } from 'react'
import '../../styles/style_sheets.css'; 
import ActionButton from './ActionButton';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ArrayOfChips from '../Forms/CreateEvent/ArrayOfChips';
const Networking = require('../../Network/Networking') ;
 
 
class ModalObsAdicional extends Component{
  formComentario(){
    //Debo conseguir todos los comentaros de los evaluadore
    let evaluadores=[];

    return evaluadores.map((element, index) => {
      const {evaluador,comentario} = element
      var indexEvent =index
      return (
        <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">{evaluador}</label>
              <div class="col-sm-6">
                  <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={comentario}/>
              </div>
        </div>
      )
    })
  }
  handleClickUpdateComentarios = () => {

  }
  render(){
    return(
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style={{paddingBottom:"0px",paddingRight:"5px",paddingTop:"0px"}}>
          <div class="modal-header" style={{paddingBottom:"5px"}}>
              <h3 style={{marginTop:"0px", marginBottom:"0px"}}>Observaciones  para el postulante</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          {this.formComentario()}

          <div className="modal-footer" style={{paddingRight:"0px"}}>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" onClick={(e)=>this.handleClickUpdateComentarios()} class="btn btn-primary"  data-dismiss="modal">Aceptar</button>
          </div>
          </div>
      </div>    
    )
  }
}

class ModalReasignarEvaluador extends Component{
  constructor(){
    super();
    this.state={
      evaluadorReemplazo:'',
      listaEvalReemplazo:[],
    }
  }
  handleClickUpdateEvaluador = () => {

  }
  render(){ 
    return(
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style={{paddingBottom:"0px",paddingRight:"5px",paddingTop:"0px"}}>
        <div class="modal-header" style={{paddingBottom:"5px"}}>
            <h3 style={{marginTop:"0px", marginBottom:"0px"}}>Reasignar Evaluador</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body" style={{paddingBottom:'0px'}}>
            <div class="form-group row">
              <label for="staticName" class="col-sm-4 col-form-label">Evaluador actual</label>
              <div class="col-sm-6">
                  <input type="text" readonly class="form-control-plaintext" id="staticName" value={"Sebastian"}/>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticName" class="col-sm-4 col-form-label">Titulo</label>
              <div class="col-sm-6">
              <ArrayOfChips 
                    auxLabel='auxevaluadorReemplazo'
                    aux={this.state.evaluadorReemplazo} 
                    //handlechange={this.handleAuxChange} 
                    lista={this.state.listaEvalReemplazo} 
                    //handleadd={this.props.handleChange2} 
                    tag="evaluadorReemplazo" 
                    label="correo"/> 
              </div>              
            </div>
        </div>
        <div className="modal-footer" style={{paddingRight:"0px"}}>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" onClick={(e)=>this.handleClickUpdateEvaluador()} class="btn btn-primary"  data-dismiss="modal">Aceptar</button>
        </div>
        </div>
      </div>    
  )
}
}

class ModalDetalleDeEvaluador extends Component{
  render(){
    return(
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style={{paddingBottom:"0px",paddingRight:"5px",paddingTop:"0px"}}>
          <div class="modal-header" style={{paddingBottom:"5px"}}>
              <h3 style={{marginTop:"0px", marginBottom:"0px"}}>Detalle de la propuesta</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div className="modal-body" style={{paddingBottom:'0px'}}>
            <div class="form-group row">
              <label for="staticName" class="col-sm-4 col-form-label">Holi boni perry</label>
            </div>
            
          </div>
          </div>
      </div> 
    )
  }
}
class ModalDetallePropuesta extends Component{


  render(){
    return(
      <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content" style={{paddingBottom:"0px",paddingRight:"5px",paddingTop:"0px"}}>
          <div class="modal-header" style={{paddingBottom:"5px"}}>
              <h3 style={{marginTop:"0px", marginBottom:"0px"}}>Detalle de la propuesta</h3>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div className="modal-body" style={{paddingBottom:'0px'}}>
            <div class="form-group row">
              <label for="staticName" class="col-sm-4 col-form-label">Titulo</label>
              <div class="col-sm-6">
                  <input type="text" readonly class="form-control-plaintext" id="staticName" value={this.props.propuestaActual.tituloPropuesta}/>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">Resumen</label>
              <div class="col-sm-6">
                  <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.props.propuestaActual.resumen}/>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">Autor</label>
              <div class="col-sm-6">
                  <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.props.propuestaActual.autor}/>
              </div>
            </div>
          </div>
          </div>
      </div>        
    )
  }
}


class FormPropsxFasePresidente extends Component { 
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {            
            tabla_propuestas: { //{nombre,idpropuesta,estado}
                Propuestas:[
                  {nombre:"Paper Big Gata invade pueblo perruno Estadistico", idPropuesta: 121, estado:"Aceptado",
                      evaluadores:[
                        {idEvaluador:20,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:21,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:22,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Alto"},
                        {idEvaluador:23,evaluador:"Sebastian Sanchez",calificacion:"Buena",experticie:"Bueno"}
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
            propuestaActual:{}     
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
    
   
  componentWillMount(){
    
    //SERVICIO AL BACKKKKKKKKKKKKKKKKKKKKK!!!
    //--------------------------------------
    Networking.listarPropuestasxEvento(this.props.nextChildComponentProps.idFase).then(
      (response) => {
        console.log(response);                
        if(response == null){
          console.log('no hay algo aun');
            
        }else {
          console.log('si hay algo:');
          this.setState({tabla_propuestas:response});
        } 
      }
    )
    
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
            
            <a  data-title="Edit" data-toggle="modal" data-target="#modalReasigEval" onClick={e => {this.showModalDetalle();}}>
              <ActionButton id_evento={this.state.idEvento} button_class ="fa fa-arrow-right" redirect_to="/"/>              
            </a>
            </td>  
            <td>
            <a  data-title="Edit" data-toggle="modal" data-target="#modalDetalleDeEv" onClick={e => {this.showModalDetalle();}}>
              <ActionButton id_evento={this.state.idEvento} button_class ="fa fa-plus" redirect_to="/"/>              
            </a>
            </td>  
        </tr>
        </tbody>
     )
  })
  }

  showModalDetalle = () => {

  }

  showModalDetallePropuesta = (idPropuesta) =>{
    Networking.detallePropuesta(idPropuesta).then(
      (response) => {
        console.log(response);                
        if(response == null){
          console.log('no hay algo aun');
            
        }else {
          console.log('si hay algo:');
          this.setState(
            {propuestaActual:{
                idPropuesta: response.idPropuesta,
                tituloPropuesta: response.tituloPropuesta,
                autor: response.autor,
                resumen:response.resumen,
                }
            }
          );
        } 
      }
    )


    

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
                  <a  data-title="Edit" data-toggle="modal" data-target="#modalDetalleProp" onClick={e => {this.showModalDetallePropuesta(idPropuesta);}} style={{color:"#337ab7", cursor:'pointer'}}>
                  {nombre}
                  </a>
                </div>
                
                <div className="col-md-2">
                  {estado}
                </div>
                
                <div className="col-md-1">
                  <a  data-title="Edit" data-toggle="modal" data-target="#modalObs" onClick={e => {this.showModalDetalle();}}>
                    <ActionButton id_evento={this.state.idEvento} button_class ="fa fa-file" redirect_to="/"/>
                  </a>
                </div>
                <div className="col-md-1" style={{float:'right', width:'50px'}}>
                  <Accordion.Toggle as={Button} variant="link" eventKey={indexEvent}>
                    <a><i class="fa fa-angle-down"/></a>
                  </Accordion.Toggle>
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
            
            <div className="modal fade" id="modalDetalleDeEv" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <ModalDetalleDeEvaluador />
            </div>
            <div className="modal fade" id="modalReasigEval" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <ModalReasignarEvaluador />
            </div>
            <div className="modal fade" id="modalObs" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <ModalObsAdicional />
            </div>
            <div className="modal fade" id="modalDetalleProp" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
              <ModalDetallePropuesta
               idPropuesta={this.state.propuestaActual}
              />
            </div>
          </div>
        )
     }
}

export default FormPropsxFasePresidente

