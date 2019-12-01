import React, { Component } from 'react';
import '../styles/style_signUp.css'; 
import {Redirect}  from "react-router-dom";
import GoogleLogout from 'react-google-login';
import { createCipher } from 'crypto';

const Networking = require('../Network/Networking');
class SingUp extends Component{
  constructor(props){
    super(props);
    this.state = {      
      usuario : null,
      msgError: '',
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
  
  componentWillMount(){
    sessionStorage.setItem('tipoSingUp',"gmail");
  }
  
  onSubmitForm = (evt) => {
      evt.preventDefault()
      //console.log("name "+this.state.name + " last name: " + this.state.last_name + " username: " +this.state.username + " pass: " + this.state.password + " email: "+ this.state.email )
            
      Networking.crear_cuenta(this.state.email,this.state.last_name,this.state.name, this.state.username, this.state.password).then(
          (response) => {
            console.log(response);            
            console.log("Data del usuario",response);
            if (response.succeed){
              sessionStorage.setItem('dataUser', JSON.stringify(response));
              sessionStorage.setItem('tipoLogin',"usuario");
              this.setState({redirect:true});
            }else{
              this.setState({redirect:false,
                isLoading:false,
                buttonLoadingText:"Iniciar sesión",
                msgError:response.message});
              try{
                  document.getElementById('alertErrorSignUP').style.display ="block";
              }
              catch(err){
                  console.log(err)
              }
            }
          }
      )
    }

    onChangeName = (evt) => {
      this.setState({name: evt.target.value});
    }

    onChangeLastName = (evt) => {
      this.setState({last_name: evt.target.value});
    }

    onChangeUser = (evt) => {
      this.setState({username: evt.target.value});
    }

    onChangeEmail = (evt) => {
      this.setState({email: evt.target.value});
    }

    onChangePassword = (evt) => {
      this.setState({password: evt.target.value});
    }
   
    renderRedirect = () => {
      if(this.state.redirect) {
          return <Redirect to='/'></Redirect>
      }
    }

      
    render(){
      
      return(
        <div>{this.renderRedirect()} 
        <GoogleLogout
                render={renderProps => (
                  <a
                    className="logout-button"
                    onClick={renderProps.onClick}
                  />                  
                )}    
            />
          <div class="component-header"  width="300"  style={{paddingLeft:20}}>
            <a class="component-logo customizable chart" href='/' title="Volver a pagina principal">
                <img class="component-logo" src="logo.png"  width="240"/> 
            </a>
          </div>
          <div class="page-content">
            <div class="form-v5-content">
              <form class="form-detail" type="post" onSubmit={this.onSubmitForm}>
                <h2>Registrarse</h2>

                <div class="form-row">
                  <label for="your-name">Nombres</label>
                  <input type="text" name="your-name" id="your-name" class="input-text" placeholder="Nombres" maxLength="45" required onChange={this.onChangeName} pattern=".[a-záéíóúzA-Z\s]{2,50}"/>
                  <i class="fa fa-user"></i>
                </div>
                <div class="form-row">
                <label for="your-lastname">Apellidos</label>
                  <input type="text" name="your-lastname" id="your-lastname" class="input-text" placeholder="Apellidos" maxLength="45" required onChange={this.onChangeLastName} pattern=".[a-zA-Z\s]{2,50}"/>
                  <i class="fa fa-user"></i>
                </div>

                <div class="form-row">
                  <label for="your-user">Usuario</label>
                  <input type="text" name="your-user" id="your-user" class="input-text" placeholder="Usuario" maxLength="20" required onChange={this.onChangeUser}  pattern=".{6,}" />
                  <i class="fa fa-user"></i>
                </div>
                <div class="form-row">
                  <label for="your-email">Email</label>
                  <input type="text" name="your-email" id="your-email" class="input-text" placeholder="Email" maxLength="100" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" onChange={this.onChangeEmail}/>
                  <i class="fa fa-envelope"></i>
                </div>
                <div class="form-row">                  
                  <label for="password">Contraseña</label>                  
                  <input type="password" name="password" id="password" class="input-text" placeholder="Contraseña" maxLength="45" onChange={this.onChangePassword} required/>
                  <i class="fa fa-lock"></i>
                </div>                
                <div class="alert alert-primary" id="alertPass"role="alert" style={{display:'none'}}>
                    La contraseña debe contener una letra mayúscula, un numero y tener una longitud mínima de 10 caracteres
                </div>
                <div className="alert alert-danger" id="alertErrorSignUP" role="alert" style={{display:'none',padding:'8px',height:'auto',fontSize:'13px'}}>
                  {this.state.msgError}
                </div>
                <div class="form-row-last">
                  <input type="submit" name="Registrarse" class="register" value="Registrarse"/>
                </div>
                <div >
                  <div className="col-xs-12">
                    <div className="divider dividerSign">
                      <strong className="divider-title ng-binding">o</strong>
                    </div>
                  </div>
                  <section className="loginButton">
                  <script src= "./login.js">
                  </script> 
                  <div  effect="fadeInUp">                                    
                      <a>
                      <div className="g-signin2" align="center" data-onsuccess="onSignUp" data-width="150px"data-height="36px" style={{color:'blue'}}>
                        <span class="buttonText">Google</span>
                      </div>
                      </a>
                  </div>
                  </section>                  
                </div>                
                <hr width="90%" />
                <div class="hint-text small" style={{textAlign:"center"}}>
                  ¿Ya tienes una cuenta?
                  <a href="/login"  class="text-success">Iniciar sesión</a>
                </div>                
                <br/>
              </form>
              
            </div>
          </div>
          
        </div>
      )
    }
}
export default SingUp;