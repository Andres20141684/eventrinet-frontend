import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import ListadoPropuestasAEvaluar from '../Components/Jtable/ListadoPropuestasAEvaluar';
import { tryStatement } from '@babel/types';
import EvaluadorEventosListados from './EvaluadorEventosListados';

const Networking = require('../Network/Networking.js') ;
var nombre_fase = "";
var id_fase = 0;
/*function MainTittle(){
    return ( <div>
    <div style={{marginLeft:15}}>
        <h1><br/>Eventos - Evaluador</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h4>Lista de categorías del evento:</h4></div>
    
    </div>
    )
}*/
class EvaluadorEvaluarPropuestas extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: ListadoPropuestasAEvaluar,
            msg: "Not Connected",
            idEvaluador : 1,
            nombre_evento : "Evento 1",
            idEvento : 9999,
            idFase : 0,
            nomb_fase: ""
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
        this.evaluadorEventosListados = this.evaluadorEventosListados.bind(this);
    
      }
      handleNextChildComponentChange(_nextChildComponent){
        console.log('cambiando', _nextChildComponent);
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
        Networking.faseActual(this.props.nextChildComponentProps.id_evento_nextProps).then((value) => {
            console.log(value);
        
            if(value == null){
                console.log('no hay algo aun');
                
            }else {
                console.log('si hay algo: A ACTUALIZAR EL ESTADO');
                console.log("nombre_fase:############################ ",value.Fase.nombre);
                console.log("WAAAAAAAAA else LE CAMBIE EL ID FASE?", this.state.idFase);
                this.state.nomb_fase = value.Fase.nombre;
                this.state.idFase = value.Fase.idFase;
                console.log("WAAAAAAAAA else LE CAMBIE EL ID FASE?", this.state.idFase);
                

            }
            //console.log("else LE CAMBIE EL ID FASE?", this.state.idFase);
            this.props.nextChildComponentProps.idFase = value.Fase.idFase;
            this.props.nextChildComponentProps.nomb_fase = value.Fase.nombre;
            });

        /*this.setState({
            nombre_evento : this.props.nextChildComponentProps.nomb_evento,
            idEvento : this.props.nextChildComponentProps.id_evento_nextProps,
            idEvaluador : retrievedJson.infoUsuario.idUsuario,
          });*/
      }
    
    evaluadorEventosListados = () =>{
        this.props.onNextChildComponentChange(EvaluadorEventosListados);
     }

     /*shouldComponentUpdate(nextProps,nextState){
        if (nextState.nomb_fase != this.state.nomb_fase){//no hace nada :V
            console.log("COMPONENT UPDATE: nomb fase: ", this.state.nomb_fase, nextState.nomb_fase)
            console.log("<<cambio mi idEvento<<<",nextState.idEvento,"-",this.state.idEvento);
            console.log("<<idEvaluador<<",nextState.idEvaluador);
            console.log("<<Nombre del evento<<",nextState.nombre_evento);
            console.log("<<idFase<<",nextState.idFase);
            console.log("<<nomb_fase<<",nextState.nomb_fase);
            return true;
        }
        return true;
    }*/
   
    render(){
        //console.log("nombre de la fase: ",nombre_DE_fase);
        //console.log("PROPs del render??? ",this.props); //AQUI SI ESTAN LOS PROPSSSSS
        console.log("Render DONDE NO CHAPA EL NOMBRE: ",this.props);
        
        return(
            <div> 
    <div style={{marginLeft:15}}>
        <h1 style={{fontSize:35}}><br/>{this.props.nextChildComponentProps.nomb_evento}</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h2>Propuestas asignadas</h2></div>
            
            <div class="container" >
                <div class ="panel-body">
                
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>

                            <TabList>
                                <Tab>{this.props.nextChildComponentProps.nomb_fase}</Tab>
                            </TabList>
                            <TabPanel>
                                <br/>
                                <this.state.formActives  
                                    onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                    props_antiguos = {this.props}
                                    idEvento = {this.props.nextChildComponentProps.id_evento_nextProps}
                                    idEvaluador = {this.props.nextChildComponentProps.idUser_recived}
                                    nombre_evento = {this.props.nextChildComponentProps.nomb_evento}//estos se pasan del comp anterior
                                    idFase = {this.props.nextChildComponentProps.idFase}
                                    nomb_fase = {this.props.nextChildComponentProps.nomb_fase}//A CAMBIAR POR EL NOMBRE DE LA FASE/ID ni pta idea... VA ARRIBA BTW!!
                                    Usuario={this.props.nextChildComponentProps.Usuario}
                                />
                            </TabPanel>
                            
                        </Tabs>
                        <div>
        <h2><br/></h2>
        <h3>
        <button class="mybutton" onClick={this.evaluadorEventosListados} style={{float:'left'}}>Atras</button>
        <br/><br/>
        </h3>
    </div>
                    </div>
                </div>
                <br/><br/>
                
                </div>
                
            
        );
    }
}


export default EvaluadorEvaluarPropuestas;

