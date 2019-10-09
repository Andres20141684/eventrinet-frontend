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
function Botones(){
    return ( 
    <div>
         <h2><br/></h2>
                    <h3>
                    <button class="mybutton" style={{float:'left'}}>Atras</button>
                    <button class="mybutton" style={{float:'right'}}>Guardar</button>
                    <br/><br/>
                    </h3>
    </div>
    )
}
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
    
   
    render(){
        
        //var inputServer = this.getData();
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */

        return(
            <div> 
            <this.state.bannTop />
            <MainTittle/>
            <div class="container" >
                <div class ="panel-body">
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>

                            <TabList>
                                <Tab>Eventos activos</Tab>
                                <Tab>Historial de eventos</Tab>
                            </TabList>
                            <TabPanel>
                                <a  href="/organizerNewEvent"><button class="btnAdd" style={{float:'right'}}>Nuevo</button></a>
                                <br/>
                                <this.state.formActives  /> 
                            </TabPanel>
                            <TabPanel> 
                                
                                < this.state.formRecord />
                            </TabPanel>
                        </Tabs>
                        <Botones/>
                    </div>
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

