import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import '../styles/style_record.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import ListadoPropuestasAEvaluar from '../Components/Jtable/ListadoPropuestasAEvaluar';
import { tryStatement, throwStatement } from '@babel/types';
import EvaluadorEventosListados from './EvaluadorEventosListados';
import EvaluadorEvaluarPropuestas from './EvaluadorEvaluarPropuestas';

const Networking = require('../Network/Networking.js');

var numCriterios = 0;
var arreglo_aux = [];

var btnProp;
var btnEnt;

class EvaluadorEvaluarPropuesta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formActives: ListadoPropuestasAEvaluar,
      msg: "Not Connected",
      idEvaluador: 1,
      link_propuestabase64: '#',
      nombre_evento: "Evento 1",
      idEvento: 9999,
      idFase: 12345,
      datos_tabla: {
        Criterios: []
      },
      datos_tabla2: {
        Respuestas: []
      },
      idPropuesta: 0,
      nomb_propuesta: "",
      desc_propuesta: "",
      categorias_propuesta: [],
      nomb_autor: "",
      coautores: [
      ],


      calificacionFinal: 0,
      nivelExperticia: 0,
      obsPostulante: "",
      obsPresi: "",
      coevaluador: "",

      rptasCriterios: [],//arreglo de [1 , 2 , 3 , 4 .. 5]


    }
    this.handleNextChildComponentChange = this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps = this.handleNextChildComponentChangeProps.bind(this);
    this.evaluadorEvaluarPropuestas = this.evaluadorEvaluarPropuestas.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onRadioChange2 = this.onRadioChange2.bind(this);
    this.guardarCambios = this.guardarCambios.bind(this);

  }
  handleNextChildComponentChange(_nextChildComponent) {
    console.log('cambiando', _nextChildComponent);
    this.props.onNextChildComponentChange(_nextChildComponent);

  }
  handleNextChildComponentChangeProps(_nextChildComponentProps) {
    this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }

  componentWillMount() {
    console.log("WILL MOUNT")
    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);
    this.state.idEvaluador = retrievedJson.infoUsuario.idUsuario;
    console.log(retrievedJson);
    this.state.idEvento = this.props.idEvento;

    this.setState({
      nombre_evento: this.props.nextChildComponentProps.nomb_evento,
      idEvento: this.props.nextChildComponentProps.id_evento_nextProps,
      idFase: this.props.nextChildComponentProps.idFase,
      nomb_fase: this.props.nextChildComponentProps.nomb_fase,
      idPropuesta: this.props.nextChildComponentProps.idPropuesta,
      //idFase : this.props.idFase
    });

    //console.log("PROPS DEL BOTON: ",this.props);
    //console.log("id FASE JHAHAJAH",this.props.nextChildComponentProps.idFase);

    Networking.listarCriteriosXFase(this.props.nextChildComponentProps.idFase).then((value) => {
      console.log(value);

      if (value == null) {
        console.log('no hay algo aun');

      } else {
        console.log('si hay algo: A ACTUALIZAR EL ESTADO');
        this.setState({ datos_tabla: value });
        console.log("TABLA criterios: ", this.state.datos_tabla);
        numCriterios = this.state.datos_tabla.Criterios.length;
        for (let i = 0; i < numCriterios; i++) {
          this.state.rptasCriterios[i] = 0;
          arreglo_aux[i] = 0;
        }
        this.setState({ rptasCriterios: arreglo_aux });
      }

    });
    Networking.listarCamposRptaXFase(this.props.nextChildComponentProps.idPropuesta, this.props.nextChildComponentProps.idFase).then((value) => {
      console.log(value);

      if (value == null) {
        console.log('no hay algo aun');

      } else {
        console.log('si hay algo: A ACTUALIZAR EL ESTADO');
        this.setState({ datos_tabla2: value });
        console.log("TABLA criterios: ", this.state.datos_tabla2);
      }

    });

    Networking.mostrarCalificacionXPropuesta(retrievedJson.infoUsuario.idUsuario, this.props.nextChildComponentProps.idFase, this.props.nextChildComponentProps.idPropuesta).then((value) => {
      console.log("INazuma eleven <3", value);
      if (value.tieneCalif == 0) {
        console.log('No tenía evaluacion');
      }
      else {
        console.log('Tenia evaluacion... ahora debo pintarlas en front');
        this.state.calificacionFinal = value.calificacion;
        this.state.nivelExperticia = value.experticia;
        this.state.obsPostulante = value.obsPart;
        this.state.obsPresi = value.obsPresi;
        this.state.coevaluador = value.evalExt;
        //falta criterios

        for (var i = 0; i < value.Criterios.length; i++) {
          //console.log("for i in ",this.state.PreferenciasXCategoria[i]);
          //let keys = this.state.PreferenciasXCategoria[i];
          this.state.rptasCriterios[i] = value.Criterios[i].calificacion;
          arreglo_aux[i] = value.Criterios[i].calificacion;
        }
        this.setState({ rptasCriterios: arreglo_aux });
      }

    });

    Networking.detalle_propuesta(this.props.nextChildComponentProps.idPropuesta).then((value) => {
      console.log("detalle prop: ",value);

      if (value == null) {
        console.log('no hay algo aun');

      } else {
        console.log('COAUTORES : ',value.coautores);
        this.setState({
          nomb_propuesta: value.titulo,
          categorias_propuesta: value.categorias,
          desc_propuesta: value.resumen,
          coautores: value.coautores,
          nomb_autor: value.nombreAutor,
          //idFase : this.props.idFase
        });
        /*this.state.nomb_propuesta = value.titulo;
        this.state.categorias_propuesta = value.categorias;
        this.state.desc_propuesta = value.resumen;
        this.state.coautores = value.coautores;
        this.state.nomb_autor = value.nombreAutor;*/
        console.log('COAUTORES2 : ',this.state.coautores);

        btnProp = document.getElementById("button_propuesta");
        btnEnt = document.getElementById("button_entregable");

        if (value.tienePaper == 0 ){
          btnProp.disabled = true;
        }
        if (value.tieneEntregable == 0){
          btnEnt.disabled = true;
        }

        console.log("states de categorias y desc prop: ", this.state.categorias_propuesta, this.state.desc_propuesta);
      }

    });

  }

  //componentDidMount() {
    //console.log("BE OK! ",this.props);
    /*this.setState({
      nombre_evento: this.props.nextChildComponentProps.nomb_evento,
      idEvento: this.props.nextChildComponentProps.id_evento_nextProps,
      idEvaluador: this.props.nextChildComponentProps.idOrganizador_nextProps,
      idFase: this.props.nextChildComponentProps.idFase,
      nomb_fase: this.props.nextChildComponentProps.nomb_fase,
      idPropuesta: this.props.nextChildComponentProps.idPropuesta,
      nomb_propuesta: this.props.nextChildComponentProps.nomb_propuesta

      //idFase : this.props.idFase
    });*/
    //console.log("+++++< this.state.rptasCrit unos: ",this.state.rptasCriterios); //AQUI NO VA A MOSTRAR EL VERDADERO ID
  //}

  evaluadorEvaluarPropuestas = () => {
    this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
  }
  onRadioChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  }
  handleChange = (event, fieldName) => {
    this.setState({
      [fieldName]: event.target.value
    });
  }
  onRadioChange2 = (e, index) => {
    //this.state.rptasCriterios[[index]] = parseInt(e.target.value)
    arreglo_aux[[index]] = parseInt(e.target.value)
    this.setState({
      rptasCriterios: arreglo_aux
    });
    //console.log("avr cual cambia: ",this.state.rptasCriterios ,this.state.rptasCriterios[index]);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.rptasCriterios/*[0]*/ == nextState.rptasCriterios/*[0]*/) {
      return true;
    }
    if (this.state.nomb_propuesta != nextState.nomb_propuesta){
      return true;
    }
    if (this.state.idEvento != nextProps.idEvento){
      return true;
    }
    if (this.state.rptasCriterios/*[0]*/ != nextState.rptasCriterios/*[0]*/) {
      return true;
    }
    if (this.state.link_propuestabase64 != nextState.link_propuestabase64) {
      return true;
    }
    if (arreglo_aux != []) {
      return true;
    }
    if (nextState.idPropuesta == nextProps.idPropuesta) {//WAAA XDXD falta!!!
      return true;
    }
    /*if (nextProps.nomb_propuesta == nextState.nomb_propuesta) {
      return true;
    }*/
    return true;
  }
  handleClick = () => {
    console.log('redireccionando a ... FakeNewIni evento');
  }
  handleClickB = () => {
    var elIDpropuesta = 120;
    if (this.state.idPropuesta) {
      elIDpropuesta = this.state.idPropuesta
    }
    console.log("WAA XD: ", this.state.idPropuesta);
    console.log("a-->", document.getElementById('JinSSJ'));

    Networking.getPaper2(elIDpropuesta).then(
      (response) => {

        //console.log(">>>>>>>>>>>>>>>>>> Se descargo again ,", this.state.attempt);
        console.log("---->", response.Propuesta);
        this.setState({ link_propuestabase64: response.Propuesta,
        });
        //window.download(response.Propuesta, 'Save');
        if (btnProp.disabled === false ){
          document.getElementById('JinSSJ').click();
        }

      })
      .catch((err) => {
        console.log("error en conexión Propuesta");
      })
  }
  handleClickBE = () => {
    var elIDpropuesta = 120;
    if (this.state.idPropuesta) {
      elIDpropuesta = this.state.idPropuesta
    }
    console.log("WAA XD: ", this.state.idPropuesta);
    console.log("a-->", document.getElementById('JinSSJ2'));

    Networking.getEntregable(this.state.idFase, elIDpropuesta).then(
      (response) => {

        //console.log(">>>>>>>>>>>>>>>>>> Se descargo again ,", this.state.attempt);
        console.log("---->", response.Entregable);
        this.setState({ link_propuestabase64: response.Entregable,
        });
        //window.download(response.Propuesta, 'Save');
        if (btnEnt.disabled === false) {
          document.getElementById('JinSSJ2').click();
        }
      })
      .catch((err) => {
        console.log("error en conexión Propuesta");
      })
  }



  ListarCriterios() {
    return this.state.datos_tabla.Criterios.map((element, index) => {
      const { idCriterio, enunciado, idFase } = element
      return (
        <div>
          <h1 style={{ fontSize: 18 }}><br />{index + 1}. {enunciado}</h1>
          <div class="table-responsive">
            <table class="table  table-hover">
              <tbody><tr><td>
                <input type="radio"  //name={"radio".concat((indiceRadioB+index).toString())}
                  value={1}
                  checked={this.state.rptasCriterios[index] == 1}
                  onChange={event => this.onRadioChange2(event, index)} />Muy malo</td>
                <td><input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
                  value={2}
                  checked={this.state.rptasCriterios[index] == 2}
                  onChange={event => this.onRadioChange2(event, index)} />Malo</td>
                <td><input type="radio"  //name={"radio".concat((indiceRadioB+index).toString())}
                  value={3}
                  checked={this.state.rptasCriterios[index] == 3}
                  onChange={event => this.onRadioChange2(event, index)} />Regular</td>
                <td><input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
                  value={4}
                  checked={this.state.rptasCriterios[index] == 4}
                  onChange={event => this.onRadioChange2(event, index)} />Bueno</td>
                <td><input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
                  value={5}
                  checked={this.state.rptasCriterios[index] == 5}
                  onChange={event => this.onRadioChange2(event, index)} />Muy bueno</td>
              </tr></tbody></table>
          </div>

        </div>
      )
    })
  }
  ListarCalificacion() {
    return (
      <div>
        <h1 style={{ fontSize: 18 }}>Calificación final</h1>
        <div class="table-responsive">
          <table class="table  table-hover">
            <tbody><tr><td>
              <input type="radio" //name="radio2" 
                value={1}
                checked={this.state.calificacionFinal == 1}
                onChange={event => this.onRadioChange(event, "calificacionFinal")} />Fuertemente rechazado</td>
              <td><input type="radio" //name="radio2" 
                value={2}
                checked={this.state.calificacionFinal == 2}
                onChange={event => this.onRadioChange(event, "calificacionFinal")} />Rechazado</td>
              <td><input type="radio" //name="radio2" 
                value={3}
                checked={this.state.calificacionFinal == 3}
                onChange={event => this.onRadioChange(event, "calificacionFinal")} />Regular</td>
              <td><input type="radio" //name="radio2" 
                value={4}
                checked={this.state.calificacionFinal == 4}
                onChange={event => this.onRadioChange(event, "calificacionFinal")} />Aprobado</td>
              <td><input type="radio" //name="radio2" 
                value={5}
                checked={this.state.calificacionFinal == 5}
                onChange={event => this.onRadioChange(event, "calificacionFinal")} />Altamente aprobado</td>
            </tr></tbody></table>
        </div>

        <h1 style={{ fontSize: 18 }}>Nivel de experticia</h1>
        <div class="table-responsive">
          <table class="table  table-hover">
            <tbody><tr><td><input type="radio" // name="radio3" 
              value={1}
              checked={this.state.nivelExperticia == 1}
              onChange={event => this.onRadioChange(event, "nivelExperticia")} />Bajo</td>
              <td><input type="radio"//name="radio3" 
                value={2}
                checked={this.state.nivelExperticia == 2}
                onChange={event => this.onRadioChange(event, "nivelExperticia")} />Medio</td>
              <td> <input type="radio"// name="radio3" 
                value={3}
                checked={this.state.nivelExperticia == 3}
                onChange={event => this.onRadioChange(event, "nivelExperticia")} />Alto</td>
            </tr></tbody></table>
        </div></div>
    )
  }

  ListarObservaciones() {
    return (
      <div>
        <h1 style={{ fontSize: 18 }}>Para el Postulante:</h1>
        <textarea
          rows='5'
          type="text"
          className="form-control"
          value={this.state.obsPostulante}
          onChange={event => this.handleChange(event, "obsPostulante")}
          maxLength="300"
        />

        <h1 style={{ fontSize: 18 }}>Para el Presidente:</h1>
        <textarea
          rows='5'
          type="text"
          className="form-control"
          onChange={event => this.handleChange(event, "obsPresi")}
          value={this.state.obsPresi}
          maxLength="300"
        />

      </div>
    );
  }

  Coevaluador() {
    return (
      <div>
        <h1 style={{ fontSize: 18 }}>Este campo será llenado si la calificación no fue realizada por el mismo evaluador</h1>
        <input className="form-control" value={this.state.coevaluador} onChange={event => this.handleChange(event, "coevaluador")} />
      </div>
    )
  }
  ListarCamposP() {
    return this.state.datos_tabla2.Respuestas.map((element, index) => {
      const { campoPerEnun, campoPerDesc, rpta } = element
      return (
        <Row >
          <div class="form-group col-md">
            <h1 style={{ fontSize: 18 }}>{index + 1}. {campoPerEnun}</h1>
            <h1 style={{ fontSize: 15 }}>Respuesta: {rpta ? rpta : "NO CONTESTÓ"}</h1>
          </div>
        </Row>
      )
    })
  }
  ListarDetallesProp() {
    console.log("jishin mo tenakute: ", this.props);
    return (
      <div>
      <Row >
        <div class="form-group col-md">
          <h1 style={{ fontSize: 18 }}>Título:</h1>
          <h1 style={{ fontSize: 15 }}>{/*this.state.nomb_propuesta*/this.props.nextChildComponentProps.nomb_propuesta}</h1>
        </div>
      </Row>

      <Row >
        <div class="form-group col-md">
          <h1 style={{ fontSize: 18 }}>Resumen:</h1>
          <h1 style={{ fontSize: 15 }}>{this.state.desc_propuesta}</h1>
        </div>
      </Row>

      <Row >
        <div class="form-group col-md">
          <h1 style={{ fontSize: 18 }}>Categorías:</h1>
          <h1 style={{ fontSize: 15 }}>{this.state.categorias_propuesta.map(function (d, idx) {
            return (<li key={idx}>{d}</li>)
          })}
          </h1>
        </div>
      </Row>

      <Row >
        <div class="form-group col-md">
          <h1 style={{ fontSize: 18 }}>Autor:</h1>
          <h1 style={{ fontSize: 15 }}>{this.state.nomb_autor}</h1>
        </div>
      </Row>

      <Row >
        <div class="form-group col-md">
          <h1 style={{ fontSize: 18 }}>Coautores:</h1>
          <div style={{ paddingLeft: 60 }}>{this.state.coautores.map(function (d, idx) {
          return (<div><h1 key={idx} style={{ fontSize: 15 }}>Nombre: {d.nombreComp}</h1>
                  <h1 key={idx} style={{ fontSize: 15 }}>Afiliación: {d.afiliacion}</h1></div>
          )
          })}
          </div>
        <h1 style={{ fontSize: 15 }}>{this.state.coautores.nombreComp} {this.state.coautores.afiliacion}</h1>
        </div>
      </Row>
      </div>
    )
  }
  guardarCambios = () => {
    let data = {};
    let e = {};
    let crits = [];
    //console.log("LAS RESPueSTAS DE CRIT", this.state.rptasCriterios);

    this.state.datos_tabla.Criterios.map((element, index) => {
      const { idCriterio, enunciado, idFase } = element;
      e = JSON.parse(JSON.stringify({
        idCriterio: parseInt(idCriterio),
        calificacion: parseInt(this.state.rptasCriterios[index])
      }));
      crits.push(e);
      //console.log("EL E PES: ", e, this.state.rptasCriterios[index]);
    });
    //console.log("criterios : ",crits);


    data = JSON.stringify({
      idUsuario: this.state.idEvaluador,
      idFase: this.state.idFase,
      idPropuesta: this.state.idPropuesta,
      calificacion: parseInt(this.state.calificacionFinal),
      experticia: parseInt(this.state.nivelExperticia),
      obsPart: this.state.obsPostulante,
      obsPresi: this.state.obsPresi,
      evalExt: this.state.coevaluador,
      Criterios: crits
    });
    console.log("LO QUE VOY A MANDAR PARA GUARDAR...: ", data);

    Networking.registrarCalificacionXPropuesta(data).then((value) => {
      console.log(value);
      if (value == null) {
        console.log('devolvio null pero no se q devuelve el back :V');

      } else {
        console.log('Se inserto o actualizó pref :V');
        //alert("¡Se han guardado los cambios!");
      }
    });
    alert("¡Se han guardado los cambios!");

    this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
  }

  render() {
    console.log("KKAS", this.state);
    return (
      <div>
        <div style={{ marginLeft: 25 }}>
          <h1 style={{ fontSize: 35 }}><br />{this.state.nombre_evento}</h1>
          
        </div>

        <div>
        </div>

        <div className='container col-md-16' style={{ borderRadius: '4px', color: '#6CDCD6', alignItems: 'center', background: '#002D3D', margin: 'auto', maxWidth: '750px', minWidth: '330px', paddingRight: '2%', paddingLeft: '2%', }}>
          <br />
          <div className="col-md-12" style={{ fontSize: 25 }}>Fase: {this.state.nomb_fase}</div>
          <div className="col-md-4" style={{ color: '#6CDCD6', float: 'right' }}>

            <button
              id="button_propuesta"
              style={{ width: '150px', marginTop: 10, marginBottom: 10 }}
              className="specialButton"
              color="primary"
              onClick={this.handleClickB}
            ><i class="fa fa-download" style={{ color: '#6CDCD6' }}>Propuesta</i>
            </button>
            <a id='JinSSJ' href={this.state.link_propuestabase64} title="Descargar propuesta" download={"Propuesta"} ></a>

            <button
              id="button_entregable"
              style={{ width: '150px', marginTop: 10, marginBottom: 10 }}
              className="specialButton"
              color="primary"
              onClick={this.handleClickBE}
            ><i class="fa fa-download" style={{ color: '#6CDCD6' }}>Entregable</i>
            </button>
            <a id='JinSSJ2' href={this.state.link_propuestabase64} title="Descargar entregable" download={"Entregable"} ></a>

          </div>
          <br />
        </div>
        <br />
        <div class="container" >
          <div class="panel-group" style={styles.panel}>
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Detalles de la Propuesta</h1></div>
              <div class="panel-body">
                {this.ListarDetallesProp()}
              </div>
            </div>
            <br />
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Respuesta a Campos Personalizados</h1></div>
              <div class="panel-body">
                {this.ListarCamposP()}
              </div>
            </div>
            <br />
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Criterios</h1></div>
              <div class="panel-body">
                {this.ListarCriterios()}
              </div>
            </div>
            <br />
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Calificación</h1></div>
              <div class="panel-body">
                {this.ListarCalificacion()}
              </div>
            </div>
            <br />
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Observaciones</h1></div>
              <div class="panel-body">
                {this.ListarObservaciones()}
              </div>
            </div>
            <br />
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Coevaluador</h1></div>
              <div class="panel-body">
                {this.Coevaluador()}
              </div>
            </div>
            <br />
          </div>
          <div>
            <h3>
              <button class="mybutton" onClick={this.evaluadorEvaluarPropuestas} style={{ float: 'left' }}>Atras</button>
              <button class="mybutton" onClick={this.guardarCambios} style={{ float: 'right' }}>Guardar</button>
            </h3>
            <br /><br />
          </div>

        </div>
      </div>

    );
  }
}


export default EvaluadorEvaluarPropuesta;

var styles = {
  rotulos: {
    paddingRight: 80,
  },
  panel: {
    margin: 'auto',
    maxWidth: '750px',
    minWidth: '330px',
    paddingRight: '2%',
    paddingLeft: '2%',
  }
}
