import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_signUp.css'; 
import {Link}  from "react-router-dom";


var request=null;
var loggedin = false;


class SingUp extends Component{
    state = {
        bannerLogin: BannerLogin,
        bannBot : BannerBottom,
        usuario : null,
        pagPrev: "/"
    }
    
    render(){
      return(
        <div>
          <div class="component-header"  width="300"  style={{paddingLeft:20}}>
            <a class="component-logo customizable chart" href='/' title="Volver a pagina principal">
                <img class="component-logo" src="logo.png"  width="240"/> 
            </a>
          </div>
          <div class="page-content">
            <div class="form-v5-content">
              <form class="form-detail" action="#" method="post">
                <h2>Regístrarse</h2>
                <div class="form-row">
                  <label for="full-name">Nombre Completo</label>
                  <input type="text" name="full-name" id="full-name" class="input-text" placeholder="Nombre completo" required/>
                  <i class="fa fa-user"></i>
                </div>
                <div class="form-row">
                  <label for="your-email">Email</label>
                  <input type="text" name="your-email" id="your-email" class="input-text" placeholder="Email" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"/>
                  <i class="fa fa-envelope"></i>
                </div>
                <div class="form-row">
                  <label for="password">Contraseña</label>
                  <input type="password" name="password" id="password" class="input-text" placeholder="Contraseña" required/>
                  <i class="fa fa-lock"></i>
                </div>
                <div class="form-row-last">
                  <input type="submit" name="Registrarse" class="register" value="Registrarse"/>
                </div>
                <div class="hint-text small" style={{textAlign:"center"}}>
                  ¿Ya tienes una cuenta?
                  <Link to="/login"  class="text-success">Iniciar sesión</Link>
                </div>
              </form>
              
            </div>
          </div>
          
        </div>
      )
    }
}


export default SingUp;

/*<div class="form-container">
                        <form action="/organActiveEvents" >
                            <div class="form-group">
                                <label for="exampleInputEmail1">Usuario</label>
                                <input type="text" class="form-control" id="exampleInputEmail1"  placeholder="Ingresar usuario"/>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Contraseña</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña"/>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Iniciar sesion</button>
                            
                        </form>
                        <div class="right-box">
                            <br/>
                            <label for="exampleInputEmail1"  style={{textAlignVertical: "center",textAlign: "center"}}>Ingresar con cuenta gmail</label>
                            <section class="loginButton">
                            <script src= "./login.js"></script>

                                <div width="200" height="500" effect="fadeInUp">                                    
                                    <a href={this.state.pagPrev}>
                                    <div class="g-signin2" align="center" data-onsuccess="onSignIn" >
                                        
                                    </div>
                                    </a>
                                </div>
                            </section>
                        </div>
                        </div>*/