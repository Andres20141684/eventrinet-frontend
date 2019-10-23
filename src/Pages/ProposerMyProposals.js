import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'

import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import Proposer_ActiveEventsTable from '../Components/Jtable/Proposer_ActiveEventsTable';
import Proposer_HistoryEventsTable from '../Components/Jtable/Proposer_HistoryEventsTable';
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
        <h1><br/>Mis propuestas por evento</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h4>Gestion de eventos activos e históricos</h4></div>
    </div>
    )
}


class PropoMyProposals extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        formActives: Proposer_ActiveEventsTable,
        formRecord: Proposer_HistoryEventsTable,
        datos_tabla1:  null,
        datos_tabla2: null,
    }
    
   
    render(){
        var activeEvents ={ //state is by default an object
            chupetines_AE: [
                { evento: 'Evento del mundo mundial', 
                    listProp: [{prop:'Propuesta 1', fase: '2', estado: 'Enviado',fechaLim: '23/23/23'},
                    {prop:'Propuesta 2', fase: '2', estado: 'Enviado',fechaLim: '23/23/23'},
                    {prop:'Propuesta 3', fase: '2', estado: 'Pendiente de envio',fechaLim: '23/23/23'}] 
                },
                { evento: 'Evento de Glenko en floro', 
                    listProp: [{prop:'internet de mis cosas', fase: '2', estado: 'Enviado',fechaLim: '23/23/23'},
                    {prop:'Propuesta 2', fase: '2', estado: 'Rechazado',fechaLim: '23/23/23'},
                    ] 
                },
                { evento: 'Evento Graficos Monas Chinas', 
                    listProp: [{prop:'Machine Learning', fase: '2', estado: 'Pendiendte de envio',fechaLim: '23/23/23'},
                    ] 
                }
            ]
         }
         var recordEvents ={ //state is by default an object
            chupetines_RE: [
                { evento: 'Evento Historico 1', 
                    listProp: [{prop:'El pequeño delfin que hacia biribiri'},
                    {prop:'Cosas del internet'}]
                },
                { evento: 'EventSoft 2012', 
                    listProp: [{prop:'Propuesta 1'},
                    {prop:'Aladdin y su laptop'}]
                }
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
                                
                                <br/>
                                <this.state.formActives data={activeEvents} /> 
                            </TabPanel>
                            <TabPanel> 
                                
                                < this.state.formRecord data={recordEvents} />
                            </TabPanel>
                        </Tabs>
                        <Botones/>
                    </div>
                </div>
                <br/><br/>
            <this.state.bannBot/>
                </div>
            
        );
    }
}
export default PropoMyProposals;