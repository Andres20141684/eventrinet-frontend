import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import {defaultStyle} from '../../styles/styles.js'

class BannerTop extends Component{
  state = {
    role: null
  }

  render(){
    debugger;
    return (
      <div id="bannerTop" style={styles.banner}>
        <h1 className="navbar-header">Eventrinet<span className="badge badge-secondary"></span></h1>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">Inicio <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Eventos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Convocatoria</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Opciones
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Mis Inscripciones</a>
                  <a class="dropdown-item" href="#">Mis Propuestas</a>
                  <a class="dropdown-item" href="#">Organizador</a>
                  <a class="dropdown-item" href="#">Presidente</a>
                  <a class="dropdown-item" href="#">Evaluador</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default BannerTop;
var styles = {
  banner:{
    backgroundColor: '#002D3D',
    paddintTop: 20,
    paddingBottom: 20,
    color:'#6CDCD6',
  }
}