import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButtonFASE from './ActionButtonFASE';
import EvaluadorEvaluarPropuestas from './../../Pages/EvaluadorEvaluarPropuestas';

//import NewEventPage from './../../Pages/NewEventPage' //aca debería estar el modificar fases, pero ni en back hay :'v
const Networking = require('./../../Network/Networking.js') ;




class EvaluadorEventosPrefTable  extends Component {
   constructor(props){
      super(props);
      this.state = {
          msg: "Not Connected" ,
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: {
            Eventos_Evaluador:[
                           ]
         },
         idFase : 0,
         nomb_fase : "No hay ni un nombre asignado aesta fase :v (este es el default)"
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
      
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);


      Networking.populateDataEvalEvaluar(retrievedJson.infoUsuario.idUsuario).then((value) => {
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
      if (this.state.nomb_fase != nextState.nomb_fase){//no hace nada :V
         console.log("COMPONENT UPDATE: nomb fase: ", this.state.nomb_fase. nextState.nomb_fase)
         return true;
      }
      return false;
   }

   evaluarEvaluador = () =>{
      this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
   }
 
   
   tableData() {

      //this.setState.idUser_recived=this.props.idUser_recived;

        return this.state.datos_tabla.Eventos_Evaluador.map((element, index) => {
         
         const {faseActual, fasesTotales, fechaLimite, idEvento,nombre} = element

         Networking.faseActual(idEvento).then((value) => {
            console.log(value);
        
            if(value == null){
                console.log('no hay algo aun');
                
            }else {
                console.log('si hay algo: A ACTUALIZAR EL ESTADO');
                console.log("nombre_fase:############################ ",value.Fase.nombre);
                console.log("else LE CAMBIE EL ID FASE?", this.state.idFase);
                this.state.nomb_fase = value.Fase.nombre;
                this.state.idFase = value.Fase.idFase;
                console.log("else LE CAMBIE EL ID FASE?", this.state.idFase);
                

            }
            //console.log("else LE CAMBIE EL ID FASE?", this.state.idFase);
            
            });
            
            

         return (
         <tr >
               <td >{nombre}</td>
               <td align="left">{faseActual}/{fasesTotales}</td>
               <td >{fechaLimite}</td>

               <td align="center">
                  <ActionButtonFASE 
                  button_class ="fa fa-plus" 
                  id_evento={idEvento} 
                  nomb_evento ={nombre} //nombre
                  idUser_recived={this.state.idUser_recived} 
                  ///*este es el prop del sig comp*/idFase = {this.state.idFase}//{id_fase} //los estoy mandando vacíos
                  /*este se va a settear*/nomb_fase = {this.state.nomb_fase}//{nombre_fase}//AQUI SE SETTEAN LOS PROPS PARA EL SIG COMPONENTE

                  onNextChildComponentChange={this.evaluarEvaluador}
                  onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}

                  button_class ="fa fa-plus"
                  />
               </td> 
         </tr>
         )
      }
      )

      
    }
  
  
     render() { 
         return (
            
           <div class="panel panel mypanel" >
              <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                  <h3>Lista de eventos a evaluar</h3>
               </div>
              <div  class="table-responsive">
              <table class="table  table-hover">
               <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                  <tr >
                     <th align= "left" scope="col">Lista de eventos</th>
                     <th scope="col" align="right">Fase actual / Fases totales</th>
                     <th scope="col">Fecha límite</th>
                     <th scope="col" align="right" >Evaluar fase</th>
                  </tr>
               </thead>
              <tbody>{this.tableData()}</tbody>
              </table>
              </div>
           </div>
        )
     }
}

export default EvaluadorEventosPrefTable