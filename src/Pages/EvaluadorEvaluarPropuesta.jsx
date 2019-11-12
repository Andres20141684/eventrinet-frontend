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
var arreglo_aux = [];
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
    
      //console.log("PROPS DEL BOTON: ",this.props);
      //console.log("id FASE JHAHAJAH",this.props.nextChildComponentProps.idFase);

      Networking.listarCriteriosXFase(this.props.nextChildComponentProps.idFase).then((value) => {
        console.log(value);
    
        if(value == null){
          console.log('no hay algo aun');
          
        }else {
          console.log('si hay algo: A ACTUALIZAR EL ESTADO');
          this.setState({datos_tabla:value});
          console.log("TABLA criterios: ",this.state.datos_tabla);
          numCriterios = this.state.datos_tabla.Criterios.length;
          for(let i=0; i<numCriterios;i++){
              this.state.rptasCriterios[i] = 1;
              arreglo_aux[i]=1;
          }
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

      Networking.mostrarCalificacionXPropuesta(retrievedJson.infoUsuario.idUsuario, this.props.nextChildComponentProps.idFase,this.props.nextChildComponentProps.idPropuesta).then((value) => {
        console.log("INazuma eleven <3",value);
        if(value/*.Evaluacion.length*/ === 0){
          console.log('No tenía evaluacion');       
        }
        else {
          console.log('Tenia evaluacion... ahora debo pintarlas en front');
          this.state.calificacionFinal = value/*.Evaluacion*/.calificacion;
          this.state.nivelExperticia = value/*.Evaluacion*/.experticia;
          this.state.obsPostulante = value/*.Evaluacion*/.obsPart;
          this.state.obsPresi = value/*.Evaluacion*/.obsPresi;
          this.state.coevaluador = value/*.Evaluacion*/.evalExt;
          //falta criterios

          /*for (var i=0; i<this.state.PreferenciasXCategoria.length; i++ ) {
            //console.log("for i in ",this.state.PreferenciasXCategoria[i]);
            let keys = this.state.PreferenciasXCategoria[i];
            this.state.checkboxes[keys] = true;
        }*/
        //this.setState({checkboxes:this.state.checkboxes});
        }
        
      });

    }

      componentDidMount(){
          //console.log("PROPS DE EVALUADOR EVALUAR PROPUESTA: ",this.props);
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
         //console.log("+++++< this.state.rptasCrit unos: ",this.state.rptasCriterios); //AQUI NO VA A MOSTRAR EL VERDADERO ID
      }
    
    evaluadorEvaluarPropuestas = () =>{
        this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
     }
     onRadioChange = (e, name) =>{
       this.setState({
         [name] : e.target.value
       });
     } 
    handleChange = (event, fieldName) => {
      this.setState({
        [fieldName] : event.target.value 
      });
    }
    onRadioChange2 = (e, index) =>{
      //this.state.rptasCriterios[[index]] = parseInt(e.target.value)
      arreglo_aux[[index]] = parseInt(e.target.value)
      this.setState({
        rptasCriterios : arreglo_aux
      });
      //console.log("avr cual cambia: ",this.state.rptasCriterios ,this.state.rptasCriterios[index]);
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.rptasCriterios/*[0]*/ == nextState.rptasCriterios/*[0]*/){
        return true;
      }
      if(arreglo_aux != []){
        return true;
      }
      return false;  
    }


     ListarCriterios(){
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
       let data = {};
       let e = {};
       let crits = [];
       //console.log("LAS RESPueSTAS DE CRIT", this.state.rptasCriterios);

       this.state.datos_tabla.Criterios.map((element, index) => { 
        const {idCriterio,enunciado, idFase} = element;
        e = JSON.parse(JSON.stringify({
          idCriterio: parseInt(idCriterio),
          calificacion : parseInt(this.state.rptasCriterios[index])
        }));
        crits.push(e);
        //console.log("EL E PES: ", e, this.state.rptasCriterios[index]);
       });
       //console.log("criterios : ",crits);


       data = JSON.stringify({
        idUsuario: this.state.idEvaluador,
        idFase: this.state.idFase,
        idPropuesta : this.state.idPropuesta,
        calificacion : parseInt(this.state.calificacionFinal),
        experticia : parseInt(this.state.nivelExperticia),
        obsPart : this.state.obsPostulante,
        obsPresi : this.state.obsPresi,
        evalExt : this.state.coevaluador,
        Criterios : crits
      });
       console.log("LO QUE VOY A MANDAR PARA GUARDAR...: ",data);
       
       Networking.registrarCalificacionXPropuesta(data).then((value) => {
        console.log(value);
        if(value == null){
           console.log('devolvio null pero no se q devuelve el back :V');
           
        }else {
           console.log('Se inserto o actualizó pref :V');
           //alert("¡Se han guardado los cambios!");
        }  
      });
      alert("¡Se han guardado los cambios!");
     
      this.props.onNextChildComponentChange(EvaluadorEvaluarPropuestas);
   }
   
    render(){
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

