import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButtonFASE from './ActionButtonFASE';
import ElegirPrefCategorias from './../../Pages/ElegirPrefCategorias.jsx';
import EvaluadorEventosListados from './../../Pages/EvaluadorEventosListados.jsx';
import EvaluadorEvaluarPropuesta from './../../Pages/EvaluadorEvaluarPropuesta.jsx';

const Networking = require('./../../Network/Networking.js') ;


class ListadoPropuestasAEvaluar extends Component {
  constructor(props){
    super(props);
    this.state = {
        idUser_recived: 0,
       datos_tabla: {
         Propuestas : []
       },
       idFase : 99999,//cambiar
       PreferenciasXCategoria : [999],
       rememberMe: false,
       idEvento: 0,
       nombre_evento : "Evento 1",
       nomb_fase : "asd",
       props_antiguos : {}
       //idEvaluador : 0,
           
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
  this.state.idEvento = this.props.idEvento;

  this.setState({
    nombre_evento : this.props.nombre_evento,
    idEvento : this.props.idEvento,
    idFase : this.props.props_antiguos.nextChildComponentProps.idFase,
    nomb_fase : this.props.props_antiguos.nextChildComponentProps.nomb_fase,
    props_antiguos : this.props.props_antiguos
  });


  Networking.listarPropuestasXFase(this.props.idEvento, this.state.idUser_recived).then((value) => {
    console.log(value);

    if(value == null){
      console.log('no hay algo aun');
      
    }else {
      console.log('si hay algo:L 4 you');
      this.setState({datos_tabla:value});
      console.log("TABLA: ",this.state.datos_tabla.Propuestas);
    }
    
  });

  }

  elegirPrefCat = () =>{
    this.props.onNextChildComponentChange(EvaluadorEventosListados);
 }

  evaluarEvaluador = () =>{
    //console.log("Props del listado ! :",this.props);
    this.props.onNextChildComponentChange(EvaluadorEvaluarPropuesta);
    //console.log("Props del listado ! :",this.props);
    
 }
 /*
 shouldComponentUpdate(nextProps,nextState){
  if(nextState.nomb_fase == ""){ //aqui se actualizan los states ...
      console.log("<<cambio mi idEvento<<<",nextState.idEvento,"-",this.state.idEvento);
      console.log("<<idEvaluador<<",nextState.idEvaluador);
      console.log("<<Nombre del evento<<",nextState.nombre_evento);
      console.log("<<idFase<<",nextState.idFase);
      console.log("<<nomb_fase<<",nextState.nomb_fase);
      return true;
  }
  return false;

}*/

  tableData() {
    //console.log("Render LISTADO: ",this.props);
    return this.state.datos_tabla.Propuestas.map((element, index) => { 
     const {idPropuesta,estado,nombre,idPostulante,flgCalif,ultimaModif} = element
     return (
      <tr >
    <td>{nombre}</td>
     <td >{flgCalif==1?"EVALUADO":"NO EVALUADO"}</td>
     <td >{flgCalif==1?ultimaModif:""}</td>

     <td align="center">
     <ActionButtonFASE 
                  button_class ="fa fa-plus" 
                  id_evento={this.state.idEvento} 
                  nomb_evento ={this.props.props_antiguos.nextChildComponentProps.nomb_evento} 
                  idUser_recived={this.state.idUser_recived} 
                  idFase = {this.props.props_antiguos.nextChildComponentProps.idFase}
                  nomb_fase = {this.props.props_antiguos.nextChildComponentProps.nomb_fase}
                  idPropuesta = {idPropuesta}
                  nomb_propuesta = {nombre} 

                  onNextChildComponentChange={this.evaluarEvaluador}
                  onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}

                  button_class ="fa fa-plus"
                  />
               </td> 
      </tr>
      )
    })
   }
  render() {
    console.log("_props de Listado RENDER, ", this.props);
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">

            <div  class="table-responsive">
                <table class="table  table-hover">
                  <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                    <tr >
                    <th width="55%" align="left" scope="col">Nombre de propuesta</th>
                        <th align= "left" scope="col">Estado</th>
                        <th align= "left" scope="col">Última modificación</th>
                        <th width="10%"align="right" scope="col">Evaluar</th>
                        
                    </tr>
                  </thead>
                <tbody>{this.tableData()}</tbody>
                
                </table>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ListadoPropuestasAEvaluar;