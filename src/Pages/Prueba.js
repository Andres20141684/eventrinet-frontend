import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import '../styles/style_banner_top.css'
class Prueba extends Component{
  
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
        <nav id="bannerTop" class="navbar navbar-default navbar-expand-xl navbar-fixed-top" style={styles.banner} >
            <div class="navbar-header d-flex col">
                <a class="navbar-brand" href="#"><i class="fa fa-cube"></i>Brand<b>Name</b></a>  		
                <button type="button" data-target="#navbarNavDropdown" data-toggle="collapse" class="navbar-toggle navbar-toggler ml-auto">
                    <span class="navbar-toggler-icon"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>

            <div id="navbarNavDropdown" class="collapse navbar-collapse justify-content-start">
                <ul class="nav navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="/"><b><font size="3" color="#6CDCD6">Inicio</font></b><span class="sr-only">(current)</span></a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="/events"><b><font size="3" color="#6CDCD6">Eventos</font></b></a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="/announcements"><b><font size="3" color="#6CDCD6">Convocatoria</font></b></a>
                    </li>
                    <li class="nav-item dropdown">
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
            <div class="input-group search-box">								
              <input type="text" id="search" class="form-control" style={{alignItems:"center"}} placeholder="Buscar"/>
              <span class="input-group-addon"><i class="material-icons">&#xE8B6;</i></span>
            </div>
          </form>
            <ul class=" navbar-right ml-auto " style={{height:50, alignItems:"center"}} >
            </ul>
            <form class="navbar-form navbar-right ml-auto">
                
                <ul class="nav navbar-nav">
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
                </ul>
                
            </form>            
          </div>
        </nav>
    );
  }
}

export default Prueba;

var styles = {
  banner:{
    backgroundColor: '#002D3D',
    paddintTop:0,
    paddingBottom: 0,
    paddingRight:0,
    FontSize: 20,
    color:'#6CDCD6',
  }
  ,fa:{
    paddingTop:1,
    paddingRight:20,
    color:'#6CDCD6',
  },
  navbar:{
    backgroundColor:'#002D3D',
    borderColor:'#002D3D'
  }
}
