/*import React, { Component } from 'react'
import './../../styles/Jtab.css'

const Networking = require('./../../Network/Networking.js') ;

class PresiCalificacionFinalPapersTable extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("HAAAAAAAAAAAAAAAAAAAAA")
      Networking.populateDataOrgTab1(8).then((value) => {
         console.log(value);
         if(value.Eventos.length == 0){
            console.log('no hay algo aun');
            this.setState({datos_tabla:[]});
         }else {
            console.log('si hay algo:');
            console.log(value);
            this.setState({datos_tabla:value.Eventos});
         }   
            
      });
      console.log("rzwetxrytcvygbuhnj"+this.props);
   }
   state = {
      datos_tabla: [
        /* {  nombre: 'Simposio agujeros Negros', 
            fases: '1/2', 
            fechalimite: '25/08/2019', 
            calEva: 'Si',
            calPresi:'No'
         }*//*] 
  }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.datos_tabla.map((element, index) => {
        const { nombre,secuencia, numFases, fechaLimite, calEva,calPresi} = element //destructuring
        return (
            <tr>
                <td>{nombre}</td>
                <td>{secuencia}/{numFases}</td>
                <td>{fechaLimite}</td>
                <td>{calEva}-{calPresi}</td>
                <td>
                   <button class="btn_plus" onClick={this.handleClick} ><i class="fa fa-plus"></i></button>
               </td>    
            </tr>
        )
        })
    }
    renderTableHeader() {
        return (
         <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
         <tr>
            <th width="40%">Lista de eventos</th>
            <th width="15%">Fase actual/Num. Fases </th>
            <th width="25%">Fecha Limite</th>
            <th width="25%">Calificación (Evaluador - Presidente) </th>
            <th width="15%">Aprobar Propuestas</th>
         </tr>
         </thead>
        )
     }
  
     render() {
        return (
            
         <div  class="table-responsive">
         <table class="table  table-hover" >
            {this.renderTableHeader()}
            <tbody>                    
               {this.renderTableData()}
            </tbody>
         </table>
         </div>
        )
     }
}

export default PresiCalificacionFinalPapersTable //exporting a component make it reusable and this is the beauty of react*/
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
  
   renderTableData() {
        return this.state.datos_tabla.Eventos.map((element, index) => {
         const {idEvento, nombre,secuencia, fasesTotales,fechaLimite} = element
            return (
            <tr >
                <td>{nombre}</td>
                <td align="center">{secuencia}/{fasesTotales}</td>
               <td align="center">{fechaLimite}</td>
               <td align="center">
                  <ActionButton id_evento={idEvento} clickeable ={false} button_class ="fa fa-minus-circle" />
                  -
                  <ActionButton id_evento={idEvento} clickeable ={false} button_class ="fa fa-minus-circle" />
               </td> 
               <td align="center">
                  <ActionButton id_evento={idEvento} clickeable ={true} redirect={EvaluacionPresidente} button_class ="fa fa-plus" />
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
             <th>Cal. Eval. -> Cal. Presi</th>
             <th>Aprobar Propuestas</th>
         </tr>

     )
     }
  
     render() {
        //this.state = this.props.data
        return (
         <div class="panel panel mypanel" >
         <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
             <h3>Lista de eventos históricos</h3>
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
