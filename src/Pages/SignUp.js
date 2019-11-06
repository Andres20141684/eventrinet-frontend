
import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_signUp.css'; 
import {Redirect}  from "react-router-dom";

const Networking = require('../Network/Networking');
/*
function validarPassword(pass){
   let  re;
    if(pass.value != "") {
    if(pass.value.length < 6) {
      alert("Error: Password must contain at least six characters!");
      pass.focus();
      return false;
    }

    var user = document.getElementById("your-user");    
    if(pass.value == user.value) {
      alert("Error: Password must be different from Username!");
      pass.focus();
      return false;
    }
    re = /[0-9]/;
    if(!re.test(pass.value)) {
      alert("Error: password must contain at least one number (0-9)!");
      pass.focus();
      return false;
    }
    re = /[a-z]/;
    if(!re.test(pass.value)) {
      alert("Error: password must contain at least one lowercase letter (a-z)!");
      pass.focus();
      return false;
    }
    re = /[A-Z]/;
    if(!re.test(pass.value)) {
      alert("Error: password must contain at least one uppercase letter (A-Z)!");
      pass.focus();
      return false;
    }
  } else {
    alert("Error: Please check that you've entered and confirmed your password!");
    pass.focus();
    return false;
  }

  alert("You entered a valid password: " + pass.value);
  return true;
} 
*/
class SingUp extends Component{
    state = {
        bannerLogin: BannerLogin,
        bannBot : BannerBottom,
        name: "",
        last_name: "",
        password: "",
        username: "",
        email: "",
        redirect:false
    }
    componentWillMount(){
      console.log("------------saving state----------");
      sessionStorage.setItem('tipoSingUp',"gmail");
    }
    onSubmitForm = (evt) => {      
      
      var pass = document.getElementById("alertPass");
      /*if (validarPassword(pass)== false){
        return
      }*/

      evt.preventDefault()
      console.log("name "+this.state.name + " last name: " + this.state.last_name + " username: " +this.state.username + " pass: " + this.state.password + " email: "+ this.state.email )
            
      Networking.crear_cuenta(this.state.email,this.state.last_name,this.state.name, this.state.username, this.state.password).then(
          (response) => {
            console.log(response);
            let connectedUser = response;
            console.log("Data del usuario",connectedUser);
            if (connectedUser.succeed){
              console.log("estamos accediendoo bbecita prrr");
              console.log(connectedUser);

              //sessionStorage.setItem('dataUser', JSON.stringify(connectedUser));
              //sessionStorage.setItem('tipoLogin',"usuario")
              this.setState({redirect:true});
            }else{
              console.log("YIYI no se pudo crear cuenta");              
            }
            alert(connectedUser.message)
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
                  <input type="text" name="your-name" id="your-name" class="input-text" placeholder="Nombres" maxLength="45" required onChange={this.onChangeName} pattern=".[a-zA-Z\s]{2,50}"/>
                  <i class="fa fa-user"></i>
                </div>
                <div class="form-row">
                <label for="your-lastname">Apellidos</label>
                  <input type="text" name="your-lastname" id="your-lastname" class="input-text" placeholder="Apellidos" maxLength="45" required onChange={this.onChangeLastName} pattern=".[a-zA-Z\s]{2,50}"/>
                  <i class="fa fa-user"></i>
                </div>

                <div class="form-row">
                  <label for="your-user">Usuario</label>
                  <input type="text" name="your-user" id="your-user" class="input-text" placeholder="Usuario" maxLength="11" required onChange={this.onChangeUser}  pattern=".{6,}"  />
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
                <div class="form-row-last">
                  <input type="submit" name="Registrarse" class="register" value="Registrarse"/>
                </div>
                <div class="hint-text small" style={{textAlign:"center"}}>
                  ¿Ya tienes una cuenta?
                  <a href="/login"  class="text-success">Iniciar sesión</a>
                </div>
                <div >
                  <section className="loginButton">
                  <script src= "./login.js"></script>
                  <div  effect="fadeInUp">                                    
                      <a href={this.state.pagPrev}>
                      <div className="g-signin2" align="center" data-onsuccess="onSignIn" />
                      </a>
                  </div>
                  </section>
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