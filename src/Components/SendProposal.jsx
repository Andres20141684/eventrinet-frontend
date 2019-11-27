import React, { Component } from 'react';
import '../styles/style_record.css'; 
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import 'react-table/react-table.css'
import './../styles/InscriptionEvent.css'
import FrmSendPropuesta from './FrmSendPropuesta';
import JMap from './Special/JMap';

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
            asd: "vjglhbjftbvroauyberwuarytwgtwg",
            center: {},
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
                evento:this.state.eventriEvent,categorias:this.state.categorias,
                Usuario: this.props.nextChildComponentProps.Usuario
            });	    
            window.location.replace("./login");
            return;
        }
        //if I'm logged then
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
        try{
        Networking.NetworkMutation_JAchievingData(
        {
            methodPath: 'categorias/listarCategoriasXEvento',
            JsonToBack:{
                idEvento: this.props.nextChildComponentProps.evento.idEvento
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
        
    });}catch(e){console.error("SendProposalError:", e)};
    }
    componentDidMount(){
        console.log("props heredados del Dashboard->Protafolio->imageport");
    
        console.log('Send Propuesta Props ->',this.props.nextChildComponentProps);
        this.setState({eventriEvent: this.props.nextChildComponentProps.evento || {}});
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

        console.log("solo hago copy &paste",this.state.eventriEvent);

        return(
            



<div>
<div id="video-area" data-stellar-background-ratio="0.5" >    
      <div id="block" data-vide-bg="video/video"></div>
      
      <div class="overlay overlay-2"></div>      
      <div class="container">
        <div class="row justify-content-md-center">
          <div class="col-md-10">
            <div class="contents text-center">

            <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">
                            { this.state.eventriEvent.nombre}  
                            </h1>
                            <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">
                            <i style={{color:"white"}} class="fa fa-map-marker" aria-hidden="true"></i>
                            {"Lugar : "+ this.state.eventriEvent.lugar}
                            
                            
                            </h1> 
                            <h1 class="wow fadeInDown" data-wow-duration="1000ms" data-wow-delay="0.3s">
                                 <i style={{color:"white"}}class="fa fa-calendar" aria-hidden="true"></i>
                                 {this.state.eventriEvent.fechaIni} 
                            </h1>

              <button style={{color:"#002D3D"}}onClick={this.handleClicInscripcionEvento} class="specialButton" data-wow-duration="1000ms" data-wow-delay="400ms">
                  <i class="fa fa-upload" aria-hidden="true">
                      </i> Enviar propuesta</button>
            </div>
          </div>
        </div> 
      </div>      
    </div>


    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="row" id="gradient">

                <div class="col-md-4" style={{paddingBottom:"20px"}}>
                    <img src={this.state.eventriEvent.imagen || "img/img3.jpg"} class="img-responsive" alt=""/>
                    <h1 style={{fontSize:"25px"},{color:"black"}}>Evento: { " " +this.state.eventriEvent.nombre}</h1>
                </div>
                <div class="col-md-8" id="overview">
                    <div class="row">
                        
                        <div class="col-xs-5 col-md-5 text-center" id="fan">
                            <h2>{this.state.eventriEvent.fechaFin}</h2>
                        </div>

                        <div class="col-xs-4 col-md-4" id="hits">
                            <p style={{color:"white"}}>Categorias</p>
                            
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
                <JMap/>
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


    <section className="clientes contenedor">
            <h2 className="titulo">Que dicen nuestros clientes</h2>
            <div className="cards">
                <div className="card">
                    <img src="img/face1.jpg" alt=""/>
                    <div className="contenido-texto-card">
                        <h4>Name</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, sapiente!</p>
                    </div>
                </div>
                <div className="card">
                    <img src="img/face2.jpg" alt=""/>
                    <div className="contenido-texto-card">
                        <h4>Name</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, sapiente!</p>
                    </div>
                </div>
            </div>
        </section>

       </div>    




        );
    }
}


export default SendProposal;

