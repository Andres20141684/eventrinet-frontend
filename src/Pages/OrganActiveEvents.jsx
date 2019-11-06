import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import Organizador_ActiveEventsTable from '../Components/Jtable/Organizador_ActiveEventsTable';
import Organizador_HistoryventsTable from '../Components/Jtable/Organizador_HistoryventsTable';
const Networking = require('../Network/Networking.js') ;

function MainTittle(){
    return ( <div>
    <div style={{marginLeft:15}}>
        <h1><br/>Organizador - Mis eventos</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h4>Gestion de eventos activos e históricos</h4></div>
    </div>
    )
}
class OrganActiveEvents extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: Organizador_ActiveEventsTable,
            formRecord: Organizador_HistoryventsTable,
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
                                <Tab>Eventos activos</Tab>
                                <Tab>Historial de eventos</Tab>
                            </TabList>
                            <TabPanel>
                                
                                <br/>
                                <this.state.formActives  
                                onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                />
                            </TabPanel>
                            <TabPanel> 
                                
                                < this.state.formRecord  
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


export default OrganActiveEvents;

