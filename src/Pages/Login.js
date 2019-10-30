import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import {Link}  from "react-router-dom";
import '../styles/style_signUp.css'; 
import {Redirect}  from "react-router-dom";
import InscriptionEvent from '../Components/InscriptionEvent'

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

        Networking.validar_sesion(this.state.user,this.state.pass).then(
                (response) => {
                  console.log(response);
                  let connectedUser = response;
                  console.log("Data del usuario",connectedUser);
                  if (connectedUser.succeed){
                    console.log("estamos accediendoo bbecita prrr");
                    console.log(connectedUser);
                    sessionStorage.setItem('dataUser', JSON.stringify(connectedUser));
                    sessionStorage.setItem('tipoLogin',"usuario")
                    this.setState({redirect:true});
                    alert("Contraseña y usuario correctos!");
                  }else{
                    console.log("No se logueo correctamente");
                    alert("Contraseña y/o usuario incorrecto!");
                    //this.setState({redirect:false});
                    
                  }
                }
        )
    }

    renderRedirect = () => {
        if(this.state.redirect) {
          let  page = sessionStorage.getItem("currentPage");
          console.log("page to redirect ",page);

          return <Redirect to='/' />
          
        }
    }

    onChageInputName = (evt) => {
        this.setState({user: evt.target.value});
    }

    onChageInputPass = (evt) => {
        this.setState({pass: evt.target.value});
    }

    onKeyDownName = (evt) => {
        let user = evt.target.value        

        if (user.length >= 20) {
            evt.preventDefault()
            return false
        }
    }
    
    render(){
      return(
        <div>{this.renderRedirect()} 
          <div className="component-header"  width="300"  style={{paddingLeft:20}}>
            <a className="component-logo customizable chart" href='/' title="Volver a pagina principal">
                <img className="component-logo" src="logo.png"  width="240"/> 
            </a>
          </div>
          <div className="page-content">

            <div className="form-v5-content">
              <form className="form-detail"  type="post" onSubmit={this.onSubmitForm}>
                <h2>Eventrinet</h2>
                
                <div className="form-row">
                  <label for="your-user">Usuario</label>
                  <input type="text" name="your-user" id="your-user" className="input-text" onChange={this.onChageInputName} onKeyDown={this.onKeyDownName} placeholder="Ingresar usuario" />
                  <i className="fa fa-envelope"></i>
                </div>
                <div className="form-row">
                  <label for="password">Contraseña</label>
                  <input type="password" name="password" id="password" className="input-text"  onChange={this.onChageInputPass} placeholder="Contraseña" required/>
                  <i className="fa fa-lock"></i>
                </div>
                <div className="form-row-last">                  
                  <input type="submit" name="Iniciar sesion"className="btn btn-primary btn-block" value="Iniciar Sesion"/>
                </div>
                                
              </form>
              
              <div id="errorMsg" className="alert alert-warning" role="alert" style={{marginBottom:0, marginTop:"20px", display:"none"}}></div>
              
              <div className="col-xs-12">
                  <div className="divider dividerSign">
                  <strong className="divider-title ng-binding">o</strong>
                  </div>
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

                <div className="hint-text small" style={{textAlign:"center"}}>
                  ¿No tienes una cuenta?
                  <Link to="/signUp"  className="text-success">Registrate ahora!</Link>
                </div>
                <br/>
            </div>
           
          </div>          
        </div>
      )
    }
}


export default Login;