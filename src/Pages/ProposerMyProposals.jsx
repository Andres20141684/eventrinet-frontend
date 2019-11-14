import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/style_gig_tittle.css'

import Proposer_ActiveEventsTable from '../Components/Jtable/Proposer_ActiveEventsTable';
import Proposer_HistoryEventsTable from '../Components/Jtable/Proposer_HistoryEventsTable';

import {NetworkMutation_JAchievingData} from '../Network/Networking.js';

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
            idUser: -1
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
    shouldComponentUpdate(nextState, nextProps){
        if(nextState.idUser != this.state.idUser){
            return true;
        }
        return false;
    }
   componentWillMount(){
       console.log("ProposerMyProposals",this.props);
    //this.setState({idUser: this.props.nextChildComponentProps.idUser});
   
    var activeEvents = //state is by default an object
         [
            
        ];
     
     var recordEvents = //state is by default an object
         [
            
        ];
     
     this.setState({
        datos_tabla1: activeEvents,
        datos_tabla2: recordEvents
     }); 
   }
   componentDidMount(){
        NetworkMutation_JAchievingData(
            {
            methodPath: 'postulante/listarEventosActivosConPropuestas',
            JsonToBack:{
                idUsuario: this.props.nextChildComponentProps.idUser
            },
            }
        ).then((value) => {
            console.log(value);
            if(value === null || value.succeed===false){
            console.error('FALLO FATAL, modo hardcode activado');
            }else {
            console.log('si hay algo:');
            console.log("ProposerPanel: ", value);
            var data = value.Eventos;
            this.setState({
                datos_tabla1: data
             });
            }
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
                                    idUser={this.state.idUser}
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