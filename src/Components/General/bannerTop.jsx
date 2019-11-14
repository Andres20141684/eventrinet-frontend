import React, {Component} from 'react';
import '../../styles/style_banner_top.css'
import {Link}  from "react-router-dom";
import Dashboard from '../Dashboard';
import NewIni from './NewIni';
import OrganActiveEvents from "./../../Pages/OrganActiveEvents.jsx";
import PresiAsignarEvalEvents from "./../../Pages/PresiAsignarEvalEvents.jsx";
import EvaluadorEventosListados from "./../../Pages/EvaluadorEventosListados.jsx";
import GoogleLogout from 'react-google-login';    
import PropoMyProposals from '../../Pages/ProposerMyProposals.jsx';
import AdminPageMainTable from '../Jtable/AdminPageMainTable';

function initialState(){
  let linkLogin = document.getElementById("linkLogin")
  let linkSignUp = document.getElementById("linkSignUp")
  let myavatar = document.getElementById("myavatar")
  let itemOpciones = document.getElementById("nav-item-opciones")
  let nameUser = document.getElementById("nameUser")
  
  linkLogin.style.display = "block"
  linkSignUp.style.display = "block"
  myavatar.style.display = "none"
  itemOpciones.style.display = "none"
  nameUser.style.display = "none"
}

function logInState(){  
  let linkLogin = document.getElementById("linkLogin")
  let linkSignUp = document.getElementById("linkSignUp")
  let myavatar = document.getElementById("myavatar")
  let itemOpciones = document.getElementById("nav-item-opciones")
  let nameUser = document.getElementById("nameUser")
  
  linkLogin.style.display = "none"
  linkSignUp.style.display = "none"
  myavatar.style.display = "block"
  itemOpciones.style.display = "block"
  nameUser.style.display = "block"
}

function setRoles(listRoles){
  console.log("listRoles",listRoles)
  
  let itemOpciones = document.getElementById("nav-item-opciones")
  let itemOrga = document.getElementById("itemOrga")
  let itemEval = document.getElementById("itemEval")
  let itemPresi = document.getElementById("itemPresi")
  let itemMisProp = document.getElementById("itemMisProp")
  let itemMisInscrip = document.getElementById("itemMisInscrip")
  let itemAdmin = document.getElementById("itemAdmin")

  itemOrga.style.display = "none"
  itemEval.style.display = "none"
  itemPresi.style.display = "none"
  itemMisProp.style.display = "none"
  itemMisInscrip.style.display = "none"
  itemAdmin.style.display = "none"
  itemOpciones.style.display = "block"

  if (!(listRoles[1]["Organizador"]==0)){
    itemOrga.style.display = "block"
    console.log("orga",listRoles[0]["Organizador"])
  }
  if (!(listRoles[2]["Presidente del Comité Académico"]==0)){
    itemPresi.style.display = "block"
    console.log("presi",listRoles[2]["Presidente del Comité Académico"])
  }
  if (!(listRoles[3]["Evaluador"]==0)){
    itemEval.style.display = "block"
    console.log("eval",listRoles[3]["Evaluador"])
  }
  if (!(listRoles[4]["Postulante"]==0)){
    itemMisProp.style.display = "block"
    console.log("postul",listRoles[4]["Postulante"])
  }
  if (!(listRoles[5]["Participante"]==0)){
    itemMisInscrip.style.display = "block"
    console.log("parti",listRoles[5]["Participante"])
  }
  if (!(listRoles[0]["Administrador"]==0)){
    itemAdmin.style.display = "block"
    console.log("admin",listRoles[5]["Administrador"])
  }
  if (
        (listRoles[1]["Organizador"]==0) && 
        (listRoles[2]["Presidente del Comité Académico"]==0) && 
        (listRoles[3]["Evaluador"]==0) &&
        (listRoles[4]["Postulante"]==0) && 
        (listRoles[5]["Participante"]==0) &&
        (listRoles[6]["Administrador"]==0) 
    ){
    itemOpciones.style.display = "none"
  }

}


function signUp(){
  try{
    const auth2 = window.gapi.auth2.getAuthInstance()
    console.log("auth2 ", auth2)
    if (auth2 != null) {
      auth2.signOut().then(
        auth2.disconnect().then(this.props.onLogoutSuccess)
      )
    }
  }catch(err){
    console.log(err)
  }
  
}

class BannerTop extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
        user: [],       
        userName: "__",
        fullName:"",
        idUser:-1,
        myRoles:null,
        logeado :false,
        visible : false,
        role: null,
        name: "Iniciar Sesion",
        SignUp: "Registrarse",        
    }
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    

  }  
  handleClickEventos(){

  }
  handleNextChildComponentChange(_nextChildComponent){
    console.log('cambiando', _nextChildComponent);
    this.props.onNextChildComponentChange(_nextChildComponent);
      
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
  }

  
  /** Manejadores de redireccion en modo de Mutacion */
  handleClicPostulanteEventos = () => {
    console.log('redireccionando a ... PropoMyProposals');
    this.handleNextChildComponentChange(PropoMyProposals);
  }
  handleClicOrganizadorEventos = () => {
    console.log('redireccionando a ... Announcements evento');
    this.handleNextChildComponentChange(OrganActiveEvents);
  }
  handleClicPresidenteEventos = () => {
    console.log('redireccionando a ... Announcements evento?')
    this.handleNextChildComponentChange(PresiAsignarEvalEvents)
  }
  handleClicAdmin = () => {
    this.handleNextChildComponentChange(AdminPageMainTable)
  }
  handleClicEvaluadorEventosListados = () => {
    this.handleNextChildComponentChange(EvaluadorEventosListados)
  }
  handleClicEvents = () => {
    console.log('redireccionando a ... Announcements evento');
    
    this.handleNextChildComponentChangeProps({mode:1,Usuario:this.props.nextChildComponentProps.Usuario});
    this.handleNextChildComponentChange(Dashboard);
  }
  handleClickAnnoucements = () => {
    console.log('redireccionando a ... Announcements evento');
    this.handleNextChildComponentChangeProps({mode:2,Usuario:this.props.nextChildComponentProps.Usuario});
    
    this.handleNextChildComponentChange(Dashboard);
  }
  handleClickInicio= () => {
    console.log('redireccionando a ... Inicio evento');
    this.handleNextChildComponentChange(NewIni);
  }
  /** metodos normales React */
  componentDidMount(){
    try{ //Verify if I'm logged
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);      
      console.log("retrievedJson",retrievedJson)

      let linkLogin = document.getElementById("linkLogin")
      let linkSignUp = document.getElementById("linkSignUp")
      let myavatar = document.getElementById("myavatar")

      if (retrievedJson == null){ //I'm not logged
        let retrievedObject = localStorage.getItem('localDataUser');
        let retrievedJson = JSON.parse(retrievedObject);      
        console.log("retrievedJson",retrievedJson)
        if (retrievedJson == null){
        initialState()
        console.log("No estoy logeado!")
        return
        }else{
          // I'm logged
          logInState()
          setRoles(retrievedJson.permisos)
          console.log("json:",retrievedJson)
          console.log("nombreree:",retrievedJson.infoUsuario.nombre)
          this.setState({fullName: retrievedJson.infoUsuario.nombre + " "+ retrievedJson.infoUsuario.apePaterno + " "+ retrievedJson.infoUsuario.apeMaterno});
          console.log("fullname: ",this.state.fullName)
        }
      }
      
      // I'm logged
      logInState()
      setRoles(retrievedJson.permisos)
      console.log("json:",retrievedJson)
      console.log("nombreree:",retrievedJson.infoUsuario.nombre)
      this.setState({fullName: retrievedJson.infoUsuario.nombre + " "+ retrievedJson.infoUsuario.apePaterno + " "+ retrievedJson.infoUsuario.apeMaterno});
      console.log("fullname: ",this.state.fullName)

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
      let nameUser = document.getElementById("nameUser")

      linkLogin.style.display = "block"
      linkSignUp.style.display = "block"
      myavatar.style.display = "none"
      itemOpciones.style.display = "none"
      nameUser.style.display = "none"

      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject); 
      
      console.log("json borrado",retrievedJson)
      
      sessionStorage.setItem("dataUser",null)
      sessionStorage.setItem("currentPage",null)

      let tipoLogin = sessionStorage.getItem('tipoLogin');      
      console.log("tipologin ",tipoLogin)
      if (tipoLogin == "gmail"){
        console.log("Iniciando logOut de gmail")
        signUp()
        console.log("Se concluyo logOut de gmail")
      }

      sessionStorage.setItem('tipoLogin',null)
      window.location.replace("./");
    }catch(err){
      console.log(err)
    }    
  }
  componentWillMount(){
    console.log("BannerTop willMount ->", this.props);
  }
  render(){
    
    return (
      <div id="bannerTop" style={styles.banner}><br/>              
        <div className="list-inline-item d-flex flex-column flex-md-row align-items-center ">
          <div className="list-inline-item my-0 mr-md-auto font-weight-normal">

          <a onClick={this.handleClickInicio} style={{cursor: "pointer"}} target="_self" title="Volver al home">
            <img src="piruleta_loquisima.png" className="img-fluid"  width="200"/></a>
            
          </div>          
          <GoogleLogout
                render={renderProps => (
                  <a
                    className="logout-button"
                    onClick={renderProps.onClick}
                  />                  
                )}    
            />
          <div className="nav navbar-nav navbar-right ml-auto" style={{alignItems:"center",paddingRight:20}}>
              
              <div className="list-inline-item" align="right">
                <a href="/signUp" id="linkSignUp" className="nav"  style={{color:"#6CDCD6",paddingRight:20}} >{this.state.SignUp}</a>
                <a href="/login"  id="linkLogin" className="nav"  style={{color:"#6CDCD6",paddingRight:20}}>{this.state.name}</a>
                <label id="nameUser" style={{color:"#6CDCD6",paddingRight:20}}>{this.state.fullName}</label>
              </div>



              <li className="nav-item dropdown" id="myavatar"   >
                
                  <Link to="#" data-toggle="dropdown" className="nav-link dropdown-toggle user-action">
                    <img src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png" className="avatar" alt="Avatar"/>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-right">
                      <li><Link to="#" className="dropdown-item"><i className="fa fa-user-o"></i> Perfil</Link></li>
                      <li><Link to="#" className="dropdown-item"><i className="fa fa-sliders"></i> Ajustes</Link></li>
                      <li className="divider dropdown-divider"></li>
                      <li><Link to="/" className="dropdown-item"onClick={this.clickLogOut}><i className="material-icons" >&#xE8AC;</i> Cerrar sesion</Link></li>
                  </ul>
              </li> 
            </div>
          
        </div>
        <div style={{paddingRight:20, paddingLeft:20}}><hr  className="line-top"/></div>
    
        <div>  
        
        <nav className="navbar navbar-default navbar-expand-xl navbar" style={styles.navbar}>
          <button className="navbar-toggler scrollbar scrollbar-primary" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <i className="navbar-toggler-icon fa fa-bars" style={styles.fa} aria-hidden="true"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{}}>
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link"  onClick={this.handleClickInicio} style={{cursor: "pointer"}} ><b><font size="3" color="#6CDCD6">Inicio</font></b><span className="sr-only">(current)</span></a>
              </li>
              
              <li className="nav-item">
                <a className="nav-link" onClick={this.handleClicEvents} style={{cursor: "pointer"}} ><b><font size="3" color="#6CDCD6">Eventos</font></b></a>
              </li>
              
              <li className="nav-item" >
                <a className="nav-link" onClick={this.handleClickAnnoucements} style={{cursor: "pointer"}} ><b><font size="3" color="#6CDCD6">Convocatoria</font></b></a>

              </li>
              <li className="nav-item" className="nav dropdown" id="nav-item-opciones">
                <Link className="nav-link dropdown-toggle" to="#" data-toggle="dropdown" role="button"  aria-haspopup="true" aria-expanded="false"><b><font size="3" color="#6CDCD6">Opciones</font></b></Link>
                <ul className="dropdown-menu">
                  <li><Link id="itemMisInscrip" className="nav-link" to="#"><b><font size="3">Mis inscripciones</font></b></Link></li>
                  <li><Link id="itemMisProp" className="nav-link" to="#"onClick={this.handleClicPostulanteEventos}><b><font size="3">Mis propuestas</font></b></Link></li>
                  <div className="dropdown-divider"></div>

                  <li><Link id="itemOrga" className="nav-link" onClick={this.handleClicOrganizadorEventos}><b><font size="3">Organizador</font></b></Link></li>
                  <li><Link id="itemPresi"className="nav-link"  onClick={this.handleClicPresidenteEventos}><b><font size="3">Presidente</font></b></Link></li>
                  <li><Link id="itemEval"className="nav-link"  onClick={this.handleClicEvaluadorEventosListados}><b><font size="3">Evaluador</font></b></Link></li>
                  <li><Link id="itemAdmin"className="nav-link"  onClick={this.handleClicAdmin}><b><font size="3">Administrador del sistema</font></b></Link></li>

                </ul>
              </li>
            </ul>
            
            <form className="navbar-form form-inline">
              <div className="input-group search-box" style={{alignItems:"center"}}>								
                    <input type="text" id="search" className="form-control" placeholder="Buscar" style={{alignItems:"center"}}/>
                    <span className="input-group-addon"><i className="material-icons">&#xE8B6;</i></span>
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
    paddingTop:0,
    paddingBottom:0,
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
    paddingBottom:0,
    marginBottom:0
  }
}
