import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import BannerBottom from '../Components/General/bannerBottom'
import {Link}  from "react-router-dom";
import '../styles/style_signUp.css'; 
import {Redirect}  from "react-router-dom";

const Networking = require('../Network/Networking');

var request=null;
var loggedin = false;


class Login extends Component{
  state = {
    bannerLogin: BannerLogin,
    usuario : null,
    user: "",
    pass: "",
    redirect:false
    }

    onSubmitForm = (evt) => {

        evt.preventDefault()
        console.log(this.state)

        let thisForm = evt.target
        let errorMsg = document.getElementById("errorMsg")

        if (!this.state.user.length) {
            thisForm.user.focus()
            errorMsg.style.display = "block"
            errorMsg.innerText = "Ingrese nombre de usuario"
            return false
        }

        if (!this.state.pass.length) {
            thisForm.pass.focus()
            errorMsg.style.display = "block"
            errorMsg.innerText = "Ingrese password de usuario"
            return false
        }
        
        // else
        errorMsg.style.display = "none"

        //Asumiendo que este sera el Json recibido
        sessionStorage.dataUser = {status:true, data:{sesion:true, roles:["organizador"], msj:"error de credenciales"}}
        console.log(this.state)
        this.setState({redirect:true})        
        
        return false

        let responseJson = Networking.login(this.state.name, this.state.pass)
        if (!responseJson.data.sesion) {
            alert(responseJson.data.msj)
        } else {
            sessionStorage.dataUser = responseJson
            this.setState({redirect:true})
        }
    }

    renderRedirect = () => {
        if(this.state.redirect) {
            return <Redirect to='/'></Redirect>
        }
    }

    onChageInputName = (evt) => {
        console.log(evt.target)

        this.setState({user: evt.target.value});
    }

    onChageInputPass = (evt) => {
        this.setState({pass: evt.target.value});
    }

    onKeyDownName = (evt) => {
        let user = evt.target.value

        console.log(user.length)

        if (user.length >= 20) {
            evt.preventDefault()
            return false
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
              <form class="form-detail"  type="post" onSubmit={this.onSubmitForm}>
                <h2>Eventrinet</h2>
                
                <div class="form-row">
                  <label for="your-email">Email</label>
                  <input type="text" name="your-email" id="your-email" class="input-text" onChange={this.onChageInputName} onKeyDown={this.onKeyDownName} placeholder="Ingresar email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                  <i class="fa fa-envelope"></i>
                </div>
                <div class="form-row">
                  <label for="password">Contraseña</label>
                  <input type="password" name="password" id="password" class="input-text"  onChange={this.onChageInputPass} placeholder="Contraseña" required/>
                  <i class="fa fa-lock"></i>
                </div>
                <div class="form-row-last">                  
                  <input type="submit" name="Iniciar sesion"class="btn btn-primary btn-block" value="Iniciar Sesion"/>
                </div>
                                
              </form>
              
              <div id="errorMsg" class="alert alert-warning" role="alert" style={{marginBottom:0, marginTop:"20px", display:"none"}}></div>
              
              <div class="col-xs-12">
                  <div class="divider">
                  <strong class="divider-title ng-binding">o</strong>
                  </div>
                </div>
              
                <div >
                  <section class="loginButton">
                  <script src= "./login.js"></script>
                  <div  effect="fadeInUp">                                    
                      <a href={this.state.pagPrev}>
                      <div class="g-signin2" align="center" data-onsuccess="onSignIn" />
                      </a>
                  </div>
                  </section>
                </div>
                <br/>

                <div class="hint-text small" style={{textAlign:"center"}}>
                  ¿No tienes una cuenta?
                  <Link to="/signUp"  class="text-success">Registrate ahora!</Link>
                </div>
                <br/>
            </div>
           
          </div>          
        </div>
      )
    }
}


export default Login;
