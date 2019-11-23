
import React, { Component } from 'react';
import BannerTop from './General/bannerTop';
import BannerBottom from './General/bannerBottom'
import EvaluadorEventosTable from './Jtable/EvaluadorEventosTable';
import EvaluadorEventosEvaluarTable from './Jtable/EvaluadorEventosEvaluarTable';

import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
 

const Networking = require('../Network/Networking.js') ;


class EvaluadorEventos extends Component{
    constructor(props){
        super(props);
        this.state = {
            idUser_recived: 0,
            datos_tabla: {},
            flag: false,
            formEventosTable: EvaluadorEventosTable,
            formEventosEvaluarTable: EvaluadorEventosEvaluarTable,
            
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);

    }
    handleNextChildComponentChange(_nextChildComponent){
        console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }

    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    render(){
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */        
         
        return(
            <div>                
                <h1><font size="33">Evaluador - Eventos</font><br/><br/></h1>
                <div class="container">
                <div class="panel panel-default" style={{borderStyle:"none"}}>
                    <br/>
                    
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                                <TabList>
                                    <Tab>Eventos a elegir Preferencias</Tab>
                                    <Tab>Eventos a evaluar</Tab>
                                </TabList>
                                <TabPanel>
                                    
                                    <this.state.formEventosTable
                                    onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                    />
                                    
                                </TabPanel>
                                <TabPanel> 
                                    <div>{
                                    <this.state.formEventosEvaluarTable
                                    onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}

                                    
                                    />}</div>
                                
                                </TabPanel>
                            </Tabs>
                            
                        <h2><br/></h2>
                        <h3>
                            <button class="mybutton"style={{float:'left'}}>Atras</button>
                            <button class="mybutton"style={{float:'right'}}>Guardar</button>
                            <br/><br/>
                        </h3>
                </div>
                </div>
            </div>
        );
    }
}


export default EvaluadorEventos;

