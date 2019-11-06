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
const Networking = require('../Network/Networking.js') ;

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

/* es llamado por bannerTop y boton finalizar de envio de propuesta */
class PropoMyProposals extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: Proposer_ActiveEventsTable,
            formRecord: Proposer_HistoryEventsTable,
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
   componentWillMount(){
    var activeEvents = //state is by default an object
         [
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
        ];
     
     var recordEvents = //state is by default an object
         [
            { evento: 'Evento Historico 1', 
                listProp: [{prop:'El pequeño delfin que hacia biribiri'},
                {prop:'Cosas del internet'}]
            },
            { evento: 'EventSoft 2012', 
                listProp: [{prop:'Propuesta 1'},
                {prop:'Aladdin y su laptop'}]
            }
        ];
     
     this.setState({
        datos_tabla1: activeEvents,
        datos_tabla2: recordEvents
     }); 
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
                                    data={this.state.datos_tabla1} 
                                    onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                /> 
                            </TabPanel>
                            <TabPanel> 
                                
                                < this.state.formRecord 
                                    data={this.state.datos_tabla2} 
                                    onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                />
                            </TabPanel>
                        </Tabs>
                        <Botones/>
                    </div>
                </div>
                <br/><br/>
            </div>
            
        );
    }
}
export default PropoMyProposals;