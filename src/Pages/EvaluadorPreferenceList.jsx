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

import {NetworkMutation_JAchievingData} from '../Network/Networking.js';
import PaperPreferenceTable from '../Components/Jtable/PaperPreferenceTable';

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
        <h1><br/>Preferencia de Papers de Evaluadores </h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h4>Preferencia Evaluadores:</h4></div>
    </div>
    )
}

/* es llamado por bannerTop y boton finalizar de envio de propuesta */
class EvaluadorPreferenceList extends Component{
    constructor(props){
        super(props);
        this.state = {
            formActives: PaperPreferenceTable,
            datos_tabla1:  [],
            datos_tabla2: [],
            msg: "Not Connected",
            idUser: -1,
            Usuario:null
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    
    }
    /* aqui debo manejar lo cambios de redireccion y de props de mis tablas XD */
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
        if(nextState.datos_tabla1 != this.state.datos_tabla1){
            return true;
        }
        return false;
    }
   componentWillMount(){
       console.log("ProposerMyProposals",this.props);
    //this.setState({idUser: this.props.nextChildComponentProps.idUser});
   
    var activeEvents = //state is by default an object
         [];
     
     var recordEvents = //state is by default an object
         [
            
        ];
     
     this.setState({
        Usuario:this.props.nextChildComponentProps.Usuario,
        datos_tabla1: activeEvents,
        datos_tabla2: recordEvents
     }); 
   }
   updateData(value){
    this.setState({
        datos_tabla1: value
                 });
   }
   componentDidMount(){
        NetworkMutation_JAchievingData(
            {
            methodPath: 'postulante/listarEventosActivosConPropuestas',
            JsonToBack:{
                idUsuario: this.props.nextChildComponentProps.Usuario.idUsuario
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
        console.log("PropOSER mY prOPOSALS.jsx props: ",this.props)
        
        return(
            <div> 
            <MainTittle/>
            <div class="container" >
                <div class ="panel-body">
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
                            <TabList>
                                <Tab>Eventos activos</Tab>
                            </TabList>
                            <TabPanel> 
                                <br/>
                                <this.state.formActives 
                                    idUser={this.props.nextChildComponentProps.Usuario.idUser}
                                    data={this.state.datos_tabla1}  
                                    onNextChildComponentChange={this.handleNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
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
export default EvaluadorPreferenceList;