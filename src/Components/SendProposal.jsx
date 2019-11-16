import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/InscriptionEvent.css'
import FrmSendPropuesta from './FrmSendPropuesta';

const Networking = require('../Network/Networking.js') ;


class SendProposal extends Component{
    constructor(props){
        super(props);
        this.state = {
            msg: "Not Connected",
            idOrganizador: 1,
            eventriEvent:{},
            Categorias:[
                {descripcion:'Machine Learning'},
                {descripcion:'Machine Learning nombre largote'}],
            asd: "vjglhbjftbvroauyberwuarytwgtwg"
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
    
    handleClicInscripcionEvento = () => {
    try{ //Verify if I'm logged
        let retrievedObject = sessionStorage.getItem('dataUser');
        let retrievedJson = JSON.parse(retrievedObject);
        
        if (retrievedJson == null){ //I'm not logged
            console.log("No estoy logeado!")
            alert("No has iniciado sesión!")                

            sessionStorage.setItem('currentPage', "SendProposal");	
            //parche temporal
            sessionStorage.setItem('currentProps', JSON.stringify({
                evento:this.props.nextChildComponentProps.evento,
                Categorias:this.state.Categorias
            }));	//parche temporal
            this.handleNextChildComponentChangeProps({
                evento:this.state.eventriEvent,categorias:this.state.categorias
            });	    
            window.location.replace("./login");
            return
        }
        //I'm logged
        console.log('redireccionando a ... inscribirse evento');
        this.handleNextChildComponentChangeProps({
            evento: this.props.nextChildComponentProps.evento,
            Categorias: this.state.Categorias,
            Usuario:this.props.nextChildComponentProps.Usuario
        });
        this.handleNextChildComponentChange(FrmSendPropuesta);
    }catch(err){
        console.log(err)            
    }
    return
    }
    getCategoriasfromApi(){
        Networking.NetworkMutation_JAchievingData(
        {
            methodPath: 'categorias/listarCategoriasXEvento',
            JsonToBack:{
                idEvento: 
                this.props.nextChildComponentProps.evento.idEvento
            }
        }
        ).then((value) =>  {
        console.log(value);
        if(value == null){
            console.log('no hay algo aun');
        }else {
            console.log('si hay algo:');
            this.setState({Categorias: value.Categorias});
            //this.renderCategories();
        }
        
    });
    }
    componentDidMount(){
        console.log("props heredados del Dashboard->Protafolio->imageport");
    
        console.log('nextChildComponentProps',this.props.nextChildComponentProps);
        this.setState({eventriEvent: this.props.nextChildComponentProps.evento});
        this.getCategoriasfromApi(); 
        
        
    }
    renderCategories(){
        return this.state.Categorias.map(
            (element) => { const {descripcion}=element
                return(
                    <li> {descripcion} </li>
                )
                
            }
        )
    }
     
   
    render(){

        return(
            <div>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="row" id="gradient">

                <div class="col-md-4" style={{paddingBottom:"20px"}}>
                    <img src="img/img3.jpg" class="img-responsive" alt=""/>
                    <h1 style={{fontSize:"25px"},{color:"black"}}>Evento:</h1>
                    <h1 style={{fontSize:"20px"}}> {this.state.eventriEvent.nombre}</h1>
                </div>
                <div class="col-md-8" id="overview">
                    <div class="row">
                        
                        <div class="col-xs-5 col-md-5 text-center" id="fan">
                            <h2>{this.state.eventriEvent.fechaFin}</h2>
                        </div>

                        <div class="col-xs-4 col-md-4" id="hits">
                            <p style={{color:"black"}}>Categorias</p>
                            
                            <ul class="pb-product-details-ul" id="eventCategories" >
                            {this.renderCategories()}</ul>
                        </div>                        
                           
                        <div class="col-xs-3 col-md-3 text-center" >
                            <button class="btn">
                                <i class="fa fa-share-alt" aria-hidden="true"/>
                                </button>
                            <p>Compartir evento</p>
                        </div>
                    </div>
                    <br/><br/>
                    <div class="row">
                        <button type="button" class="btn btn-success form-control text-center" 
                        onClick={this.handleClicInscripcionEvento}>Enviar Propuesta</button>
                    </div>    
                </div>

                <div class="container">
                <Tabs defaultIndex={0}>
                    <TabList>
                        <Tab>Descripción</Tab>
                        <Tab>Lugar</Tab>
                        <Tab>Comités</Tab>
                        <Tab>Contacto</Tab>
                        <Tab>Directrices para el envio</Tab>  
                    </TabList>

                    <TabPanel>
                        <br/><br/>
                        <h2>{this.state.eventriEvent.descripcion}</h2>
                        <br/><br/>
                    </TabPanel>
                    
                    <TabPanel>
                    <br/><br/>
                        <h2>{this.state.eventriEvent.lugar}</h2>
                        <br/><br/>
                    </TabPanel>
                    
                    <TabPanel>
                        <h2> Comite Organizacional </h2>   
                        <h4>Este man</h4>  
                        <h4>Esta Woman</h4>  
                        <h4>Este man</h4>  
                        <h2> Comite Academico </h2>  
                        <h4>Esta Woman</h4>  
                        <h4>Este men</h4>  
                        <h4>Este men</h4>  
                        <h4>Esta Woman</h4>                
                    </TabPanel>

                    <TabPanel>
                    <br/><br/>
                        <h2>{this.state.asd}</h2>   
                        <br/><br/>            
                    </TabPanel>

                    <TabPanel>
                    <br/><br/>
                        <h2>{this.state.eventriEvent.descripcion}</h2> 
                        <br/><br/>              
                    </TabPanel>
                </Tabs>                      
            </div>


            </div>
            
        </div>
    </div>
    </div>
        );
    }
}


export default SendProposal;

