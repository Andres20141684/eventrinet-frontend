import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import {defaultStyle} from '../../styles/styles.js'
import Modal from 'react-awesome-modal';
import './../../styles/style_nav.css'
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
      <div id="bannerTop" style={styles.banner}>
        <div className="list-inline-item d-flex flex-column flex-md-row align-items-center ">
          <div className="list-inline-item my-0 mr-md-auto font-weight-normal" >
            <h1> <img src="piruleta_loquisima.png" className="img-fluid"  width="250"/></h1>
          </div>
          <div className="list-inline-item" align="left">
            <a className="nav" onClick={() => this.openModal()}> {this.state.name} </a>
            <section>
            <script src= "./login.js"></script>
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                      <div id="gSignIn"></div>
                        <a href="javascript:void(0);" onClick={()  => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
          </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" backgroundcolor='#002D3D' data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="nav navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/"><font color="white">INICIO  |</font><span class="sr-only">(current)</span></a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" href="/events"><font color="white">EVENTOS  |</font></a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" href="/announcements"><font color="white">CONVOCATORIA |</font> </a>
              </li>
              
              <li class="nav-item" class="nav dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button"  aria-haspopup="true" aria-expanded="false"><font color="white">OPCIONES...</font> </a>
                <ul class="dropdown-menu">
                  <font color="white"></font>
                  <li><a class="nav-link" href="#"><font color="white">MIS INSCRIPCIONES</font></a></li>
                  <li><a class="nav-link" href="#"><font color="white">MIS PROPUESTAS</font></a></li>
                  <li><a class="nav-link" href="organizador_myevents"><font color="white">ORGANIZADOR</font></a></li>
                  <li><a class="nav-link" href="#"><font color="white">PRESIDENTE</font></a></li>
                  <li><a class="nav-link" href="#"><font color="white">EVALUADOR</font></a></li>
                </ul>
              </li>
            </ul>
            <span class="ml-auto navbar-text">lupa | interrogante | foto</span>
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

