import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();

class Banner extends Component{
  state = {
    role: null
  }
  render(){
    return (
      <div id="banner" style={styles.banner}>
        <div class="navbar-header">
          <nav class="navbar navbar-expand-md fixed-top">
          <h1 class="navbar-header">Eventrinet</h1>
          </nav>
        </div>
        <div class="navbar-collapse ">
          <ul class="nav navbar-nav">
            <li><a class="nav-item active">INICIO</a></li>
            <li><a class="nav-item active">EVENTOS</a></li>
            <li><a class="nav-item active">CONVOCATORIAS</a></li>
            <li class="nav-item dropdown"><a class="nav-item dropdown">OPCIONES</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Banner;

var styles = {
  banner:{
    backgroundColor: '#002D3D',
    paddintTop: 20,
    paddingBottom: 20,
    color:'#6CDCD6',
    
}
}