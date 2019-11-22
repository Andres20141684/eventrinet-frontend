import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import JActionButton from '../Special/JActionButton';
import AsignEvalPropuesta from '../../Pages/Asign_Eval_Propuest';
import NewEventPage from '../../Pages/NewEventPage';
//import NewEventPage from './../../Pages/NewEventPage' //aca debería estar el modificar fases, pero ni en back hay :'v
const Networking = require('./../../Network/Networking.js') ;


class PresiEventos_asignarEvaTable  extends Component {
   constructor(props){ 
      super(props);
      this.state = {
          msg: "Not Connected" ,
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: {
                  Eventos:[
                           ]
         }
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
    handleClickCAsignarEvaluadores = () => {
      console.log('redireccionando a ... FakeNewIni evento');
      this.handleNextChildComponentChangeProps({  
         idOrganizador_nextProps: this.state.idUser_recived,
         id_evento_nextProps: 0, //para q se actualice el evento no?
         nomb_evento: "none",
         Usuario:this.props.nextChildComponentProps.Usuario
      });
      
      //this.handleNextChildComponentChange(NewEventPage);
    }
    handleClickAddEval =(idE)=>{
      console.log("retrievedJson");
      this.handleNextChildComponentChangeProps({   
         idEvento: idE,
         Usuario:this.props.nextChildComponentProps.Usuario
      });
      console.log("redireccion para AsignEvalPropuesta");
      this.handleNextChildComponentChange(AsignEvalPropuesta);
   }
   handleEditButton =(idO,idE,nom)=>{
      let dataFlow = {   
         idOrganizador_nextProps: idO,
         id_evento_nextProps: idE,
         nomb_evento: nom,
         rol:1, //Siginifca que es presidente
         Usuario:this.props.nextChildComponentProps.Usuario
      }
      this.handleNextChildComponentChangeProps(dataFlow);
      this.handleNextChildComponentChange(NewEventPage);
   }
   componentWillMount(){
      
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);


      Networking.populateDataEvaTab(retrievedJson.infoUsuario.idUsuario).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
         }
         
      });
   }
   shouldComponentUpdate(nextProps, nextState){
      if(this.state.datos_tabla != nextState.datos_tabla){
         return true;
      }
      return false;
   }
  
  
      handleClick2 = () => {
         console.log('redireccionando a ... update evento');
         sessionStorage.setItem('nextProp',
              JSON.stringify(
                             {   idOrganizador_nextProps: this.state.idUser_recived,
                                id_evento_nextProps: 0,
                                nomb_evento: "none",
                                Usuario:this.props.nextChildComponentProps.Usuario
                                
                             } 
                          ))
         //window.location.replace("./");
      }

 
   
   tableData() {
      //this.setState.idUser_recived=this.props.idUser_recived;

        return this.state.datos_tabla.Eventos.map((element, index) => {
         
         const {idEvento,propAsignadas,propTotal,nombre,
            inicioEvaluacion} = element
         return (
         <tr >
               <td >{nombre}</td>
               <td align="center">{propAsignadas}/{propTotal}</td>
               <td>{inicioEvaluacion}</td>
               
               <td align="center">
                  <JActionButton 
                   button_class ="fa fa-plus" 
                     idEvento={idEvento} 
                     onClick={()=>this.handleClickAddEval(element.idEvento)}/>
               </td> 
               <td align="center">
               <JActionButton
                     onClick = {()=>this.handleEditButton(this.state.idUser_recived,
                        element.idEvento,
                        element.nombre)}
                     button_class ="fa fa-edit" 
                  />
               </td> 
         </tr>
         )
      })
    }
  
  
     render() {
         return (
            
           <div class="panel panel mypanel" >
              <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                  <h3>Lista de eventos a asignar evaluador</h3>
               </div> 
              <div  class="table-responsive">
              <table class="table  table-hover">
               <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                  <tr >
                     <th align= "left" scope="col">Lista de eventos</th>
                     <th scope="col">Propuestas asignadas / Total</th>
                     <th scope="col">Inicio evaluación</th>
                     <th scope="col">Asignar evaluadores</th>
                     <th scope="col">Editar fases</th>
                  </tr>
               </thead>
              <tbody>{this.tableData()}</tbody>
              </table>
              </div>
           </div>
        )
     }
}

export default PresiEventos_asignarEvaTable
