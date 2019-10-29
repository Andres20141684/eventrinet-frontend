import React, {Component} from 'react';
import "./../../styles/portafolio_styles.css";

import {Link}  from "react-router-dom";

const Networking = require('./../../Network/Networking.js') ;

class Portafolio extends Component{
  constructor(props){
    super(props);
    this.state = {
        msg: "Not Connected" ,
        transport: "go to Fake Ini",
        title: ""
        
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
    this.setState(
        {title: this.props.title}
    );
    
  }

  handleClick = () => {
    this.handleNextChildComponentChange('');
  }
  render() {
    
  return (
    <div>
    
        <section class="portafolio">
            <div class="contenedor">
                <h2 class="titulo">{this.state.title}</h2>
                <div class="galeria-port">
                    <div class="imagen-port">
                        <img src="img/img1.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img2.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img3.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img1.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img4.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img5.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img6.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img7.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img6.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img7.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img6.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                    <div class="imagen-port">
                        <img src="img/img7.jpg" alt=""/>
                        <div class="hover-galeria">
                            <img src="img/icono1.png" alt=""/>
                            <p>Ver Evento</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    </div>

  );}
}

export default Portafolio;