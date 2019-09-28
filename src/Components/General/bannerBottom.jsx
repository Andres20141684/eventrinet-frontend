import React, { Component } from 'react';

class BannerBottom extends Component{
    state = {
      role: null
    }
    render(){
      return (
        <div id="bannerBot" style={styles.banner}>
          <div class="">            
          </div>
        </div>
      );
    }
}
export default BannerBottom;

var styles = {
    banner:{
      backgroundColor: '#002D3D',
      paddintTop: 50,
      paddingBottom: 250,
      color:'#6CDCD6',
    }
}