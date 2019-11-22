import React, { Component } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import '../../styles/style_sheets.css';
import ActionButton from './ActionButton';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ArrayOfChips from '../Forms/CreateEvent/ArrayOfChips';
import Checkbox from "./Checkbox";
import PresiAsignarEvalEvents from '../../Pages/PresiAsignarEvalEvents'

const Networking = require('../../Network/Networking');
var OPTIONS = [];
var jason = {};
 

const useStyles = makeStyles(theme => ({
  modal: { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
    paddingBottom:'10px',
    paddingLeft:'30px',
    paddingRight:'30px',
    paddingTop:'10px'
  },
}));


function formComentario (comentariosActual){  
  console.log("my props observaciones para el postulante modal",comentariosActual)
  return comentariosActual.map((element, index) => {
    const { evaluadorNombre, comentarioEvaluador } = element
    //const { comentario, evaluador } = element
    var indexEvent = index
    return (
      <div class="form-group row">
        <label for="staticEmail" class="col-sm-4 col-form-label">{evaluadorNombre}</label>
        <div class="col-sm-6">
          <textarea readOnly className="form-control" id="staticEmail" rows="3" value={comentarioEvaluador}></textarea>
        </div>
      </div>
    )
  });

}
function ModalObsAdicional(props){
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {        
        props.showModalDetalleObservaciones(props.idPropuesta, props.idFase);
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleCloseSaveandoComentario = () => {
      props.handleClickUpdateComentarios(props.idPropuesta);
      setOpen(false);
    };

    return (        
      <div>        
          <a data-title="Edit"  title="Observaciones para el postulante" onClick={handleOpen}>
            <ActionButton id_evento={props.idEvento} button_class="fa fa-file" redirect_to="/" />
          </a>      
        
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          nameUserSelected= {props.nameUserSelected}
        >
          <Fade in={open} style={{width:'40%'}}>
              <div className={classes.paper}>
                  <h3 id="transition-modal-title" >Observaciones para el postulante</h3>
                  <div id="transition-modal-description">
                    <div className="modal-body" style={{paddingBottom:'0px'}}>
                    {formComentario(props.comentariosActual)}
                    <div class="form-group row">
                      <label for="staticEmail" class="col-sm-4 col-form-label">Observaciones Finales</label>
                      
                      <div class="col-sm-6">
                        <textarea onChange={(e) => props.handleSaveComentario(e)} 
                                  className="form-control" id="staticEmail" rows="3" 
                                  value={props.presiComentario}
                                  //ng-readonly={this.props.presiComentario != '' ? this.props.presiComentario : ''}
                        ></textarea>
                      </div>

                    </div>
                   </div>
                  </div>
                  <div className="modal-footer" style={{paddingRight:"0px", paddingBottom:'0px'}}>
                    <Button type="button" class="btn btn-secondary" onClick={() => handleClose() }>Cancelar</Button>
                    <Button type="button" onClick={(e) =>handleCloseSaveandoComentario ()} class="btn btn-primary" data-dismiss="modal">Guardar</Button>
                  </div>
              </div>  
          </Fade>
        </Modal>
        </div>  
    );
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


function renderTableHeaderDetalleEval(){
  return (
    <tr style={{fontSize:'12px'}}>
        <th width="70%">Criterios de evaluación</th>
        <th width="30%">Calificación</th>
    </tr>)
}
function renderTableDataDetalleEval(Criterios){       
  return Criterios.map((element, index) => {
    const {criterio, calificacion} = element
       return (
       <tr style={{fontSize:'11px'}}>
           <td>{criterio}</td>
           <td>{calificacion}</td>
       </tr>
   )
   })
}
function ModalDetalleDeEvaluador(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
      props.showModalDetalleEvaluador(props.idEvaluador, props.idPropuesta, props.evaluador);
      console.log("my props",props);
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  }; 

  return (
    <div>   
      <a data-title="Edit" data-toggle="modal" data-target="#modalDetalleDeEv" onClick={handleOpen} title="Ver detalle de la evaluación">
        <ActionButton id_evento={2/*props.idEvento*/} button_class="fa fa-plus" redirect_to="/" />
      </a>

        <Modal
        style={{paddingTop:'10px',paddingBottom:'10px'}}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          nameUserSelected= {props.nameUserSelected}
        >
          <Fade in={open} >
              <div className={classes.paper}>                  
                  <div id="transition-modal-description">
                  <div class="form-row">
                      <input  style={{fontSize:'20px'}}readonly class="form-control-plaintext" value={'Revisado por '+ props.detalleCalificacionEvaluadorActual.evaluador}/>                    
                  </div>
                  <div class="form-row">
                      {/*<div class="form-group col-md-6">
                      <input  readonly class="form-control-plaintext" value={'Fase'+ props.idFase}/>
                      </div>
                      <div class="form-group col-md-6">*/}
                        <input  readonly class="form-control-plaintext" value={'Propuesta:'+ props.propuestas.tituloPropuesta}/>
                      {/*</div>*/}
                  </div>

                    <div className="modal-body" style={{paddingBottom:'0px'}}>
                    <form>
                      <div  class="table-responsive">
                        <table class="table  table-hover" >
                        <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                          {renderTableHeaderDetalleEval()}
                        </thead>
                            <tbody>{renderTableDataDetalleEval(props.detalleCalificacionEvaluadorActual.Criterios)}</tbody>
                        </table>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-7">
                        <label for="inputEmail4">Calificación Final</label>
                        <input readOnly type="text" class="form-control" id="inputEmail4"  value={props.detalleCalificacionEvaluadorActual.calificacion}/>
                      </div>
                      <div class="form-group col-md-5">
                        <label for="inputPassword4">Nivel de experticie</label>
                        <input readOnly type="text" class="form-control" id="inputPassword4"  value={props.detalleCalificacionEvaluadorActual.experticia}/>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Observaciones para el participante</label>
                      <textarea readOnly class="form-control" id="exampleFormControlTextarea1" rows="3" value={props.detalleCalificacionEvaluadorActual.obsPart}></textarea>
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Observaciones para el presidente</label>
                      <textarea readOnly class="form-control" id="exampleFormControlTextarea1" rows="3" value={props.detalleCalificacionEvaluadorActual.obsPresi}></textarea>
                    </div>
                    
                  </form>
        

                    </div>  
                  </div>
                  <div className="modal-footer" style={{paddingTop:"5px", paddingBottom:'0px'}}>
                    <Button type="button" class="btn btn-secondary" onClick={() => handleClose() }>Cerrar</Button>                    
                  </div>
              </div>  
          </Fade>
        </Modal>
    </div> 

    )
}

function ModalDetallePropuesta (props) {
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
        console.log("my props",props)
        props.showModalDetallePropuesta(props.idPropuesta)
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };    

    return (        
      <div> 
        <a data-title="Edit" data-toggle="modal" data-target="#modalDetalleProp" onClick={handleOpen} style={{ color: "#337ab7", cursor: 'pointer' }} title="Detalle de la propuesta">
            {props.nombre}
        </a>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          nameUserSelected= {props.nameUserSelected}
        >
          <Fade in={open} style={{width:'40%'}}>
              <div className={classes.paper}>
                  <h3 id="transition-modal-title" >Detalle de la propuesta</h3>
                  <div id="transition-modal-description">
                    <div className="modal-body" style={{paddingBottom:'0px'}}>
                      <div class="form-group row">
                        <label for="staticName" class="col-sm-4 col-form-label">Titulo</label>
                        <div class="col-sm-6">
                          <textarea type="text" readOnly className="form-control" id="staticName" value={props.estados.propuestaActual.tituloPropuesta} />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-4 col-form-label">Resumen</label>
                        <div class="col-sm-6">
                        <textarea readOnly className="form-control" type="text"  id="staticEmail" value={props.estados.propuestaActual.resumen} />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-4 col-form-label">Autor</label>
                        <div class="col-sm-6">
                          <textarea readOnly className="form-control"  type="text" id="staticEmail" value={props.estados.propuestaActual.autor} />
                        </div>
                      </div> 
                  </div>
                  </div>
                  <div className="modal-footer" style={{paddingRight:"0px", paddingBottom:'0px'}}>
                    <Button type="button" onClick={()=>handleClose()} className="btn btn-secondary">Cerrar</Button>
                  </div>
              </div>  
        </Fade>
        </Modal>
        </div>  
    );
  }


class FormPropsxFasePresidente extends Component {
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      tabla_propuestas: { //{nombre,idpropuesta,estado}
        Propuestas: []
      },
      comentariosActual: [],
      detalleCalificacionEvaluadorActual:{
        calificacion:'',
        experticia:'',
        obsPart:'',
        obsPresi:'',
        evalExt:'',
        Criterios:[],
        evaluador:''
      },
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
      presiComentario: " ",
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
              <ModalDetalleDeEvaluador
                idEvaluador={idEvaluador}
                idPropuesta={idPropuesta}
                evaluador={evaluador}
                idFase={this.props.idFase}
                detalleCalificacionEvaluadorActual={this.state.detalleCalificacionEvaluadorActual}
                propuestas ={this.state.propuestaActual}
                showModalDetalleEvaluador={this.showModalDetalleEvaluador}
              />
            </td>
          </tr>
        </tbody>
      )
    })
  }

  showModalDetalleEvaluador = (idEvaluador, idPropuesta,evaluador) => {
    console.log('props',this.props);
    
    Networking.mostrarCalificacionXPropuestaApresi(idEvaluador,this.props.idFase,idPropuesta).then(
      (response) => {
        console.log(response);
        if (response == null) {
          console.log('no hay algo aun');
        }
        if (response.succeed){
          console.log('si hay algo: ', response);
          this.setState({
            detalleCalificacionEvaluadorActual:{
              calificacion:response.calificacion,
              experticia:response.experticia,
              obsPart:response.obsPart,
              obsPresi:response.obsPresi,
              evalExt:response.evalExt,
              Criterios:response.Criterios,
              evaluador:evaluador,
            }
          })
        }else {
          console.log('Hay errores', response);
          }
          this.showModalDetallePropuesta(idPropuesta);
        });

  }

  showModalDetalleObservaciones = (idPropuesta, idFase) => {
    //SERVICIO PARA LISTAR LAS OBSERVACIONES DE LA PROPUESTA SELECCIONADA

    Networking.observaciones_propuestas(idPropuesta,this.props.idFase).then(
      (response) => {
        console.log(response);
        if (response == null) {
          console.log('no hay algo aun');

        } else {
          console.log('si hay alg0: ', response);
          this.setState(
            {
              comentariosActual: 
                //idPropuesta: idPropuesta,
                //idEvaluador: '',
                /*comentarios:[*/response.comentarios //<----------------------------FALTAAAAAAAA<-------
                /*{evaluador:'Luis Fonsi', comentario: 'VOy a jalar '},
                {evaluador:'Juana de Arco', comentario: 'Piensa en tu vijeita y vota ese paper'}
              ],*/,
              presiComentario:response.obsPresidente,
              
            });
          console.log("ACTUAL COMM: ", this.state.comentariosActual)
        }
      });
  }



  showModalDetallePropuesta = (idPropuesta) => {
    console.log("showModalDetallePropuesta:  mando idpropuesta",idPropuesta)
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
          fuePersonalizado: 0,//PARA CAMBIAR
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

	handleSaveComentario = (evt) => {
    this.setState({ presiComentario: evt.target.value });
    console.log('comentPresi', this.state.presiComentario)
    this.state.presiComentario = evt.target.value;
    console.log('comentPresix2', this.state.presiComentario)
  }
  handleClickUpdateComentarios = (idPropuesta) => {
    //Servicio para guardar el comentario del presii
    //Falta el servicon en NETOWORKINGGGGGGGGGGGGGGGGGGG    

    console.log('guardando comentario del presi',this.props.idFase,' ',this.state.presiComentario,' ',idPropuesta)    
    Networking.updateComentarios(this.props.idFase,this.state.presiComentario,idPropuesta).then(
      (response) => {
        console.log(response);
        if (response == null) {
          console.log('no hay algo aun');

        } else {
          console.log('si hay alg0: ', response);
          }
        });

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
    console.log("SEbas props: ", this.props);

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
                
                <ModalDetallePropuesta
                  idPropuesta={idPropuesta}
                  estados={this.state}
                  showModalDetallePropuesta = {this.showModalDetallePropuesta}
                  nombre={nombre}
                />
              </div>

              <div className="col-md-2">
                {estado}
              </div>

              <div className="col-md-1">
                <ModalObsAdicional
                  idPropuesta= {idPropuesta}
                  idFase={this.props.idFase}
                  comentariosActual={this.state.comentariosActual}
                  handleClickUpdateComentarios={this.handleClickUpdateComentarios}
                  handleSaveComentario={this.handleSaveComentario}
                  showModalDetalleObservaciones = {this.showModalDetalleObservaciones}
                  presiComentario={this.state.presiComentario}
                />
                
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
                  {this.renderAccordionData(evaluadores, idPropuesta)}
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

        <div className="modal fade" id="modalReasigEval" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <ModalReasignarEvaluador />
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

