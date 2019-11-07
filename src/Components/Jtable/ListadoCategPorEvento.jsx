import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import ElegirPrefCategorias from './../../Pages/ElegirPrefCategorias.jsx'
import Checkbox from "./Checkbox";

const Networking = require('./../../Network/Networking.js') ;

var OPTIONS = [];
var jason = {};

class ListadoCategPorEvento extends Component {
  constructor(props){
    super(props);
    this.state = {
        idUser_recived: 0,
       datos_tabla: {
          Categorias:[
                         ]          
       },
       rememberMe: false,
       idEvento: 0,
       //idEvaluador : 0,
        checkboxes: OPTIONS.reduce(
          (options, option) => (
            { //json , a cada uno de los Strings , le asignas false
            ...options,
            [option]: false
            }
          ),
          {}
        )          
    }
    //OPTIONS = ['kk', 'asco','asdas'];
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


  Networking.listar_categoriasPorEvento(this.props.idEvento).then((value) => {
    console.log(value);
    console.log("antes? :",OPTIONS);
    OPTIONS = value.Categorias.map( (e) =>e.idCategoria);
    console.log("dsps? :",OPTIONS);
    jason = OPTIONS.reduce((jason, value, key) => { jason[value] = true; return jason; }, {});
    console.log("nuevo options",jason);
    this.setState({checkboxes:jason});

    this.selectAllCheckboxes(false);
    if(value == null){
      console.log('no hay algo aun');
      
    }else {
      console.log('si hay algo: A ACTUALIZAR EL ESTADO');
      this.setState({datos_tabla:value});
      console.log("obviamente no lo va a actualizr :V ",this.state.datos_tabla.Categorias.map( (e) => e.descripcion));
      //OPTIONS = this.state.datos_tabla.Categorias.map( (e) => e.descripcion);
    }
    
  });

  }
  componentDidMount(){
  console.log("DID MOUNT");
  console.log("jxjx",this.state.datos_tabla);
  console.log(this.state.checkboxes);

  this.setState({
  //nombre_evento : this.props.nextChildComponentProps.nomb_evento,
  idEvento : this.props.idEvento,
  //idEvaluador : this.props.nextChildComponentProps.idOrganizador_nextProps,
  });
  console.log("<<<<<<<<<ID evento",this.state.idEvento);


  //OPTIONS = ['sda','asdas'];
  }

elegirPrefCat = () =>{
  this.props.onNextChildComponentChange(ElegirPrefCategorias);
}

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        console.log("Se va a insertar: ",this.state.idEvento, this.state.idUser_recived, checkbox);
          /*Networking.registrar_PrefXCat(this.state.idEvento, this.state.idUser_recived, checkbox).then((value) => {
            console.log(value);
            if(value == null){
               console.log('devolvio null pero no se q devuelve el back :V');
               
            }else {
               console.log('Se inserto :V');
               
            }
            
         });*/
      });
  };

  createCheckbox = option => (
    console.log("option del createCheckBox", option),
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  
  createCheckboxes2 = () => this.state.datos_tabla.Categorias.map( (e) => e.descripcion).map(this.createCheckbox);



  tableData() {
    return this.state.datos_tabla.Categorias.map((element, index) => { 
     const {idCategoria,descripcion} = element
     return (
      <tr >
        <td>{index+1}</td>
        <td >{descripcion}</td>
        <td >{
          this.createCheckbox(idCategoria)
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
            <form onSubmit={this.handleFormSubmit}>

            <div className="form-group mt-2">
            <button type="submit" className="btn btn-primary" style={{float:'right'}} >
                  Guardar
                </button>
              </div>
              
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"  style={{float:'right'}}
                  onClick={this.selectAll}
                >
                  Marcar todos
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"  style={{float:'right'}}
                  onClick={this.deselectAll}
                >
                  Desmarcar todos
                </button>
                

            <div  class="table-responsive">
                <table class="table  table-hover">
                  <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                    <tr >
                    <th width="5%" align="left" scope="col">N°</th>
                        <th align= "left" scope="col">Lista de categorías</th>
                        <th width="5%" align="right" scope="col"></th>
                        
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

export default ListadoCategPorEvento;