import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import ElegirPrefPropuesta from '../../Pages/ElegirPrefPropuestas.jsx'
import EvaluadorEventosListados from '../../Pages/EvaluadorEventosListados.jsx';
import RadioButton from "./RadioButton";

const Networking = require('../../Network/Networking.js');

var OPTIONS = [];
var jason = {};
var numPropuestas = 0;
var arreglo_aux = [];

class ListadoPropPorEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seleccion: [],
      idUser_recived: 0,
      datos_tabla: {
        Propuestas: [
        ]
      },
      idEvento: 0,
      //almacena los ids Propuesta 
      datajs: {},
      PreferenciasXPropuestas: [999],
      rememberMe: false,
      idEvento: 0,
      //idEvaluador : 0,
      radioButtons: OPTIONS.reduce(
        (options, option) => (
          { //json , a cada uno de los Strings , le asignas false
            ...options,
            [option]: false
          }
        ),
        {}
      ),

      rptaPref: []
    }
    this.handleNextChildComponentChange = this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps = this.handleNextChildComponentChangeProps.bind(this);
    this.onRadioChange = this.onRadioChange.bind(this);
    this.guardarCambios = this.guardarCambios.bind(this);
  }
  handleNextChildComponentChange(_nextChildComponent) {
    this.props.onNextChildComponentChange(_nextChildComponent);

  }
  handleNextChildComponentChangeProps(_nextChildComponentProps) {
    this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }
  componentWillMount() {
    console.log("WILL MOUNT")
    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);
    this.state.idUser_recived = retrievedJson.infoUsuario.idUsuario;
    this.state.idEvento = this.props.idEvento;
    console.log(retrievedJson);
    console.log("cosas IMPORTANTES:", this.props);
    console.log('&&this.props.idEvento: ', this.props.idEvento);
    //listar simple de todas las propuestas del evento
    Networking.listar_propuestasPorEvento(this.props.idEvento).then((value) => {
      if (value != null) {
        this.setState({ datos_tabla: value });
        //this.state.datos_tabla.Propuestas = value.Propuestas
        numPropuestas = this.state.datos_tabla.Propuestas.length;
        for (let i = 0; i < numPropuestas; i++) {
          this.state.rptaPref[i] = 0;
          arreglo_aux[i] = -1;
        }
        this.setState({ rptaPref: arreglo_aux });

      }

    });
    //listar preferencias para un evaluador con las elecciones editadas
    console.log("soba ni iru kitto", this.props.idEvento, retrievedJson.infoUsuario.idUsuario);
    Networking.ListarPrefXProp(this.props.idEvento, retrievedJson.infoUsuario.idUsuario).then((value) => {
      //Networking.ListarPrefXProp(1, 4).then((value) => {
      console.log("<<<<<<<<<<<3 VALUE: ", value);
      console.log("<<<<<<<<<<<3 state: ", this.state.PreferenciasXPropuestas);
      if (value.PreferenciasXPropuestas.length == 0) {
        console.log('No tenía preferencias');
        //CODIGO
        //o nel :V
      }
      else {
        console.log('Tenia evaluacion... ahora debo pintarlas en front');
        //falta criterios
        for (var i = 0; i < value.PreferenciasXPropuestas.length; i++) {
          //console.log("for i in ",this.state.PreferenciasXCategoria[i]);
          //let keys = this.state.PreferenciasXCategoria[i];
          this.state.rptaPref[i] = value.PreferenciasXPropuestas[i].eleccion;
          arreglo_aux[i] = value.PreferenciasXPropuestas[i].eleccion;
        }
        this.setState({ rptaPref: arreglo_aux });
      }

    });

  }
  componentDidMount() {
    console.log("DID MOUNT");
    //console.log("jxjx", this.state.datos_tabla);
    //console.log(this.state.radioButtons);

    this.setState({
      //nombre_evento : this.props.nextChildComponentProps.nomb_evento,
      idEvento: this.props.idEvento,
      //idEvaluador : this.props.nextChildComponentProps.idOrganizador_nextProps,
    });
    //console.log("<<<<<<<<<ID evento", this.state.idEvento);

  }

  elegirPrefProp = () => {
    this.props.onNextChildComponentChange(EvaluadorEventosListados);
  }

  handleRadioButtonChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState({

    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.rptaPref/*[0]*/ == nextState.rptaPref/*[0]*/) {
      return true;
    }
    if (arreglo_aux != []) {
      return true;
    }
    return true;
  }

  onRadioChange = (e, index) => {
    //this.state.rptasCriterios[[index]] = parseInt(e.target.value)
    arreglo_aux[[index]] = parseInt(e.target.value)
    this.setState({
      rptaPref: arreglo_aux
    });
    //console.log("avr cual cambia: ", this.state.rptaPref, this.state.rptaPref[index]);
  }

  tableData() {
    //return this.state.datos_tabla.Propuestas.map((element) => { 
    return this.state.datos_tabla.Propuestas.map((element, index) => {
      const { idPropuesta, nombre, nombreAutor } = element
      return (
        <tr >
          <td>{nombre}</td>
          <td>{nombreAutor}</td>

          <td><input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
            value={3}
            checked={this.state.rptaPref[index] == 3}
            onChange={event => this.onRadioChange(event, index)} />Sí</td>
          <td><input type="radio"  //name={"radio".concat((indiceRadioB+index).toString())}
            value={2}
            checked={this.state.rptaPref[index] == 2}
            onChange={event => this.onRadioChange(event, index)} />Quizás</td>
          <td><input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
            value={1}
            checked={this.state.rptaPref[index] == 1}
            onChange={event => this.onRadioChange(event, index)} />No</td>
          <td><input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
            value={0}
            checked={this.state.rptaPref[index] == 0}
            onChange={event => this.onRadioChange(event, index)} />Conflicto</td>
        </tr>
      )
    })
  }
  guardarCambios = () => {
    let data = {};
    let e = {};
    let propus = [];
    //console.log("LAS RESPueSTAS DE CRIT", this.state.rptasCriterios);
    console.log("the reason why", this.state.rptaPref);

    console.log("idEvaluador: ", this.state.idUser_recived);
    console.log("idEvento: ", this.state.idEvento);

    this.state.datos_tabla.Propuestas.map((element, index) => {
      const { idPropuesta, enunciado, idFase } = element;
      e = JSON.stringify({
        idEvento: this.state.idEvento,
        idEvaluador: this.state.idUser_recived,
        preferencia: parseInt(this.state.rptaPref[index]),
        idPropuesta: idPropuesta
      });
      if (this.state.rptaPref[index] != -1) {
        console.log("LO QUE VOY A MANDAR PARA GUARDAR...: ", e);
        Networking.registrar_preferencias_propuesta(e).then((value) => {
          console.log(value);
          if (value == null) {
            console.log('devolvio null pero no se q devuelve el back :V');

          } else {
            console.log('Se inserto o actualizó pref :V');
            //alert("¡Se han guardado los cambios!");
          }
        });
      }

    });

    alert("¡Se han guardado los cambios!");

    //this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}

              onNextChildComponentChange={this.elegirPrefProp}
              onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
            >

              <div className="form-group mt-2">
                <button class="mybutton" onClick={this.guardarCambios} style={{ float: 'right', marginBottom: '15px' }} >
                  Guardar
                </button>
              </div>



              <div class="table-responsive">
                <table class="table  table-hover">
                  <thead style={{ backgroundColor: "#002D3D", color: "#6CDCD6" }}>
                    <tr >
                      <th width="40%" align="left" scope="col">Lista de Propuestas</th>
                      <th width="35%" align="left" scope="col">Autores</th>
                      <th align="right" scope="col"></th>
                      <th align="right" scope="col"></th>
                      <th align="right" scope="col"></th>
                      <th align="right" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>{this.tableData()}</tbody>

                </table>
              </div>

            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default ListadoPropPorEvento;