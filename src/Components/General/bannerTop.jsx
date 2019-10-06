import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import {defaultStyle} from '../../styles/styles.js'
import Modal from 'react-awesome-modal';
import { whileStatement } from '@babel/types';
import { borderColor } from '@material-ui/system';

class BannerTop extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        visible : false,
        role: null,
        name: "Login"

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
            <a href="/" target="_self" title="Volver al home"> <img src="piruleta_loquisima.png" className="img-fluid"  width="250"/></a>
          </div>
          <div className="list-inline-item" align="right">
            <a className="nav" onClick={() => this.openModal()}> {this.state.name} </a>
            <section>
              <script src= "./login.js"></script>
              <Modal visible={this.state.visible} width="400" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                  <div class="g-signin2" data-onsuccess="onSignIn"></div>
                  <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                </div>
              </Modal>
            </section>
          </div>
        </div>
        <hr style={{
          borderBottomWidth:0,
          borderBottomColor:'#6CDCD6',
          width:'1'
        }}>
        </hr>
        <div>  
        {/*<header class="Header" role="banner">
          <div class="Header-item Header-item--full">
            <div class="header-search mr-3 scoped-search site-scoped-search js-site-searh position-relative js-jump-to" role="combobox" aria-owns="jump-to-result" aria-lavel="Buscar..." aria-haspopup="listbox" aria-expanded="false">
              <div class="position-relative">
              </div>
            </div>
            <nav class="d-flex" arial-label="Global"> 
              <a class="js-selected-navigation-item Header-link mr-3" arial-label="Inicio" href="/">Inicio</a>
              <a class="js-selected-navigation-item Header-link mr-3" arial-label="Eventos" href="/events">Eventos</a>
              <a class="js-selected-navigation-item Header-link mr-3" arial-label="Convocatoria" href="/announcements">Convocatoria</a>
              <div class="Header-item position-relative mr-0 dropdown-caret" arial-label="Opciones" role="button">Opciones
                <details class="details-overlay details-reset" open="">
                  <summary class="Header-link" arial-label="Opciones..." aria-haspopup="menu" role="button">
                    <span class="dropdown-caret"></span>
                  </summary>
                  <details-menu class="dropdown-menu dropdown-menu-sw" role="menu">
                    <a class="dropdown-item" role="menuitem" href="#">Mis inscripciones</a>
                    <a class="dropdown-item" role="menuitem" href="#">Mis propuestas</a>
                    <a class="dropdown-item" role="menuitem" href="/organActiveEvents">Organizador</a>
                    <a class="dropdown-item" role="menuitem" href="/presidentEvents">Presidente</a>
                    <a class="dropdown-item" role="menuitem" href="/EvaluadorEventos">Evaluador</a>
                  </details-menu>
                </details>
              </div>
            </nav>
          </div>
        </header>
      */}
        <nav class="navbar navbar-expand-lg navbar-inverse" style={styles.navbar}>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
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
            
            <div class="pmd-navbar-right-icon ml-auto" align="right">
              <i class="fa fa-search" style={styles.fa} aria-hidden="true" ></i> 
              <i class="fa fa-question-circle" style={styles.fa} aria-hidden="true"></i>
              <i class="fa fa-user dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" style={{paddingTop:12,paddingRight:0,color:"#6CDCD6"}}></i>
            </div>
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
    paddingBottom: 0,
    paddingRight:0,
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
    borderColor:'#002D3D'
  }
}

