import React, { Component } from 'react'
import '../../styles/style_sheets.css';
import ActionButton from './ActionButton';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ArrayOfChips from '../Forms/CreateEvent/ArrayOfChips';
import Checkbox from "./Checkbox";
import PresiAsignarEvalEvents from '../../Pages/PresiAsignarEvalEvents'

const Networking = require('../../Network/Networking');
var OPTIONS = [];
var jason = {};

class ModalObsAdicional extends Component {
  formComentario(comentariosActual) {    
    
    let comentario = [
        {evaluador:'Michael Jackson',comentario:"Este chico es un travesin"},
        {evaluador:'Juana Arco',comentario:"Ni tu perro comeria tu tesis"},
    ];

    

    return comentario.map((element, index) => {
      const { evaluador, comentario } = element
      var indexEvent = index
      return (
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-4 col-form-label">{evaluador}</label>
          <div class="col-sm-6">
            <textarea readOnly className="form-control" id="staticEmail" rows="3" value={comentario}></textarea>            
          </div>
        </div>
      )
    })
  }
  render() {
    return (
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style={{ paddingBottom: "0px", paddingRight: "5px", paddingTop: "0px" }}>
          <div class="modal-header" style={{ paddingBottom: "5px" }}>
            <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>Observaciones  para el postulante</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {this.formComentario(this.props.comentariosActual)}
          
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-4 col-form-label">Observaciones Finales</label>
            <div class="col-sm-6">
            <textarea onChange= {(e) => this.props.handleSaveComentario(e)} className="form-control" id="staticEmail" rows="3" ></textarea>
            </div>
          </div>

          <div className="modal-footer" style={{ paddingRight: "0px" }}>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" onClick={(e) => this.props.handleClickUpdateComentarios()} class="btn btn-primary" data-dismiss="modal">Aceptar</button>
          </div>
        </div>
      </div>
    )
  }
}

class ModalReasignarEvaluador extends Component {
  constructor() {
    super();
    this.state = {
      evaluadorReemplazo: '',
      listaEvalReemplazo: [],
    }
  }
  handleClickUpdateEvaluador = () => {

  }
  render() {
    return (
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style={{ paddingBottom: "0px", paddingRight: "5px", paddingTop: "0px" }}>
          <div class="modal-header" style={{ paddingBottom: "5px" }}>
            <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>Reasignar Evaluador</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ paddingBottom: '0px' }}>
            <div class="form-group row">
              <label for="staticName" class="col-sm-4 col-form-label">Evaluador actual</label>
              <div class="col-sm-6">
                <input type="text" readonly class="form-control-plaintext" id="staticName" value={"Sebastian"} />
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
                  label="correo" />
              </div>
            </div>
          </div>
          <div className="modal-footer" style={{ paddingRight: "0px" }}>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" onClick={(e) => this.handleClickUpdateEvaluador()} class="btn btn-primary" data-dismiss="modal">Aceptar</button>
          </div>
        </div>
      </div>
    )
  }
}

class ModalDetalleDeEvaluador extends Component {
  render() {
    return (
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style={{ paddingBottom: "0px", paddingRight: "5px", paddingTop: "0px" }}>
          <div class="modal-header" style={{ paddingBottom: "5px" }}>
            <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>Detalle de la propuesta</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ paddingBottom: '0px' }}>
            <div class="form-group row">
              <label for="staticName" class="col-sm-4 col-form-label">Holi boni perry</label>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
class ModalDetallePropuesta extends Component {


  render() {
    console.log("EL MODAL JAJA: ", this.props);
    return (
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content" style={{ paddingBottom: "0px", paddingRight: "5px", paddingTop: "0px" }}>
          <div class="modal-header" style={{ paddingBottom: "5px" }}>
            <h3 style={{ marginTop: "0px", marginBottom: "0px" }}>Detalle de la propuesta</h3>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" style={{ paddingBottom: '0px' }}>
            <div class="form-group row">
              <label for="staticName" class="col-sm-4 col-form-label">Titulo</label>
              <div class="col-sm-6">
                <input type="text" readonly class="form-control-plaintext" id="staticName" value={this.props.estados.propuestaActual.tituloPropuesta} />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">Resumen</label>
              <div class="col-sm-6">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.props.estados.propuestaActual.resumen} />
              </div>
            </div>
            <div class="form-group row">
              <label for="staticEmail" class="col-sm-4 col-form-label">Autor</label>
              <div class="col-sm-6">
                <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.props.estados.propuestaActual.autor} />
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
        Propuestas: [/*
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
                */]
      },
      comentariosActual:{},
      propuestaActual: {},
      checkboxes: OPTIONS.reduce(
        (options, option) => (
          { //json , a cada uno de los Strings , le asignas false
            ...options,
            [option]: false
          }
        ), 
        {}       
      ),
      presiComentario:'',
    }
    this.handleNextChildComponentChange = this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps = this.handleNextChildComponentChangeProps.bind(this);
    this.handleAprobar = this.handleAprobar.bind(this);
    this.handleRechazar = this.handleRechazar.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }
  handleNextChildComponentChange(_nextChildComponent) {
    console.log('cambiando', _nextChildComponent);
    this.props.onNextChildComponentChange(_nextChildComponent);

  }
  handleNextChildComponentChangeProps(_nextChildComponentProps) {
    this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }

  /*shouldComponentUpdate(nextProps,nextState){
    return true;
  
  }*/
  componentWillMount() {
    console.log("props___ : ", this.props);

    //SERVICIO AL BACKKKKKKKKKKKKKKKKKKKKK!!!
    //--------------------------------------
    Networking.presidenteListarPropuestasXFase(this.props.idFase).then(
      (response) => {
        console.log(response);
        if (response == null) {
          console.log('no hay algo aun');

        } else {
          console.log('si hay algo:');
          this.setState({ tabla_propuestas: response });
          OPTIONS = response.Propuestas.map((e) => e.idPropuesta);
          console.log("dsps? :", OPTIONS);
          // < LINEAS SUPER IMPORTANTES
          jason = OPTIONS.reduce((jason, value, key) => { jason[value] = false; return jason; }, {});
          console.log("nuevo options", jason);
          this.setState({ checkboxes: jason });
        }
      }
    )

  }
  renderAccordionData(evaluadores, idPropuesta) {
    return evaluadores.map((element, index) => {
      const { evaluador, calificacion, experticie, idEvaluador } = element
      var indexEvent = index
      return (
        <tbody>
          <tr>
            <td>{evaluador} </td>
            <td>{calificacion}</td>
            <td>{experticie}</td> 
            <td>

              <a data-title="Edit" data-toggle="modal" data-target="#modalReasigEval" onClick={e => { this.showModalDetalle(); }}>
                <ActionButton id_evento={this.state.idEvento} button_class="fa fa-arrow-right" redirect_to="/" />
              </a>
            </td>
            <td>
              <a data-title="Edit" data-toggle="modal" data-target="#modalDetalleDeEv" onClick={e =>  this.showModalDetalleEvaluador(idEvaluador,idPropuesta)} title="Ver detalle de la evaluación">
                <ActionButton id_evento={this.state.idEvento} button_class="fa fa-plus" redirect_to="/" />
              </a>
            </td>
          </tr>
        </tbody>
      )
    })
  }

  showModalDetalleEvaluador = (idEvaluador,idPropuesta) => {


  }

  showModalDetalleObservaciones = (idPropuesta) => {
    //SERVICIO PARA LISTAR LAS OBSERVACIONES DE LA PROPUESTA SELECCIONADA
    /*Networking.observaciones_propuestas(idPropuesta).then(
      (response) => {
        console.log(response);
        if (response == null) {
          console.log('no hay algo aun');

        } else {
          console.log('si hay alg0: ', response);
          this.setState(
            {
              comentariosActual: {
                idPropuesta: idPropuesta,
                idEvaluador: '',
                comentarios:[ //comentarios: response.comentarios <----------------------------FALTAAAAAAAA<-------
                  {evaluador:'Luis Fonsi', comentario: 'VOy a jalar '},
                  {evaluador:'Juana de Arco', comentario: 'Piensa en tu vijeita y vota ese paper'}
                ],
              }
            });
          }
        });*/
      }


  showModalDetallePropuesta = (idPropuesta) => {
    Networking.detalle_propuesta(idPropuesta).then(
      (response) => {
        console.log(response);
        if (response == null) {
          console.log('no hay algo aun');

        } else {
          console.log('si hay alg0: ', response);
          this.setState(
            {
              propuestaActual: {
                idPropuesta: idPropuesta,
                tituloPropuesta: response.titulo,
                autor: response.nombreAutor,
                resumen: response.resumen,
              }
            }
          );
        }
      }
    );
  };

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  createCheckbox = option => (
    //console.log("option del createCheckBox", option),
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );
  
  handleReturn() {
    this.props.onNextChildComponentChange(PresiAsignarEvalEvents);
    //this.handleNextChildComponentChange(PresiAsignarEvalEvents);
  }

  handleAprobar() {
    let data = {};
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        //console.log("Se va a insertar: ", this.props.idFase, checkbox);
        data = JSON.stringify({
          idFase: parseInt(this.props.idFase),
          idPropuesta: parseInt(checkbox),
          obsFinal: "",//PARA CAMBIAR
          fuePersonalizado: 1,//PARA CAMBIAR
          msjPersonalizado: "¡Gracias por su interés, pasó a la siguiente fase!"//PARA CAMBIAR
        });
        Networking.aprobarPropuestaXFase(data).then((value) => {
          console.log(value);
          if (value == null) {
            console.log('devolvio null pero no se q devuelve el back :V');

          } else {
            console.log('Se inserto o actualizó pref :V');
          }

        });
      });
    //console.log("LO Q MANDO A BACK ES: ", data);
    alert("¡Se han guardado los cambios!")
    //this.handleReturn();
  }
  handleSaveComentario =(evt) =>{
    this.setState({presiComentario:evt.target.value});
    

  }
  handleClickUpdateComentarios=()=>{
    //Servicio para guardar el comentario del presii

  }
  handleRechazar() {
    let data = {};
    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        //console.log("Se va a insertar: ", this.props.idFase, checkbox);
        data = JSON.stringify({
          idFase: parseInt(this.props.idFase),
          idPropuesta: parseInt(checkbox),
          obsFinal: "",//PARA CAMBIAR
          fuePersonalizado: 1,//PARA CAMBIAR
          msjPersonalizado: "¡Gracias por su interés, sin embargo no pasó a la siguiente fase!"//PARA CAMBIAR
        });
        Networking.rechazarPropuestaXFase(data).then((value) => {
          console.log(value);
          if (value == null) {
            console.log('devolvio null pero no se q devuelve el back :V');

          } else {
            console.log('Se inserto o actualizó pref :V');
          }

        });
      });
    //console.log("LO Q MANDO A BACK ES: ", data);

    alert("¡Se han guardado los cambios!")
    //this.handleReturn();
  }

  tableData() {
    //this.setState.idUser_recived=this.props.idUser_recived;
    //console.log("SEbas props: ", this.props);

    return this.state.tabla_propuestas.Propuestas.map((element, index) => {
      const { idPropuesta, nombre, estado, evaluadores } = element
      var idIndex = "customCheck" + index
      var indexEvent = index
      return (
        <div>
          <Card>
            <Card.Header className="col-md-12">
              <div className="custom-control custom-checkbox  col-md-1">
                {
                  this.createCheckbox(idPropuesta)
                }

              </div>

              <div className="col-md-6">
                <a data-title="Edit" data-toggle="modal" data-target="#modalDetalleProp" onClick={e => { this.showModalDetallePropuesta(idPropuesta ); }} style={{ color: "#337ab7", cursor: 'pointer' }} title="Detalle de la propuesta">
                  {nombre}
                </a>
              </div>

              <div className="col-md-2">
                {estado}
              </div>

              <div className="col-md-1">
                <a data-title="Edit" data-toggle="modal" data-target="#modalObs" onClick={e => { this.showModalDetalleObservaciones(idPropuesta); }} title="Observaciones para el postulante">
                  <ActionButton id_evento={this.state.idEvento} button_class="fa fa-file" redirect_to="/" />
                </a>
              </div>
              <div className="col-md-1" style={{ float: 'right', width: '50px' }}>
                <Accordion.Toggle as={Button} variant="link" eventKey={indexEvent}>
                  <a><i class="fa fa-angle-down" /></a>
                </Accordion.Toggle>
              </div>

            </Card.Header>

            <Accordion.Collapse eventKey={indexEvent}>
              <div class="table-responsive" style={{ paddingTop: '20px', paddingLeft: '20%', paddingRight: '20%' }}>
                <table class="table  table-hover" >
                  <thead style={{ backgroundColor: "#002D3D", color: "#6CDCD6" }}>
                    <tr>
                      <th >Evaluador</th>
                      <th >Calificación</th>
                      <th >Experticie</th>
                      <th >Reasignar</th>
                      <th >Ver más</th>
                    </tr>
                  </thead>
                  {this.renderAccordionData(evaluadores,idPropuesta)}
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
          <ModalDetalleDeEvaluador 
          idEvaluador={this.state.idEvaluador}/>
        </div>
        <div className="modal fade" id="modalReasigEval" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <ModalReasignarEvaluador />
        </div>
        <div className="modal fade" id="modalObs" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <ModalObsAdicional
          comentariosActual={this.state.comentariosActual}
          handleClickUpdateComentarios ={this.handleClickUpdateComentarios}
          handleSaveComentario = {this.handleSaveComentario}
          />
        </div>
        <div className="modal fade" id="modalDetalleProp" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <ModalDetallePropuesta
            idPropuesta={this.state.propuestaActual}
            estados={this.state}
          />
        </div>
        <div><button
          style={{ float: 'right' }}
          class="mybutton"
          onClick={this.handleAprobar}
        >
          Aprobar
                    </button></div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '96px' }}>
          <button
            class="mybutton"
            onClick={this.handleRechazar}
          >
            Rechazar
                    </button>
        </div>
      </div>
    )
  }
}

export default FormPropsxFasePresidente

