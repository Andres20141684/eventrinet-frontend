import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import ElegirPrefPropuesta from '../../Pages/ElegirPrefPropuestas.jsx'
import EvaluadorEventosListados from '../../Pages/EvaluadorEventosListados.jsx';
import RadioButton from "./RadioButton";

const Networking = require('../../Network/Networking.js') ;

var OPTIONS = [];
var jason = {};

class ListadoPropPorEvento extends Component {
  constructor(props){
    super(props);
    this.state = {
      seleccion : [],
        idUser_recived: 0,
       datos_tabla: {
          Propuestas:[
                         ]          
       },
       //almacena los ids Propuesta 
       datajs : {},
       PreferenciasXPropuestas : [999],
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
        )          
    }
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
 }
 handleNextChildComponentChange(_nextChildComponent){
  this.props.onNextChildComponentChange(_nextChildComponent);
  
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
    this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }
  componentWillMount(){
    console.log("WILL MOUNT")
    let retrievedObject = sessionStorage.getItem('dataUser');
  let retrievedJson = JSON.parse(retrievedObject);
  this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
  console.log(retrievedJson);
  console.log("cosas IMPORTANTES:",this.props);
  console.log('&&this.props.idEvento: ',this.props.idEvento);  
//listar simple de todas las propuestas del evento
  Networking.listar_propuestasPorEvento(this.props.idEvento).then((value) => {
    console.log("____",value);
    console.log("antes? :",OPTIONS);
    OPTIONS = value.Propuestas.map( (e) =>e.idPropuesta);
    console.log("dsps? :",OPTIONS);
    // < LINEAS SUPER IMPORTANTES
    jason = OPTIONS.reduce( (jason, value, key) => { jason[value] = -1; return jason; }, {});
    console.log("nuevo options",jason);
    this.setState({radioButtons:jason});
    //LINEAS SUPER IMPORTANTES />
    //this.selectAllCheckboxes(false);
    if(value == null){
      console.log('no hay algo aun');
      
    }else {
      console.log('si hay algo: A ACTUALIZAR EL ESTADO');
      this.setState({datos_tabla:value});
      console.log("obviamente no lo va a actualizr :V ",this.state.datos_tabla.Propuestas.map( (e) => e.descripcion));
      //OPTIONS = this.state.datos_tabla.Categorias.map( (e) => e.descripcion);
    }
    
  });
  //listar preferencias para un evaluador con las elecciones editadas
  //Networking.ListarPrefXProp(this.props.idEvento, retrievedJson.infoUsuario.idUsuario).then((value) => {
  Networking.ListarPrefXProp(1, 4).then((value) => {
    console.log("<<<<<<<<<<<3",value);
    if(value.PreferenciasXPropuestas.length == 0){
      console.log('No tenía preferencias');
      //CODIGO
      //o nel :V
    }
    else {
      console.log('Tenia preferencias... ahora debo pintarlas en front');
      
      for(var i=0;i<value.PreferenciasXPropuestas.length;i++){
        value.PreferenciasXPropuestas[i].seleccion=[]
        
      }
      this.setState({PreferenciasXPropuestas:value.PreferenciasXPropuestas})
      this.setState({datajs:value})
      console.log("datajs",this.state.datajs)
      console.log("obviamente no lo va a actualizr :V ",this.state.PreferenciasXPropuestas , value.PreferenciasXPropuestas);
      console.log("state.radioButtons",this.state.radioButtons);
      //testo!!
      //this.state.checkboxes[1] = true;
      console.log("state.radioButtons antes",this.state.radioButtons);
      for (var i=0; i<this.state.PreferenciasXPropuestas.length; i++ ) {
        //console.log("for i in ",this.state.PreferenciasXCategoria[i]);
        let keys = this.state.PreferenciasXPropuestas[i];
        this.state.radioButtons[keys] = true;
    }
    console.log("state.radioButtons dsps",this.state.radioButtons);
    this.setState({radioButtons:this.state.radioButtons});
      //OPTIONS = this.state.datos_tabla.Categorias.map( (e) => e.descripcion);
    }
    
  });

  }
  componentDidMount(){
  console.log("DID MOUNT");
  console.log("jxjx",this.state.datos_tabla);
  console.log(this.state.radioButtons);

  this.setState({
  //nombre_evento : this.props.nextChildComponentProps.nomb_evento,
  idEvento : this.props.idEvento,
  //idEvaluador : this.props.nextChildComponentProps.idOrganizador_nextProps,
  });
  console.log("<<<<<<<<<ID evento",this.state.idEvento);


  //OPTIONS = ['sda','asdas'];
  }

  elegirPrefProp = () =>{
    this.props.onNextChildComponentChange(EvaluadorEventosListados);
 }

  /*selectAllCheckboxes = isSelected => {
    Object.keys(this.state.radioButtons).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };*/

  //selectAll = () => this.selectAllCheckboxes(true);

  //deselectAll = () => this.selectAllCheckboxes(false);

  handleRadioButtonChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState({
        
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let data = {};
    let Propuestas = [];
    let e = {};

    Object.keys(this.state.radioButtons)
      .filter(checkbox => this.state.radioButtons[checkbox])
      .forEach(checkbox => {
        console.log("Se va a insertar: ",this.state.idEvento, this.state.idUser_recived, checkbox);
        e = JSON.parse(JSON.stringify({
          idCategoria: parseInt(checkbox)
      }));
      Propuestas.push(e);
      });
      data = JSON.stringify({
        idEvento: this.state.idEvento,
        idUsuario: this.state.idUser_recived,
        Propuestas : Propuestas
      });
      console.log("LO Q MANDO A BACK ES: ",data);
      Networking.registrar_PrefXCat(data).then((value) => {
            console.log(value);
            if(value == null){
               console.log('devolvio null pero no se q devuelve el back :V');
               
            }else {
               console.log('Se inserto o actualizó pref :V');
               
            }
            
         });
         alert("¡Se han guardado los cambios!")

         this.elegirPrefCat();
      
  };
//este uso... le pasas un nombre/idCategoria par
  createRadioButton = option => (
    //console.log("option del createCheckBox", option),
    <RadioButton
      //label={option}
      //isSelected={this.state.radioButtons[option]}
      //onRadioButtonChange={this.handleRadioButtonChange}
      //key={option}
      seleccion = {this.state.seleccion}
    />
  );

  //createRadioButtons = () => OPTIONS.map(this.createRadioButton);
  

  tableData() {
    //return this.state.datos_tabla.Propuestas.map((element) => { 
    return this.state.PreferenciasXPropuestas.map((element,index) => { 
     const {idPropuesta,nombre,nombreAutor} = element
     return (
      <tr >
        <td>{nombre}</td>
        <td>{nombreAutor}</td>
        <td >{
          <RadioButton
            seleccion = {element.seleccion}
            index={index}
          />
        }     </td>
      </tr>
      )
    })
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
            <button type="submit" className="btn btn-primary" style={{float:'right'}} >
                  Guardar

                  
                </button>
              </div>
              
                

            <div  class="table-responsive">
                <table class="table  table-hover">
                  <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                    <tr >
                        <th width="40%" align= "left" scope="col">Lista de Propuestas</th>
                        <th width="35%" align= "left" scope="col">Autores</th>
                        <th width="25%" align="right" scope="col"></th>
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