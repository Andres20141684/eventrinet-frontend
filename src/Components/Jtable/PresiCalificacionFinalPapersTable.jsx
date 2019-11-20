import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import EvaluacionPresidente from  './EvaluacionPresidente';
const Networking = require('./../../Network/Networking.js') ;
 

class PresiCalificacionFinalPapersTable  extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = {
         idUser_recived:0,
         datos_tabla: {
                     Eventos:[ 
                     ]
         }
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    
   }

   handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
      console.log("Parametros pasados ",_nextChildComponentProps);  
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
   componentDidMount(){
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;

      Networking.populateDataPresiEvalFinal(this.state.idUser_recived)
      .then((value) => {

         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
         }   
            
      });
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  handleClickEvaularPaper (evt,idEvento,nombre,fasesTotales,secuencia,fechaLimite,idFaseActual,nombreFase){
   this.handleNextChildComponentChangeProps(
      {idEvent:idEvento,
      nombreEvento:nombre,
      fasesTotales:fasesTotales,
      secuencia:secuencia,
      fechaLimite:fechaLimite,
      idFaseActual : idFaseActual,
      nombreFase:nombreFase
   });
   console.log("idEvento",idEvento);
   this.handleNextChildComponentChange(EvaluacionPresidente);
  }
  
   renderTableData() {
        return this.state.datos_tabla.Eventos.map((element, index) => {
         const {idEvento, nombre,secuencia, fasesTotales,fechaLimite,idFaseActual,nombreFase} = element
            return (
            <tr >
                <td>{nombre}</td>
                <td align="center">{secuencia}/{fasesTotales}</td>
               <td align="center">{fechaLimite}</td>
               <td align="center">
                  <div>{/*<ActionButton id_evento={idEvento} clickeable ={true} redirect={EvaluacionPresidente} button_class ="fa fa-plus" />*/}</div>                
                  <button onClick={e => {this.handleClickEvaularPaper(e,idEvento,nombre,fasesTotales,secuencia,fechaLimite,idFaseActual, nombreFase)}} style={{background:"none", border:"none"}}><a><i className ="fa fa-plus" /></a></button>
               </td> 
            </tr>
        )
        })
    }
    renderTableHeader() {
      return (
         <tr>
             <th width="40%">Lista de eventos</th>
             <th>Fase actual / Fases totales </th>
             <th>Fecha límite</th>             
             <th>Aprobar Propuestas</th>
         </tr>

     )
     }
  
     render() {
        //this.state = this.props.data
        return (
         <div class="panel panel mypanel" >
         <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
             <h3>Lista de eventos en evaluación</h3>
          </div>
         <div  class="table-responsive">
             <table class="table  table-hover" >
             <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
               {this.renderTableHeader()}
             </thead>
                <tbody>{this.renderTableData()}</tbody>
             </table>
         </div>
      </div>

          
        )
     }
}

export default PresiCalificacionFinalPapersTable//exporting a component make it reusable and this is the beauty of react
