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
            myURL: "eventrinet.s3-website-us-east-1.amazonaws.com/?EventriEvents&idEvento=",
            msg: "Not Connected",
            idOrganizador: 1,
            eventriEvent:{},
            Categorias:[
                {descripcion:'Machine Learning'},
                {descripcion:'Machine Learning nombre largote'}],
            asd: "vjglhbjftbvroauyberwuarytwgtwg",
            center: {},
            Usuarios:{}
        }
        this.renderJMap=this.renderJMap.bind(this);
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
    renderPresidente(_Usuarios){
        console.error("SendProposal   _Usuarios", _Usuarios)
        console.error("SendProposal   _Usuarios.", _Usuarios.presidente)
        try{
           
                return(
                    <div className="card">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt=""/>
                    <div className="contenido-texto-card">
                        
                        <h4>Presidencia: {_Usuarios.presidente[0].nombre}</h4>
                        <p>{_Usuarios.presidente[0].correo}</p>
                    </div>
                </div>
                
                );
            
        }catch(e){

        }
    }
    renderEvaluadores(_Usuarios){
        console.error("SendProposal   _Usuarios", _Usuarios)
        console.error("SendProposal   _Usuarios.", _Usuarios.evaluadores)
        try{
            return(
            _Usuarios.evaluadores.map(element => {
                return(
                    <div className="card">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt=""/>
                    <div className="contenido-texto-card">
                        <h4>Evaluador: {element.nombre}</h4>
                        <p>{element.correo}</p>
                    </div>
                </div>
                );
            })
            );
        }catch(e){

        }
    }
    rendercomiteOrganizacional(_Usuarios){
        console.error("SendProposal   _Usuarios", _Usuarios)
        console.error("SendProposal   _Usuarios.", _Usuarios.comiteOrganizacional)
        try{return(
            _Usuarios.comiteOrganizacional.map(element => {
                return(
                    <div className="card">
                        
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt=""/>
                    <div className="contenido-texto-card">
                        <h4>{element.nombre}</h4>
                        <p>{element.correo}</p>
                    </div>
                </div>
                );
            }));
        }catch(e){

        }
    }
    componentDidMount(){
        console.log("props heredados del Dashboard->Protafolio->imageport");
        
        console.log('Send Propuesta Props ->',this.props.nextChildComponentProps);
        this.setState({eventriEvent: this.props.nextChildComponentProps.evento || {}});
        this.getCategoriasfromApi(); 
        try{
        Networking.NetworkMutation_JAchievingData(
            {
                methodPath: 'evento/listar_usuarios',
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
                this.setState({Usuarios: value});
                //this.renderCategories();
            }
           
            
        });}catch(e){console.error("SendProposalError:", e)};
        
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.eventriEvent != this.state.eventriEvent){
            return true;
        }
        if(nextState.Categorias != this.state.Categorias){
            return true;
        }
        if(nextState.Usuarios != this.state.Usuarios){
            return true;
        }
          return false;
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
     
    renderJMap(_lugar){
        return(<JMap
            lugar={_lugar}
            mode ={"event_visualization"}/>);
      }
      
    render(){

        console.log("solo hago copy &paste",this.state.eventriEvent);

        return(
            



<div>

            
<div class="wrapper">

    <div class="content-area">

<div id="main">
    

    <section class="page-section no-padding background-img-slider">
        <div class="container_im">

<div id="video-area" data-stellar-background-ratio="0.5" 
style={{"background-image": "linear-gradient(to right, rgba(0, 45, 61, 0.555), rgba(19, 136, 179, 0.678)),url(" + this.state.eventriEvent.imagen +")",
background:"linear-gradient(to right, rgba(0, 45, 61, 0.555), rgba(19, 136, 179, 0.678)), url(" + this.state.eventriEvent.imagen +")"}
}>    
      <div id="block" data-vide-bg="video/video"></div>
      
      <div class="overlay overlay-2"></div>      
      <div class="container_im">
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
            
        </div>

        

    </section>
    
</div></div>













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
                            <button class="btn" >
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
                {this.renderJMap(this.props.nextChildComponentProps.evento.lugar)}
                



                <div class="container">
                <div class="contenedor-sobre-nosotros">
                <div class="contenido-textos">
                    <h1>Descripcion del Evento</h1>
                    <p>{this.state.eventriEvent.descripcion}</p>
                </div></div>
                                 
            </div>


            </div>
            
        </div>
    </div>


    <section className="clientes contenedor">
            <h2 className="titulo">Comité Académico del Evento</h2>
            <div className="cards">
            {this.renderPresidente(this.state.Usuarios)}
            {this.renderEvaluadores(this.state.Usuarios)}
            </div>
        </section>
        <section className="clientes contenedor">
            <h2 className="titulo">Comité Organizacional del Evento</h2>
            <div className="cards">
            {this.rendercomiteOrganizacional(this.state.Usuarios)}
            </div>
        </section>

       </div>    

       </div>


        );
    }
}


export default SendProposal;
/*


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
            Usuarios:{}
        }
        this.renderJMap=this.renderJMap.bind(this);
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
    renderPresidente(_Usuarios){
        console.error("SendProposal   _Usuarios", _Usuarios)
        console.error("SendProposal   _Usuarios.", _Usuarios.presidente)
        try{
           
                return(
                    <div className="card">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt=""/>
                    <div className="contenido-texto-card">
                        
                        <h4>Presidencia: {_Usuarios.presidente[0].nombre}</h4>
                        <p>{_Usuarios.presidente[0].correo}</p>
                    </div>
                </div>
                
                );
            
        }catch(e){

        }
    }
    renderEvaluadores(_Usuarios){
        console.error("SendProposal   _Usuarios", _Usuarios)
        console.error("SendProposal   _Usuarios.", _Usuarios.evaluadores)
        try{
            return(
            _Usuarios.evaluadores.map(element => {
                return(
                    <div className="card">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt=""/>
                    <div className="contenido-texto-card">
                        <h4>Evaluador: {element.nombre}</h4>
                        <p>{element.correo}</p>
                    </div>
                </div>
                );
            })
            );
        }catch(e){

        }
    }
    rendercomiteOrganizacional(_Usuarios){
        console.error("SendProposal   _Usuarios", _Usuarios)
        console.error("SendProposal   _Usuarios.", _Usuarios.comiteOrganizacional)
        try{return(
            _Usuarios.comiteOrganizacional.map(element => {
                return(
                    <div className="card">
                        
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" alt=""/>
                    <div className="contenido-texto-card">
                        <h4>{element.nombre}</h4>
                        <p>{element.correo}</p>
                    </div>
                </div>
                );
            }));
        }catch(e){

        }
    }
    componentDidMount(){
        console.log("props heredados del Dashboard->Protafolio->imageport");
    
        console.log('Send Propuesta Props ->',this.props.nextChildComponentProps);
        this.setState({eventriEvent: this.props.nextChildComponentProps.evento || {}});
        this.getCategoriasfromApi(); 
        try{
        Networking.NetworkMutation_JAchievingData(
            {
                methodPath: 'evento/listar_usuarios',
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
                this.setState({Usuarios: value});
                //this.renderCategories();
            }
            
        });}catch(e){console.error("SendProposalError:", e)};
        
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.eventriEvent != this.state.eventriEvent){
            return true;
        }
        if(nextState.Categorias != this.state.Categorias){
            return true;
        }
        if(nextState.Usuarios != this.state.Usuarios){
            return true;
        }
          return false;
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
     
    renderJMap(_lugar){
        return(<JMap
            lugar={_lugar}
            mode ={"event_visualization"}/>);
      }
    render(){

        console.log("solo hago copy &paste",this.state.eventriEvent);

        return(
            



<div>

            
<div class="wrapper">

    <div class="content-area">

<div id="main">
    

    <section class="page-section no-padding background-img-slider">
        <div class="container_im">

<div id="video-area" data-stellar-background-ratio="0.5" 
style={{"background-image": "linear-gradient(to right, rgba(0, 45, 61, 0.555), rgba(19, 136, 179, 0.678)),url(" + this.state.eventriEvent.imagen +")",
background:"linear-gradient(to right, rgba(0, 45, 61, 0.555), rgba(19, 136, 179, 0.678)), url(" + this.state.eventriEvent.imagen +")"}
}>    
      <div id="block" data-vide-bg="video/video"></div>
      
      <div class="overlay overlay-2"></div>      
      <div class="container_im">
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
            
        </div>

        

    </section>
    
</div></div>













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
                {this.renderJMap(this.props.nextChildComponentProps.evento.lugar)}
                



                <div class="container">
                <div class="contenedor-sobre-nosotros">
                <div class="contenido-textos">
                    <h3>Descripcion del Evento</h3>
                    <p>{this.state.eventriEvent.descripcion}</p>
                </div></div>
                                 
            </div>


            </div>
            
        </div>
    </div>


    <section className="clientes contenedor">
            <h2 className="titulo">Comité Académico del Evento</h2>
            <div className="cards">
            {this.renderPresidente(this.state.Usuarios)}
            {this.renderEvaluadores(this.state.Usuarios)}
            </div>
        </section>
        <section className="clientes contenedor">
            <h2 className="titulo">Comité Organizacional del Evento</h2>
            <div className="cards">
            {this.rendercomiteOrganizacional(this.state.Usuarios)}
            </div>
        </section>

       </div>    

       </div>


        );
    }
}


export default SendProposal;

*/