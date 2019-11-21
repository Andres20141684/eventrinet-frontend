import React, {Component} from 'react';
import FakeNewIni from './FakeNewIni';
import "./estilos.css";

import {Link}  from "react-router-dom";
import Portafolio from '../Special/Portafolio';

const Networking = require('./../../Network/Networking.js') ;
function nav(props){
  return(<nav>
            <a href="#">Inicio</a>
            <a href="#">Acerca de</a>
            <a href="#">Portafolio</a>
            <a href="#">Servicios</a>
            <a href="#">Contacto</a>
        </nav>);

}
function Servicios(props){
  return(
      <section className="about-services">
        <div className="contenedor">
            <h2 v="titulo">Nuestros servicios</h2>
            <div className="servicio-cont">
                <div className="servicio-ind">
                    <img src="img/ilustracion2.svg" alt=""/>
                    <h3>Gestion de Eventos Academicos</h3>
                    <p>Quieres difundir tus eventos académicos?
                      Eventrinet contiene todas las herramientas necesarias
                    </p>
                </div>
                <div className="servicio-ind">
                    <img src="./img/ilustracion4.png" alt=""/>
                    <h3>Inscripciones para ponentes y espectadores</h3>
                    <p>Todo lo que se requiere para ser parte de un evento, tanto como
                      expositor como ara espectador
                    </p>
                </div>
                <div className="servicio-ind">
                    <img src="img/ilustracion3.svg" alt=""/>
                    <h3>Viajes a la Luna</h3>
                    <p>Aqui tambien habrá un concierto de la Vaca Lola porque tiene cabeza, y se le perdio su cola :(</p>
                </div>
            </div>
        </div>
    </section>
);
}
function Presentacion(props){
  return(
    <section className="contenedor sobre-nosotros">
        <h2 className="titulo">Nuestro producto</h2>
        <div className="contenedor-sobre-nosotros">
            <img src="./img/ilustracion1.png" alt="" className="imagen-about-us"/>
            <div className="contenido-textos">
                <h3><span>1</span>Las mejores organizaciones de eventos</h3>
                <p>Sé parte de la familia Eventrinet y empieza administrar tus eventos
                   académicos y profesionales, call for papers, y más.</p>
                <h3><span>2</span>Las mejores acogidas</h3>
                <p>Eventrinet es una plataforma de difución de eventos
                   alrededor del mundo y nuestro servicio es utilizado
                   por grandes compañias, universidades entre otros.</p>
            </div>
        </div>
    </section>

  );
}
class NewIni extends Component{
  constructor(props){
    super(props);
    this.state = {
        //msg: "Not Connected" ,
        link_propuestabase64: '#',
        lastLink:"_",
        attempt:0
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
    
    console.log("AppWillMount")
    
    Networking.saludar().then(
      (response)=>{
        
        //this.setState({msg:response.message});
        console.log({msg:response.message});
      })
      .catch( (err) =>{
        console.log("error en conexión");
        //this.setState({msg:"Intento de conexión fallido"});
        console.log(err);
      })
    
      

 


  }
  componentDidMount(){
    console.log("a-->", document.getElementById('JinSSJ'));
  }
  handleClickB = () => {
    console.log("a-->", document.getElementById('JinSSJ'));
    
    Networking.getPaper(59).then(
      (response)=>{
        this.state.attempt=this.state.attempt+1;
        console.log(">>>>>>>>>>>>>>>>>> Se descargo again ,", this.state.attempt);
        this.setState({link_propuestabase64:response.Propuesta});
        //window.download(response.Propuesta, 'Save');
        document.getElementById('JinSSJ').click();
        
      })
      .catch( (err) =>{
        console.log("error en conexión Propuesta");
      })
  }
  handleClick = () => {
    console.log('redireccionando a ... FakeNewIni evento');
    
    
    

  }
  render() {
    
  return (
    <div>
    <header>
        
        <div className="textos-header" >
                  
                  <h1 style={styles.textos_header_h1}>Sistema de gestión de eventos académicos</h1>
                  <h1>{this.state.msg}</h1>

                  <button  
                            id="button_finish"
                            style={{float:'center'}} 
                            class="mybutton" 
                            color="primary" 
                            onClick={this.handleClickB}
                            >
                      Finalizar
                      </button>
                  <a id='JinSSJ' onClick={this.handleClick}
                  className="specialButton" href={this.state.link_propuestabase64} download="file.pdf" > Paper SSJ</a>


              </div>
              <div className="wave" style={styles.waveStyle}
              //style={{height: "150px"},{overflow: "hidden"}}
                //style="height: 150px; overflow: hidden;"
                >
                <svg viewBox="0 0 500 150" preserveAspectRatio="none"
                      //style="height: 100%; width: 100%;"
                      style={styles.viewBoxStyle}
                      //style={{height: "100%"},{width: "100%"}}
                      >
                      <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                          //style="stroke: none; fill: #fff;"
                          style={styles.pathStyle}
                          //style={{stroke: "none"},{fill: "#fff"}}
                          ></path>
                  </svg></div>
    </header>
    <main>
        <Presentacion/>
        
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
        <Servicios/>
    </main>
    </div>

  );}
}

export default NewIni;
var styles = {
  body:{
    fontFamily: 'open sans'
  },
  headerStyle:{
    width: "100%",
    height: "400px",
    background: "#bc4e9c",
    /* fallback for old browsers */
    background: 
    "-webkit-linear-gradient(to right, hsla(204, 60%, 23%, 0.459), hsla(204, 73%, 47%, 0.459)), url(portada.jpg)",
    /* Chrome 10-25, Safari 5.1-6 */
    background: "linear-gradient(to right, hsla(204, 60%, 23%, 0.459), hsla(204, 73%, 47%, 0.459)), url(portada.jpg)",
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    backgroundSize: "cover",
    backgroundttachment: "fixed",
    position: "relative"
  }
  ,
  waveStyle:{
    height: "70px",
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  viewBoxStyle:{
    height: "100%",
    width: "100%"
  },
  pathStyle:{
    stroke: "none",
    fill: "#ffffff"
  }
,
/****** */



}