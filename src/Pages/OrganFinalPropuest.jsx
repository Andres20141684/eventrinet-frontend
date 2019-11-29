import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import Organizador_FinalPropuestTable from '../Components/Jtable/Organizador_FinalPropuestTable';
import OrganActiveEvents from './OrganActiveEvents';
const Networking = require('../Network/Networking.js') ;

function MainTittle(){
    return ( <div>
    <div style={{marginLeft:15}}>
        <br/><br/>
        <h1>Propuestas Finales</h1>
        <br/>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h4>Propuestas aceptadas para el evento</h4></div>
    </div>
    )
}
class OrganFinalPropuest extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: Organizador_FinalPropuestTable,
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
                                <Tab>Propuestas finales</Tab>
                            </TabList>
                            <TabPanel>     
                                <br/>
                                <this.state.formActives 
                                nextChildComponentProps={this.props.nextChildComponentProps}
                                onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                />
                            </TabPanel>
                        </Tabs>
                    </div>
                    <button class="mybutton" onClick={()=>{this.handleNextChildComponentChange(OrganActiveEvents)}} style={{marginTop:15,float:'left'}}>Atras</button>
                </div>
                <br/><br/>
                </div>
            
        );
    }
}


export default OrganFinalPropuest;

