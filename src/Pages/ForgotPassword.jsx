import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import '../styles/style_signUp.css'; 
import {Redirect}  from "react-router-dom";

const Networking = require('../Network/Networking');


class ForgotPassword extends Component{
  constructor(props){
    super(props);
    this.state = {      
      val_usuario : null
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

  onChangeInputEmail = (evt) =>{
    this.setState({val_usuario: evt.target.value});
  }

  onSubmitForm = (evt) => {
    evt.preventDefault()

    Networking.cambiar_contrasena(this.state.val_usuario).then(
      (response) => {
        console.log("Intento de cambiar contraseña",response);
        if (response.succeed){
          console.log(response);
          let inputEmail = document.getElementById("your-email");
          inputEmail.value="";          
          alert(response.message)
        }else{
          console.log("No existe el correo o usuario");
          alert(response.message);
        }
      } 
    )
    
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
              <h2>Cambiar contraseña</h2>
              
              <div className="form-row">
                <label> Nombre de usuario o dirección de correo electrónico</label>
                <input name="your-email" id="your-email" className="input-text" onChange={this.onChangeInputEmail} autoFocus maxLength="45"/>
                <i className="fa fa-envelope" style={{top:"48%"}}></i>
              </div>
              
              <div className="form-row">
                <input type="submit" name="Iniciar sesion"className="btn btn-primary btn-block" value="Obtener una contraseña nueva "/>
              </div>                         
            </form>
                          
        </div>
        </div>    
      </div>
    )
  }
}


export default ForgotPassword;
