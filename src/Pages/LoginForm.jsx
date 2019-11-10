import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import {Link}  from "react-router-dom";
import '../styles/style_signUp.css';
import {Redirect}  from "react-router-dom";
import Col from 'react-bootstrap/Col';
import ForgotPassword from './ForgotPassword';
import ModalLoader from '../Components/General/ModalLoader';

const Networking = require('../Network/Networking');

class  Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      usuario : null,
      user: "",
      pass: "",
      redirect:false,
      isLoading:false,
      buttonLoadingText:"Iniciar sesión"
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
      this.setState({isLoading:true, buttonLoadingText:"Cargando..."});

      Networking.validar_sesion(this.state.user,this.state.pass).then(
        (response) => {
          console.log(response);
          let connectedUser = response;
          console.log("Data del usuario",connectedUser);
          if (connectedUser.succeed){
            console.log("estamos accediendoo");
            console.log(connectedUser);

            sessionStorage.setItem('dataUser', JSON.stringify(connectedUser));
            console.log("No recordar cuenta");

            sessionStorage.setItem('tipoLogin',"usuario")
            this.setState({redirect:true});
            //alert("Contraseña y usuario correctos!");
          }else{
            console.log("No se logueo correctamente");
            console.log("Contraseña y/o usuario incorrecto!");
            this.setState({redirect:false});
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

  handleClickForgotPass = (evt) => {
    this.handleNextChildComponentChange(ForgotPassword);
  }
  /*handleClickSignUp = (evt) => {
    this.handleNextChildComponentChange(SignUp);
  }*/
  render(){
    return(
      <div>{this.renderRedirect()}
        <div className="page-content">

          <div className="form-v5-content">
            <form className="form-detail"  type="post" onSubmit={this.onSubmitForm}>
              <h2>Eventrinet</h2>

              <div className="form-row">
                <label for="your-user">Usuario</label>
                <input type="text" name="your-user" id="your-user" className="input-text"  maxLength="11" onChange={this.onChageInputName} onKeyDown={this.onKeyDownName} placeholder="Ingresar usuario" />
                <i className="fa fa-envelope"></i>
              </div>
              <div className="form-row">
                <label for="password">Contraseña</label>
                <input type="password" name="password" id="password" className="input-text"   maxLength="45" pattern=".{4,}" onChange={this.onChageInputPass} placeholder="Contraseña" required/>
                <i className="fa fa-lock"></i>
              </div>
              <div className="form-row">
                <input type="submit" name="Iniciar sesion"className="btn btn-primary btn-block" value={this.state.buttonLoadingText} disabled={this.state.isLoading} on/>
              </div>
            </form>
            <div className="row" style={{float:"right",paddingRight:"50px"}}>
              <a onClick={this.handleClickForgotPass} style={styles.link} onMouseOver ={styles.onHoverLink}>Has olvidado tu contraseña?</a>
            </div>

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
              <a className="text-success" href="/signUp">
                  Registrate ahora!
              </a>
            </div>
            <br/>
          </div>
        </div>
      </div>
    )
  }
}


export default Login;


var styles = {
  link:{
    paddingRight:"20px",
    float:"right",
    fontSize:"15px",
    cursor:"pointer",
    textDecoration: "none",
    color:"#337ab7"
  },
  onHoverLink:{
  }
}
