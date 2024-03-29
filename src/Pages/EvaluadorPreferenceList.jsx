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
import PaperPreferenceTable from '../Components/Jtable/PaperPreferenceTable';
import AsignEvalPropuesta from './Asign_Eval_Propuest';
const Networking = require('../Network/Networking') ;


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
   updateData(value){
    this.setState({
        datos_tabla1: value
                 });
   }
   componentDidMount(){
    Networking.listarPreferenciasXPropuesta(JSON.stringify({idEvento:this.props.nextChildComponentProps.idEvento}))
        .then((value) => {
            console.log(value);
            this.setState({datos_tabla1:value.PreferenciasXPropuesta})
        });
         
   }
   retroceder(){
    this.handleNextChildComponentChange(AsignEvalPropuesta);
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
                                <Tab>Propuestas</Tab>
                            </TabList>
                            <TabPanel> 
                                <br/>
                                <this.state.formActives 
                                    //idUser={this.props.nextChildComponentProps.Usuario.idUser}
                                    data={this.state.datos_tabla1}  
                                    //onNextChildComponentChange={this.handleNextChildComponentChange} 
                                    //onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
                                /> 
                            </TabPanel>
                        </Tabs>
                        <div>
                            <h2><br/></h2>
                            <h3>
                            <button class="mybutton" onClick={()=>{this.handleNextChildComponentChange(AsignEvalPropuesta)}} style={{float:'left'}}>Atras</button>
                            <br/><br/>
                            </h3>
                        </div>
                    </div>
                </div>
                <br/><br/>
            </div>
            
        );
    }
}
export default EvaluadorPreferenceList;