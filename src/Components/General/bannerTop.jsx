import React, {Component} from 'react';
import '../../styles/style_banner_top.css'
import {Link}  from "react-router-dom";

function initialState(){
  let linkLogin = document.getElementById("linkLogin")
  let linkSignUp = document.getElementById("linkSignUp")
  let myavatar = document.getElementById("myavatar")
  let itemOpciones = document.getElementById("nav-item-opciones")

  linkLogin.style.display = "block"
  linkSignUp.style.display = "block"
  myavatar.style.display = "none"
  itemOpciones.style.display = "none"
}

function logInState(){  
  let linkLogin = document.getElementById("linkLogin")
  let linkSignUp = document.getElementById("linkSignUp")
  let myavatar = document.getElementById("myavatar")
  let itemOpciones = document.getElementById("nav-item-opciones")

  linkLogin.style.display = "none"
  linkSignUp.style.display = "none"
  myavatar.style.display = "block"
  itemOpciones.style.display = "block"
}

function setRoles(listRoles){
  console.log("listRoles")
  
  console.log("admi",listRoles[0]["Administrador"])  
  console.log("org",listRoles[1]["Organizador"])  
  console.log("presi",listRoles[2]["Presidente del Comité Académico"])  
  

  let itemOrga = document.getElementById("itemOrga")
  let itemEval = document.getElementById("itemEval")
  let itemPresi = document.getElementById("itemPresi")
  let itemMisProp = document.getElementById("itemMisProp")
  let itemMisInscrip = document.getElementById("itemMisInscrip")

  itemOrga.style.display = "none"
  itemEval.style.display = "none"
  itemPresi.style.display = "none"
  itemMisProp.style.display = "none"
  itemMisInscrip.style.display = "none"

  if (!(listRoles[0]["Organizador"]==0)){
    itemOrga.style.display = "block"
  }
  if (!(listRoles[2]["Presidente del Comité Académico"]==0)){
    itemPresi.style.display = "block"
  }
  if (!(listRoles[3]["Evaluador"]==0)){
    itemEval.style.display = "block"
  }
  if (!(listRoles[4]["Postulante"]==0)){
    itemMisProp.style.display = "block"
  }
  if (!(listRoles[5]["Participante"]==0)){
    itemMisInscrip.style.display = "block"
  }  

}

class BannerTop extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        user: [],       
        userName: "",
        fullName:"",
        idUser:-1,
        myRoles:null,
        logeado :false,
        visible : false,
        role: null,
        name: "Iniciar Sesion",
        SignUp: "Registrarse",        
    }
  }  

  componentDidMount(){
    try{ //Verify if I'm logged
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);      

      let linkLogin = document.getElementById("linkLogin")
      let linkSignUp = document.getElementById("linkSignUp")
      let myavatar = document.getElementById("myavatar")

      if (retrievedJson == null){ //I'm not logged
        initialState()
        console.log("No estoy logeado!")
        return
      }
      
      // I'm logged
      logInState()
      setRoles(retrievedJson.permisos)

    }catch(err){
      console.log(err)
    }
    return 
  }

  clickLogOut () {
    try{
      let linkLogin = document.getElementById("linkLogin")
      let linkSignUp = document.getElementById("linkSignUp")
      let myavatar = document.getElementById("myavatar")
      let itemOpciones = document.getElementById("nav-item-opciones")
  
      linkLogin.style.display = "block"
      linkSignUp.style.display = "block"
      myavatar.style.display = "none"
      itemOpciones.style.display = "none"
      
      sessionStorage.setItem("dataUser",null)
    }catch(err){
      console.log(err)
    }    
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
                <a href="/signUp" id="linkSignUp" className="nav"  style={{color:"#6CDCD6",paddingRight:20}} >{this.state.SignUp}</a>
                <a href="/login"  id="linkLogin" className="nav"  style={{color:"#6CDCD6",paddingRight:20}}>{this.state.name}</a>
              </div>



              <li class="nav-item dropdown" id="myavatar"   >
                  <Link to="#" data-toggle="dropdown" class="nav-link dropdown-toggle user-action">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" class="avatar" alt="Avatar"/>
                  </Link>
                  <ul class="dropdown-menu dropdown-menu-right">
                      <li><Link to="#" class="dropdown-item"><i class="fa fa-user-o"></i> Perfil</Link></li>
                      <li><Link to="#" class="dropdown-item"><i class="fa fa-sliders"></i> Ajustes</Link></li>
                      <li class="divider dropdown-divider"></li>
                      <li><Link to="/" class="dropdown-item"onClick={this.clickLogOut}><i class="material-icons" >&#xE8AC;</i> Cerrar sesion</Link></li>
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
              <li class="nav-item" class="nav dropdown" id="nav-item-opciones">
                <Link class="nav-link dropdown-toggle" to="#" data-toggle="dropdown" role="button"  aria-haspopup="true" aria-expanded="false"><b><font size="3" color="#6CDCD6">Opciones</font></b></Link>
                <ul class="dropdown-menu">
                  <li><Link id="itemMisInscrip" class="nav-link" to="#"><b><font size="3">Mis inscripciones</font></b></Link></li>
                  <li><Link id="itemMisProp" class="nav-link" to="/propoMyProposals"><b><font size="3">Mis propuestas</font></b></Link></li>
                  <div class="dropdown-divider"></div>
                  <li><Link id="itemOrga" class="nav-link" to="/organActiveEvents"><b><font size="3">Organizador</font></b></Link></li>
                  <li><Link id="itemPresi" class="nav-link" to="/presidentEvents"><b><font size="3">Presidente</font></b></Link></li>
                  <li><Link id="itemEval" class="nav-link" to="/EvaluadorEventos" ><b><font size="3 ">Evaluador</font></b></Link></li>
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