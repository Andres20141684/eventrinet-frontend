import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import {defaultStyle} from '../../styles/styles.js'
import Modal from 'react-awesome-modal';
import { whileStatement } from '@babel/types';
import { borderColor } from '@material-ui/system';
import '../../styles/style_banner_top.css'
class BannerTop extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        visible : false,
        role: null,
    }
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }
  
  render(){
    //debugger;
    return (
      <div id="bannerTop" style={styles.banner}><br/>
        <div className="list-inline-item d-flex flex-column flex-md-row align-items-center ">
          <div className="list-inline-item my-0 mr-md-auto font-weight-normal">
            <a href="/" target="_self" title="Volver al home"> <img src="piruleta_loquisima.png" className="img-fluid"  width="200"/></a>
          </div>          
          <div class="nav navbar-nav navbar-right ml-auto" style={{alignItems:"center",paddingRight:20}}>
              <div className="list-inline-item" align="right">
                <a className="nav" href="/login" style={{color:"#6CDCD6",paddingRight:20}}>Login</a>            
              </div>
              <li class="nav-item dropdown">
                  <a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle user-action">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" class="avatar" alt="Avatar"/>
                  </a>
                  <ul class="dropdown-menu">
                      <li><a href="#" class="dropdown-item"><i class="fa fa-user-o"></i> Perfil</a></li>
                      <li><a href="#" class="dropdown-item"><i class="fa fa-sliders"></i> Ajustes</a></li>
                      <li class="divider dropdown-divider"></li>
                      <li><a href="#" class="dropdown-item"><i class="material-icons">&#xE8AC;</i> Cerrar sesion</a></li>
                  </ul>
              </li> 
            </div>
        </div>
        <div style={{paddingRight:20, paddingLeft:20}}><hr  class="line-top"/></div>
    
        <div>  
        
        <nav class="navbar navbar-default navbar-expand-xl navbar" style={styles.navbar}>
          <button class="navbar-toggler scrollbar scrollbar-primary" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <i class="navbar-toggler-icon fa fa-bars" style={styles.fa} aria-hidden="true"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown" style={{}}>
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/"><b><font size="3" color="#6CDCD6">Inicio</font></b><span class="sr-only">(current)</span></a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" href="/events"><b><font size="3" color="#6CDCD6">Eventos</font></b></a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" href="/announcements"><b><font size="3" color="#6CDCD6">Convocatoria</font></b></a>
              </li>
              <li class="nav-item" class="nav dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button"  aria-haspopup="true" aria-expanded="false"><b><font size="3" color="#6CDCD6">Opciones</font></b></a>
                <ul class="dropdown-menu">
                  <li><a class="nav-link" href="#"><b><font size="3">Mis inscripciones</font></b></a></li>
                  <li><a class="nav-link" href="#"><b><font size="3">Mis propuestas</font></b></a></li>
                  <div class="dropdown-divider"></div>
                  <li><a class="nav-link" href="/organActiveEvents"><b><font size="3">Organizador</font></b></a></li>
                  <li><a class="nav-link" href="/presidentEvents"><b><font size="3">Presidente</font></b></a></li>
                  <li><a class="nav-link" href="/EvaluadorEventos"><b><font size="3 ">Evaluador</font></b></a></li>
                </ul>
              </li>
            </ul>
            
            <form class="navbar-form form-inline">
              <div class="input-group search-box" style={{alignItems:"center"}}>								
                    <input type="text" id="search" class="form-control" placeholder="Buscar" style={{alignItems:"center"}}/>
                    <span class="input-group-addon"><i class="material-icons">&#xE8B6;</i></span>
              </div>
            </form>            
          </div>
        </nav>
        </div>
      </div>
        
    );
  }
}

export default BannerTop;

var styles = {
  banner:{
    backgroundColor: '#002D3D',
    paddintTop:0,
    FontSize: 20,
    color:'#6CDCD6',
  }
  ,fa:{
    paddingTop:12,
    paddingRight:20,
    color:'#6CDCD6',
  },
  navbar:{
    backgroundColor:'#002D3D',
    borderColor:'#002D3D',
    paddingLeft:30,
    paddingRight:30,
  }
}