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
      <section class="about-services">
        <div class="contenedor">
            <h2 class="titulo">Nuestros servicios</h2>
            <div class="servicio-cont">
                <div class="servicio-ind">
                    <img src="img/ilustracion2.svg" alt=""/>
                    <h3>Name</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, qui?</p>
                </div>
                <div class="servicio-ind">
                    <img src="./img/ilustracion4.png" alt=""/>
                    <h3>Name</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, qui?</p>
                </div>
                <div class="servicio-ind">
                    <img src="img/ilustracion3.svg" alt=""/>
                    <h3>Name</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, qui?</p>
                </div>
            </div>
        </div>
    </section>
);
}
function Presentacion(props){
  return(
    <section class="contenedor sobre-nosotros">
        <h2 class="titulo">Nuestro producto</h2>
        <div class="contenedor-sobre-nosotros">
            <img src="./img/ilustracion1.png" alt="" class="imagen-about-us"/>
            <div class="contenido-textos">
                <h3><span>1</span>Los mejores productos</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt veniam eius aspernatur ad
                    consequuntur aperiam minima sed dicta odit numquam sapiente quam eum, architecto animi pariatur,
                    velit doloribus laboriosam ut.</p>
                <h3><span>2</span>Los mejores productos</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt veniam eius aspernatur ad
                    consequuntur aperiam minima sed dicta odit numquam sapiente quam eum, architecto animi pariatur,
                    velit doloribus laboriosam ut.</p>
            </div>
        </div>
    </section>

  );
}
class NewIni extends Component{
  constructor(props){
    super(props);
    this.state = {
        msg: "Not Connected" ,
        transport: "go to Fake Ini"
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
        
        this.setState({msg:response.message});
        console.log({msg:response.message});
      })
      .catch( (err) =>{
        console.log("error en conexión");
        this.setState({msg:"Intento de conexión fallido"});
        console.log(err);
      })
  }

  handleClick = () => {
    console.log('redireccionando a ... FakeNewIni evento');
    this.handleNextChildComponentChange(FakeNewIni);
  }
  render() {
    
  return (
    <div>
    <header>
        
        <div class="textos-header" >
                  
                  <h1 style={styles.textos_header_h1}>EVENTRINET gestion de eventos Academicos Peru</h1>
                  <h2 style={styles.textos_header_h2}>En construccion ...</h2>
                  <h1>{this.state.msg}</h1>
                  <a href="#" className="specialButton" onClick={this.handleClick} >
                {this.state.transport}
                </a>
              </div>
              <div class="wave" style={styles.waveStyle}
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
        
        <section class="clientes contenedor">
            <h2 class="titulo">Que dicen nuestros clientes</h2>
            <div class="cards">
                <div class="card">
                    <img src="img/face1.jpg" alt=""/>
                    <div class="contenido-texto-card">
                        <h4>Name</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, sapiente!</p>
                    </div>
                </div>
                <div class="card">
                    <img src="img/face2.jpg" alt=""/>
                    <div class="contenido-texto-card">
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
    height: "600px",
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
    height: "150px",
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
    fill: "#fff"
  }
,
/****** */



}