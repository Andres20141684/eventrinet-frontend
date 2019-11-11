import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import ListadoPropuestasAEvaluar from '../Components/Jtable/ListadoPropuestasAEvaluar';
import { tryStatement, throwStatement } from '@babel/types';
import EvaluadorEventosListados from './EvaluadorEventosListados';
import EvaluadorEvaluarPropuestas from './EvaluadorEvaluarPropuestas';

const Networking = require('../Network/Networking.js') ;

var numCriterios=0;
var indiceRadioB = 4;

class EvaluadorEvaluarPropuesta extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: ListadoPropuestasAEvaluar,
            msg: "Not Connected",
            idEvaluador : 1,
            nombre_evento : "Evento 1",
            idEvento : 9999,
            idFase : 12345,
            datos_tabla: {
                Criterios : []
              },
            datos_tabla2 : {
              Respuestas: []
            },
            idPropuesta : 0,
            nomb_propuesta : "",

            calificacionFinal : 1,
            nivelExperticia : 1,
            obsPostulante : "",
            obsPresi : "",
            coevaluador : "",

            rptasCriterios : [],//arreglo de [1 , 2 , 3 , 4 .. 5]
          

        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
        this.evaluadorEvaluarPropuestas = this.evaluadorEvaluarPropuestas.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onRadioChange2 = this.onRadioChange2.bind(this);
        this.guardarCambios = this.guardarCambios.bind(this);
    
      }
      handleNextChildComponentChange(_nextChildComponent){
        console.log('cambiando', _nextChildComponent);
          this.props.onNextChildComponentChange(_nextChildComponent);
          
      }
      handleNextChildComponentChangeProps(_nextChildComponentProps){
          this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
      }
     componentWillMount(){
        console.log("WILL MOUNT")
        let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idEvaluador= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);
      this.state.idEvento = this.props.idEvento;
    
      console.log("PROPS DEL BOTON: ",this.props);
      console.log("id FASE JHAHAJAH",this.props.nextChildComponentProps.idFase);
    
      Networking.listarCriteriosXFase(this.props.nextChildComponentProps.idFase).then((value) => {
        console.log(value);
    
        if(value == null){
          console.log('no hay algo aun');
          
        }else {
          console.log('si hay algo: A ACTUALIZAR EL ESTADO');
          this.setState({datos_tabla:value});
          console.log("TABLA criterios: ",this.state.datos_tabla);
        }
        
      });

      Networking.listarCamposRptaXFase(this.props.nextChildComponentProps.idPropuesta,this.props.nextChildComponentProps.idFase).then((value) => {
        console.log(value);
    
        if(value == null){
          console.log('no hay algo aun');
          
        }else {
          console.log('si hay algo: A ACTUALIZAR EL ESTADO');
          this.setState({datos_tabla2:value});
          console.log("TABLA criterios: ",this.state.datos_tabla2);
        }
        
      });
    
      }

      componentDidMount(){
          console.log("PROPS DE EVALUADOR EVALUAR PROPUESTA: ",this.props);

          this.setState({
            nombre_evento : this.props.nextChildComponentProps.nomb_evento,
            idEvento : this.props.nextChildComponentProps.id_evento_nextProps,
            idEvaluador : this.props.nextChildComponentProps.idOrganizador_nextProps,
            idFase : this.props.nextChildComponentProps.idFase,
            nomb_fase : this.props.nextChildComponentProps.nomb_fase,
            idPropuesta : this.props.nextChildComponentProps.idPropuesta,
            nomb_propuesta : this.props.nextChildComponentProps.nomb_propuesta

            //idFase : this.props.idFase
          });
         console.log("+++++<ID evaluador",this.state.idEvento); //AQUI NO VA A MOSTRAR EL VERDADERO ID
      }
    
      /*shouldComponentUpdate(nextProps,nextState){
        if(nextState.idEvento!= this.state.idEvento){ //aqui se actualizan los states 
            console.log("<<cambio mi idEvento<<<",nextState.idEvento,"-",this.state.idEvento);
            console.log("<<idEvaluador<<",nextState.idEvaluador);
            console.log("<<Nombre del evento<<",nextState.nombre_evento);
            console.log("<<idFase<<",nextState.idFasee);
            return true;
        }
        return false;

    }*/
    
    evaluadorEvaluarPropuestas = () =>{
        this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
     }
     onRadioChange = (e, name) =>{
       console.log("e: ",e.target.value);
       this.setState({
         [name] : e.target.value
       });
     } 
    handleChange = (event, fieldName) => {
      this.setState({
        [fieldName] : event.target.value 
      });
      //console.log(this.state.obsPostulante);
    }
    onRadioChange2 = (e, index) =>{
      console.log("e: ",e.target.value);
      this.state.rptasCriterios[index] = e.target.value
      /*this.setState({
        rptasCriterios[index] : e.target.value
      });*/
      console.log("avr cual cambia: ",this.state.rptasCriterios ,this.state.rptasCriterios[index]);
    }
     ListarCriterios(){
      numCriterios = this.state.datos_tabla.Criterios.length;
      for(let i=0; i<numCriterios;i++){
        this.state.rptasCriterios[i] = 1;
    }
      console.log(this.state.rptasCriterios);
      return this.state.datos_tabla.Criterios.map((element, index) => {
        const {idCriterio, enunciado, idFase} = element
           return (
             <div>
            <h1 style={{fontSize:15}}><br/>{index+1}. {enunciado}</h1>            
            <input type="radio"  //name={"radio".concat((indiceRadioB+index).toString())}
                                   value={1}
                                   checked={this.state.rptasCriterios[index] == 1} 
                                   onChange={event => this.onRadioChange2(event, index)} />Muy malo
            <input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
                                   value={2}
                                   checked={this.state.rptasCriterios[index] == 2} 
                                   onChange={event => this.onRadioChange2(event, index)} />Malo
            <input type="radio"  //name={"radio".concat((indiceRadioB+index).toString())}
                                   value={3}
                                   checked={this.state.rptasCriterios[index] == 3} 
                                   onChange={event => this.onRadioChange2(event, index)} />Regular
            <input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
                                   value={4}
                                   checked={this.state.rptasCriterios[index] == 4} 
                                   onChange={event => this.onRadioChange2(event, index)} />Bueno
            <input type="radio" // name={"radio".concat((indiceRadioB+index).toString())}
                                   value={5}
                                   checked={this.state.rptasCriterios[index] == 5} 
                                   onChange={event => this.onRadioChange2(event, index)} />Muy bueno
                                   </div>
       )
       })
     }
     ListarCalificacion(){
      return (
        <div>
        <h1 style={{fontSize:15}}>Calificación final</h1>
            <input type="radio" //name="radio2" 
                                   value={1}
                                   checked={this.state.calificacionFinal == 1} 
                                   onChange={event => this.onRadioChange(event, "calificacionFinal")} />Muy malo
            <input type="radio" //name="radio2" 
                                   value={2}
                                   checked={this.state.calificacionFinal ==2} 
                                   onChange={event => this.onRadioChange(event, "calificacionFinal")} />Malo
            <input type="radio" //name="radio2" 
                                   value={3}
                                   checked={this.state.calificacionFinal == 3} 
                                   onChange={event => this.onRadioChange(event, "calificacionFinal")} />Regular
            <input type="radio" //name="radio2" 
                                   value={4}
                                   checked={this.state.calificacionFinal == 4} 
                                   onChange={event => this.onRadioChange(event, "calificacionFinal")} />Bueno
            <input type="radio" //name="radio2" 
                                   value={5}
                                   checked={this.state.calificacionFinal == 5} 
                                   onChange={event => this.onRadioChange(event, "calificacionFinal")} />Muy bueno
                                 
        <h1 style={{fontSize:15}}>Nivel de experticia</h1>  
            <input type="radio"// name="radio3" 
                                   value={1}
                                   checked={this.state.nivelExperticia == 1} 
                                   onChange={event => this.onRadioChange(event, "nivelExperticia")} />Bajo
            <input type="radio"//name="radio3" 
                                   value={2}
                                   checked={this.state.nivelExperticia ==2} 
                                   onChange={event => this.onRadioChange(event, "nivelExperticia")} />Medio
            <input type="radio"// name="radio3" 
                                   value={3}
                                   checked={this.state.nivelExperticia == 3} 
                                   onChange={event => this.onRadioChange(event, "nivelExperticia")} />Alto
        </div>           
   )
     }
     
     ListarObservaciones(){
           return (
            <div>
            <h1 style={{fontSize:15}}>Para el Postulante:</h1>
            <textarea 
                    rows='5'
                    type="text" 
                    class="form-control"                   
                    value={this.state.obsPostulante}
                    onChange={event => this.handleChange(event, "obsPostulante")}    
                    maxLength="300"       
                    />

            <h1 style={{fontSize:15}}>Para el Presidente:</h1>
            <textarea 
                    rows='5'
                    type="text" 
                    class="form-control"                   
                    onChange={event => this.handleChange(event, "obsPresi")}
                    value={this.state.obsPresi}       
                    maxLength="300"       
                    />

            </div>          
       );
       
     }
     Coevaluador(){
      return (
        <div>
        <h1 style={{fontSize:15}}>Este campo será llenado si la calificación no fue realizada por el mismo evaluador</h1> 
        <input size="40" value={this.state.coevaluador} onChange={event => this.handleChange(event,"coevaluador")}/>
        </div>         
   )
     }
     ListarCamposP(){
      return this.state.datos_tabla2.Respuestas.map((element, index) => {
        const {campoPerEnun, campoPerDesc, rpta} = element
           return (
             <div>
           <h1 style={{fontSize:15}}>{index+1}. {campoPerEnun}</h1>     
           <h1 style={{fontSize:15}}>Respuesta del participante: {rpta}</h1>    
           <br/>
           </div>    
     
       )
       })
     }
     guardarCambios= () =>{
       console.log("LO QUE VOY A MANDAR PARA GUARDAR...: ",this.state.idEvaluador, this.state.idFase, this.state.idPropuesta, this.state.calificacionFinal, this.state.nivelExperticia, this.state.obsPostulante, this.state.obsPresi, this.state.coevaluador)
      this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
   }
   
    render(){
      //console.log("PROPs del last page :", this.props);
        
        return(
          <div> 
    <div style={{marginLeft:15}}>
        <h1 style={{fontSize:35}}><br/>{this.state.nombre_evento}</h1>
        <h3><button class="btn" style={{float:'right'}}><i class="fa fa-download"></i> Descargar propuesta</button></h3>
    </div>
        <div style={{marginLeft:40,marginTop:25}} ><h3>{this.state.nomb_fase}</h3></div>
        <div style={{marginLeft:40,marginTop:25}} ><h2>{this.state.nomb_propuesta}</h2></div>
            
            <div class="container" >
                <div class ="panel-body">
<div>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Campos Personalizados</h1></div>
            <div class="panel-body">
              {this.ListarCamposP()}
      
          </div>

          <div class="panel panel-default">
            <div class="panel-heading"><h1>Criterios</h1></div>
            <div class="panel-body">
            {this.ListarCriterios()}

            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading"><h1>Calificación</h1></div>
            <div class="panel-body">
            {this.ListarCalificacion()}

            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Observaciones</h1></div>
            <div class="panel-body">
            {this.ListarObservaciones()}
  
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Coevaluador</h1></div>
            <div class="panel-body">
            {this.Coevaluador()}

            </div>
          </div>


        </div>      
      </div>
	  </div>
                        <div>

        <h3>
        <button class="mybutton" onClick={this.evaluadorEvaluarPropuestas} style={{float:'left'}}>Atras</button>
        <button class="mybutton" onClick={this.guardarCambios} style={{float:'right'}}>Guardar</button>
    
        </h3>
    </div>
                    </div>
                </div>
               
                
                </div>
            
                
            
        );
    }
}


export default EvaluadorEvaluarPropuesta;

