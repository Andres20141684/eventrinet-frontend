import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import ListadoCategPorEvento from '../Components/Jtable/ListadoCategPorEvento';
import { tryStatement } from '@babel/types';
import EvaluadorEventosListados from './EvaluadorEventosListados';

const Networking = require('../Network/Networking.js') ;

function MainTittle(){
    return ( <div>
    <div style={{marginLeft:15}}>
        <h1><br/>Preferencias por categorías</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h4>Lista de categorías del evento:</h4></div>
    
    </div>
    )
}
class ElegirPrefCategorias extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: ListadoCategPorEvento,
            msg: "Not Connected",
            idEvaluador : 1,
            nombre_evento : "Evento 1",
            idEvento : 9999
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
        this.elegirPrefCat = this.elegirPrefCat.bind(this);
    
      }
      handleNextChildComponentChange(_nextChildComponent){
        console.log('cambiando', _nextChildComponent);
          this.props.onNextChildComponentChange(_nextChildComponent);
          
      }
      handleNextChildComponentChangeProps(_nextChildComponentProps){
          this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
      }

      componentDidMount(){

        this.setState({
            nombre_evento : this.props.nextChildComponentProps.nomb_evento,
            idEvento : this.props.nextChildComponentProps.id_evento_nextProps,
            idEvaluador : this.props.nextChildComponentProps.idOrganizador_nextProps,
        });
         // console.log("<<<<<<<<<ID evaluador",this.state.idEvaluador); //AQUI NO VA A MOSTRAR EL VERDADERO ID
      }
    
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.idEvento!= this.state.idEvento){
            console.log("<<cambio mi idEvento<<<",nextState.idEvento,"-",this.state.idEvento);
            console.log("<<idEvaluador<<",nextState.idEvaluador);
            console.log("<<Nombre del evento<<",nextState.nombre_evento);
            return true;
        }
        return false;

    }
    
    elegirPrefCat = () =>{
        this.props.onNextChildComponentChange(EvaluadorEventosListados);
     }
   
    render(){
        
        return(
            <div> 
    <div style={{marginLeft:15}}>
        <h1 style={{fontSize:35}}><br/>{this.state.nombre_evento}</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h2>Preferencias por categorías</h2></div>
            
            <div class="container" >
                <div class ="panel-body">
                
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>

                            <TabList>
                                <Tab>Lista de categorías por evento</Tab>
                            </TabList>
                            <TabPanel>
                                <br/>
                                <this.state.formActives  
                                    onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                    idEvento = {this.props.nextChildComponentProps.idEvento}
                                    idEvaluador = {this.props.nextChildComponentProps.idUser_}
                                />
                                {console.log("X.X",this.props.nextChildComponentProps)}
                            </TabPanel>
                            
                        </Tabs>
                        <div>
        <h2><br/></h2>
        <h3>
        <button class="mybutton" onClick={this.elegirPrefCat} style={{float:'left'}}>Atras</button>
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


export default ElegirPrefCategorias;

