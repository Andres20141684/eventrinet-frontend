import React, { Component } from 'react';

class BannerBottom extends Component{
    state = {
      role: null
    }
    render(){
      return (
        <div style={styles.banner}>
          <div class="">
            <nav class="navbar navbar-expand-md fixed-top">
                <ul class="nav nav-fill">
                    <li class="nav-item"><a class="nav-link active" href="index.html">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link active" href="#">Eventos</a></li>
                    <li class="nav-item"><a class="nav-link active" href="#">Convocatorias</a></li>
                    <li class="nav-item"><a class="nav-link active" href="#">Opciones</a></li>
                </ul>
            </nav>
          </div>
        </div>
      );
    }
}
export default BannerBottom;

var styles = {
    banner:{
      backgroundColor: '#002D3D',
      paddintTop: 20,
      paddingBottom: 20,
      color:'#6CDCD6',
    }
}