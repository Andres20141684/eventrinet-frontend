import React, {Component} from 'react';
import "./../../styles/portafolio_styles.css";
import InscriptionEvent from '../InscriptionEvent';
import SendProposal from '../SendProposal';
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



  handleOnclickEvent = () => {
    console.log('redireccionando a ... Inscripcion evento');
    /*Networking.popuateEventConvocatoria(this.props.setEvent[0]).then((value) => {
      console.log("lista de envetow convoctarioas",value);
      if(value == null){
         console.log('no hay convocatorias!');
         
      }else {
         console.log('si hay convocatorias:');
         this.setState({datos_tabla:value});
         console.log(this.state.datos_tabla);
      }
    });
    /*
    this.handleNextChildComponentChangeProps({

    });*/
    console.log("evento convoc 1",this.props.setEventos)
    console.log("evento convoc 1",this.props.setEventos.Eventos[0])
    this.handleNextChildComponentChangeProps(this.props.setEventos.Eventos[0])
    this.handleNextChildComponentChange(SendProposal);
  }
  
  render() {
        
  return (
    <div>
        <section class="portafolio">
            <div class="contenedor">
                <h2 class="titulo">{this.state.title}</h2>
                <div class="galeria-port">
                    <div class="imagen-port" onClick={this.handleOnclickEvent}>
                    <img src="http://awscommunitydaydublin.com/wp-content/uploads/2019/09/doom2-3.png" alt="event1"/>
                  
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