import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import {Link}  from "react-router-dom";
import '../styles/style_signUp.css'; 
import {Redirect}  from "react-router-dom";
import BannerTop from '../Components/General/bannerTop';

const Networking = require('../Network/Networking');

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

        //let connectedUser = validar_sesion_ps(this.state.user,this.state.pass)
        let connectedUser ={
            "infoUsuario": {
                "idUsuario": 8,
                "correo": "qwe912@gmail.com",
                "username": "CHUUUUG",
                "ultimaSesion": "None",
                "nombre": "Peter",
                "apePaterno": "Soy",
                "apeMaterno": "Yo",
                "telefono": "+51 928232821",
                "gradoInstruccion": "Doctor"
            },
            "permisos": [
                {"Administrador": 0},
                {"Organizador": 5},
                {"Presidente del Comité Académico": 0},
                {"Evaluador": 6},
                {"Postulante": 0},
                {"Participante": 0},
                {"Miembro del Comité Organizacional": 0}
            ],
            "succeed": true,
            "message": "Usuario encontrado"
        }
        
        if (!(connectedUser == null)){
            console.log("estamos accediendoo bbecita prrr")
            console.log(connectedUser)
            sessionStorage.setItem('dataUser', JSON.stringify(connectedUser))
            this.setState({redirect:true})
        }else{
            this.setState({redirect:false})
            alert("Contraseña y/o usuario incorrecto!")
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
                  <label for="your-user">Usuario</label>
                  <input type="text" name="your-user" id="your-user" class="input-text" onChange={this.onChageInputName} onKeyDown={this.onKeyDownName} placeholder="Ingresar usuario" />
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
                  <div class="divider dividerSign">
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