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
      <div id="banner" style={styles.banner}>
        <h1 className="navbar-header">Eventrinet<span className="badge badge-secondary"></span></h1>
        <nav className="navbar navbar-expand-md fixed-top"></nav>
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