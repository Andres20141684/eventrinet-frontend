import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();

class BannerTop extends Component{
  state = {
    role: null
  }
  render(){
    return (
      <div id="banner" style={styles.banner}>
        <nav class="navbar navbar-expand-md fixed-top"></nav>
          <h1 class="navbar-header">Eventrinet<span class="badge badge-secondary"></span></h1>
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