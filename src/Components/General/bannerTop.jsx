import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import {defaultStyle} from '../../styles/styles.js'
import Modal from 'react-awesome-modal';
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
            <h1>Eventrinet  <img src="piruleta.png" className="img-fluid" height="42" width="42"/></h1>
          </div>
          <div className="list-inline-item" align="left">
            <a className="nav" onClick={() => this.openModal()}> {this.state.name} </a>
            <section>
            <script src= "./login.js"></script>
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                      <div id="gSignIn"></div>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
            </section>
          </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="nav navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Inicio <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/events">Eventos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/announcements">Convocatoria</a>
              </li>
              <li class="nav-item" class="nav dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Opciones <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a class="nav-link" href="#">Mis Inscripciones</a></li>
                  <li><a class="nav-link" href="#">Mis Propuestas</a></li>
                  <li><a class="nav-link" href="#">Organizador</a></li>
                  <li><a class="nav-link" href="#">Presidente</a></li>
                  <li><a class="nav-link" href="#">Evaluador</a></li>
                </ul>
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

