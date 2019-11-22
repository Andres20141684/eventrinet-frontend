import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import EvaluadorEventosPrefTable from '../Components/Jtable/EvaluadorEventosPrefTable';
import EvaluadorEventosEvaluarTable from '../Components/Jtable/EvaluadorEventosEvaluarTable';
const Networking = require('../Network/Networking.js') ;

function MainTittle(){
    return ( <div>
    <div style={{marginLeft:15}}>
        <h1><br/>Evaluador - Eventos</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h4>Gestion de eventos a elegir preferencias y a evaluar</h4></div>
    </div>
    )
}
class EvaluadorEventosListados extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: EvaluadorEventosPrefTable,
            formRecord: EvaluadorEventosEvaluarTable,
            datos_tabla1:  null,
            datos_tabla2: null,
            msg: "Not Connected",
            idOrganizador: 1
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
        

        return(
            <div> 
            <MainTittle/>
            <div class="container" >
                <div class ="panel-body">
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>

                            <TabList>
                                <Tab>Eventos a elegir preferencias</Tab>
                                <Tab>Eventos a evaluar</Tab>
                            </TabList>
                            <TabPanel>
                                
                                <br/>
                                <this.state.formActives  
                                nextChildComponentProps={this.props.nextChildComponentProps}
                                onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                />
                            </TabPanel>
                            <TabPanel> 
                                
                                < this.state.formRecord 
                                nextChildComponentProps={this.props.nextChildComponentProps} 
                                onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                <br/><br/>
                </div>
            
        );
    }
}


export default EvaluadorEventosListados;

