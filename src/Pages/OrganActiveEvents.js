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
      }
      
    render(){
        /* no se como xuxa hacemos pero aqui se optiene un JSON del piton xd */
        var datos2 ={ //state is by default an object
            chupetinesGA: [
               { listaEventos: 'Evento 1', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'Evento 2', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'Evento 3', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'Evento 4', propRec: 'si', propEval: 'no', programa: 'si'},
               { listaEventos: 'Evento 5', propRec: 'si', propEval: 'no', programa: 'si'}
            ]
         }
         var datos1 ={ //state is by default an object
            chupetinesGA: [
                { listaEventos: 'Evento 6'},
                { listaEventos: 'Evento 7'},
                { listaEventos: 'Evento 8'},
                { listaEventos: 'Evento 9'},
                { listaEventos: 'Evento 10'},
                { listaEventos: 'Evento 11'}
            ]
         }
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
                            <this.state.formActives data ={datos2}/> 
                        </TabPanel>
                        <TabPanel> 
                            < this.state.formRecord data ={datos1}/>
                        </TabPanel>
                    </Tabs>
                </div>
                
            </div>    
            <br/><br/>
            <this.state.bannBot/>
            </div>
        );
    }
}


export default OrganActiveEvents;

