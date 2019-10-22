import React, {Component} from 'react';
//const stylesFile = require('../Styles/styles.js');
//const styles = stylesFile.getStyle();
import {defaultStyle} from '../../styles/styles.js'
import Modal from 'react-awesome-modal';
import { whileStatement } from '@babel/types';
import { borderColor } from '@material-ui/system';
import '../../styles/style_banner_top.css'
import {Link}  from "react-router-dom";
class BannerTop extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        user: [],
        visible : false,
        role: null,
        name: "Iniciar Sesion",
        SignUp: "Registrarse",
        
    }
  }

  componentDidMount(){
    

    try{ //Verify if I'm logging
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);      

      let linkLogin = document.getElementById("linkLogin")
      let linkSignUp = document.getElementById("linkSignUp")
      let myavatar = document.getElementById("myavatar")

      if (retrievedObject == null){ //If doesnt exist de object
        linkLogin.style.display ="block"
        linkSignUp.style.display ="block"
        myavatar.style.display="none"
        return
      }
      
      //If exist the object and  status =true
      console.log("retrivedJSON:  ",retrievedJson["status"])
  
      if (retrievedJson["status"]){
        this.setState({"logeado": true})
      }
        
      console.log("state:  ",this.state)
  
      if (retrievedJson["status"]){
        linkLogin.style.display ="none"
        linkSignUp.style.display ="none"
        myavatar.style.display="block"
        return
      }
      else{ //Si no estoy logeado
        linkLogin.style.display ="block"
        linkSignUp.style.display ="block"
        myavatar.style.display="none"
        return
      }
    }catch(err){
      console.log(err)
    }

    

  }
  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }
  
  clickLogOut () {
    console.log("Cerrando")

    let retrievedObject = sessionStorage.getItem('dataUser');
    let retrievedJson = JSON.parse(retrievedObject);
    retrievedJson["status"]=false

    let linkLogin = document.getElementById("linkLogin")
    let linkSignUp = document.getElementById("linkSignUp")
    let myavatar = document.getElementById("myavatar")

    linkLogin.style.display ="block"
    linkSignUp.style.display ="block"
    myavatar.style.display="none"
  }

  render(){
    //debugger;
    return (
      <div id="bannerTop" style={styles.banner}><br/>
        <div className="list-inline-item d-flex flex-column flex-md-row align-items-center ">
          <div className="list-inline-item my-0 mr-md-auto font-weight-normal">

          <Link to="/" target="_self" title="Volver al home"><img src="piruleta_loquisima.png" className="img-fluid"  width="200"/></Link>
            
          </div>          
          <div class="nav navbar-nav navbar-right ml-auto" style={{alignItems:"center",paddingRight:20}}>
              <div className="list-inline-item" align="right">
                <Link to="/signUp" id="linkSignUp" className="nav"  style={{color:"#6CDCD6",paddingRight:20}} >{this.state.SignUp}</Link>
                <Link to="/login"  id="linkLogin" className="nav"  style={{color:"#6CDCD6",paddingRight:20}}>{this.state.name}</Link>
              </div>



              <li class="nav-item dropdown" id="myavatar"   >
                  <Link to="#" data-toggle="dropdown" class="nav-link dropdown-toggle user-action">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" class="avatar" alt="Avatar"/>
                  </Link>
                  <ul class="dropdown-menu dropdown-menu-right">
                      <li><Link to="#" class="dropdown-item"><i class="fa fa-user-o"></i> Perfil</Link></li>
                      <li><Link to="#" class="dropdown-item"><i class="fa fa-sliders"></i> Ajustes</Link></li>
                      <li class="divider dropdown-divider"></li>
                      <li><Link to="#" class="dropdown-item"onClick={this.clickLogOut}><i class="material-icons" >&#xE8AC;</i> Cerrar sesion</Link></li>
                  </ul>
              </li> 
            </div>
          
        </div>
        <div style={{paddingRight:20, paddingLeft:20}}><hr  class="line-top"/></div>
    
        <div>  
        
        <nav class="navbar navbar-default navbar-expand-xl navbar" style={styles.navbar}>
          <button class="navbar-toggler scrollbar scrollbar-primary" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <i class="navbar-toggler-icon fa fa-bars" style={styles.fa} aria-hidden="true"></i>
          </button>

          <div class="collapse navbar-collapse" id="navbarNavDropdown" style={{}}>
            <ul class="nav navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/"><b><font size="3" color="#6CDCD6">Inicio</font></b><span class="sr-only">(current)</span></Link>
              </li>
              
              <li class="nav-item">
                <Link class="nav-link" to="/EventInscriptionPage"><b><font size="3" color="#6CDCD6">Eventos</font></b></Link>
              </li>
              
              <li class="nav-item">
                <Link class="nav-link" to="/announcements"><b><font size="3" color="#6CDCD6">Convocatoria</font></b></Link>
              </li>
              <li class="nav-item" class="nav dropdown">
                <Link class="nav-link dropdown-toggle" to="#" data-toggle="dropdown" role="button"  aria-haspopup="true" aria-expanded="false"><b><font size="3" color="#6CDCD6">Opciones</font></b></Link>
                <ul class="dropdown-menu">
                  <li><Link class="nav-link" to="#"><b><font size="3">Mis inscripciones</font></b></Link></li>
                  <li><Link class="nav-link" to="/propoMyProposals"><b><font size="3">Mis propuestas</font></b></Link></li>
                  <div class="dropdown-divider"></div>
                  <li><Link class="nav-link" to="/organActiveEvents"><b><font size="3">Organizador</font></b></Link></li>
                  <li><Link class="nav-link" to="/presidentEvents"><b><font size="3">Presidente</font></b></Link></li>
                  <li><Link class="nav-link" to="/EvaluadorEventos"><b><font size="3 ">Evaluador</font></b></Link></li>
                </ul>
              </li>
            </ul>
            
            <form class="navbar-form form-inline">
              <div class="input-group search-box" style={{alignItems:"center"}}>								
                    <input type="text" id="search" class="form-control" placeholder="Buscar" style={{alignItems:"center"}}/>
                    <span class="input-group-addon"><i class="material-icons">&#xE8B6;</i></span>
              </div>
            </form>            
          </div>
        </nav>
        </div>
      </div>
        
    );
  }
}

export default BannerTop;

var styles = {
  banner:{
    backgroundColor: '#002D3D',
    paddintTop:0,
    FontSize: 20,
    color:'#6CDCD6',
  }
  ,fa:{
    paddingTop:12,
    paddingRight:20,
    color:'#6CDCD6',
  },
  navbar:{
    backgroundColor:'#002D3D',
    borderColor:'#002D3D',
    paddingLeft:30,
    paddingRight:30,
  }
}