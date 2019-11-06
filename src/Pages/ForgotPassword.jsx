import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import '../styles/style_signUp.css'; 
import {Redirect}  from "react-router-dom";

const Networking = require('../Network/Networking');


class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.state = {      
      usuario : null
    } 
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  }

  handleNextChildComponentChange(_nextChildComponent){
    console.log('cambiando', _nextChildComponent);
      this.props.onNextChildComponentChange(_nextChildComponent);
      
  }

  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }

  onSubmitForm = (evt) => {
    evt.preventDefault()
    alert("Correo enviado!")
    let inputEmail = document.getElementById("your-email");
    inputEmail.value="";
  }

  render(){
    return(
      <div>
        <div className="component-header"  width="300"  style={{paddingLeft:20}}>
          <a className="component-logo customizable chart" href='/' title="Volver a pagina principal">
              <img className="component-logo" src="logo.png"  width="240"/> 
          </a>
        </div>
        <div className="page-content">

          <div className="form-v5-content">
            <form className="form-detail"  type="post" onSubmit={this.onSubmitForm}>
              <h2>Recuperar contraseña</h2>
              
              <div className="form-row">                  
                <input type="email" name="your-email" id="your-email" className="input-text" onChange={this.onChangeInputEmail} placeholder="Ingresar correo electronico" />
                <i className="fa fa-envelope" style={{top:"18%"}}></i>
              </div>
              
              <div className="form-row">
                <input type="submit" name="Iniciar sesion"className="btn btn-primary btn-block" value="Enviar nueva contraseña"/>
              </div>                         
            </form>
                          
        </div>
        </div>    
      </div>
    )
  }
}


export default ForgotPassword;
