import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import Organizador_ActiveEventsTable from '../Components/Jtable/Organizador_ActiveEventsTable';
import Organizador_HistoryventsTable from '../Components/Jtable/Organizador_HistoryventsTable';
const Networking = require('./../Network/Networking.js') ;

function MainTittle(){
    return ( 
    <div >
        <h1><br/>Organizador - Mis eventos<br/><br/></h1>
    </div>
    )
}
class OrganActiveEvents extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        formActives: Organizador_ActiveEventsTable,
        formRecord:Organizador_HistoryventsTable,
        datos_tabla1:  null,
        datos_tabla2: null,
        msg: "Not Connected",
        idOrganizador: 1
    }
    
    componentWillMount(){
        
        
    }
    render(){
        
        //var inputServer = this.getData();
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */
        var datos2 ={ 
            chupetinesGA: [
               { nombre: 'FFFFFFFFFFFF', propRec: 'si', propEval: 'no', programa: 'si'},
               { nombre: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'},
               { nombre: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'},
               { nombre: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'},
               { nombre: 'WasWasifWasifWasifif', propRec: 'si', propEval: 'no', programa: 'si'}
            ]
         }
         var datos1 ={ //state is by default an object
            chupetinesGA: [
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'},
                { listaEventos: 'WaWaWasifsifsWaWasifsifif'}
            ]
         }
         
        return(
            <div> 
            <this.state.bannTop />            
            <MainTittle/>
            <div class="container">
                <div >
                <div class="card">
                    <div class="card-title">
                        <h2>Gestion de eventos activos e históricos</h2>
                    </div>
                    <div class ="card-body">
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                            <TabList>
                                <Tab>Eventos activos</Tab>
                                <Tab>Historial de eventos</Tab>
                            </TabList>
                            <TabPanel>
                                <a  href="/organizerNewEvent"><button class="btnAdd" style={{float:'right'}}>Nuevo</button></a>
                                <br/>
                                <this.state.formActives data ={datos2} /> 
                            </TabPanel>
                            <TabPanel> 
                                
                                < this.state.formRecord data ={datos1}/>
                            </TabPanel>
                        </Tabs>
                    </div>
                </div>
                </div>
                </div>
                <br/><br/>
                <this.state.bannBot/>
            </div>
        );
    }
}


export default OrganActiveEvents;

