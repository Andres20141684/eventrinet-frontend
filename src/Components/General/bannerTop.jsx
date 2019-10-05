import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import {defaultStyle} from '../../styles/styles.js'
import Modal from 'react-awesome-modal';
import { whileStatement } from '@babel/types';

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
    debugger;
    return (
      <div id="bannerTop" style={styles.banner}><br/>
        <div className="list-inline-item d-flex flex-column flex-md-row align-items-center ">
          <div className="list-inline-item my-0 mr-md-auto font-weight-normal" >
            <h1><a href="/" target="_self" title="Volver al home"> <img src="piruleta_loquisima.png" className="img-fluid"  width="250"/></a></h1>          
          </div>  
            <div className="list-inline-item" align="right">
            <a className="nav" onClick={() => this.openModal()}> {this.state.name} </a>
            <section>
            <script src= "./login.js"></script>
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
          </div>
            
          
              
        </div>
        <div >  
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" backgroundcolor='#002D3D' data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="nav navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Inicio  |<span class="sr-only">(current)</span></a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" href="/events">Eventos  </a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" href="/announcements">Convocatoria | </a>
              </li>
              <li class="nav-item" class="nav dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button"  aria-haspopup="true" aria-expanded="false">Opciones... </a>
                <ul class="dropdown-menu">
                  
                  <li><a class="nav-link" href="#">Mis inscripciones</a></li>
                  <li><a class="nav-link" href="#">Mis propuestas</a></li>
                  <li><a class="nav-link" href="/organActiveEvents">Organizador</a></li>
                  <li><a class="nav-link" href="/presidentEvents">Presidente</a></li>
                  <li><a class="nav-link" href="/EvaluadorEventos">Evaluador</a></li>
                </ul>
              </li>
            </ul>
            <span class="ml-auto navbar-text"><i class="fa fa-search" style={styles.fa} aria-hidden="true" ></i> <i class="fa fa-question-circle fa" style={styles.fa} aria-hidden="true"></i>
            <i class="fa fa-user" style={styles.fa} aria-hidden="true"></i></span>
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
    paddintTop: 0,
    paddingBottom: 20,
    FontSize: 20,
    color:'#6CDCD6',
  }
  ,fa:{
    paddingRight:20,
    color:'#002D3D',
  }
}

