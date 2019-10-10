import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_record.css'; 
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon, MDBBtn } from 'mdbreact';


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
            <body>  
                <div class="component-header"  width="300">
                <a class="component-logo customizable chart" href='/' title="Volver a pagina principal">
                    <img class="component-logo" src="logo.png"  width="240"/> 
                </a>
                </div>                
                <section class="container-fluid bg">
                    <section class="row justify-content-center">
                        <section class="col-12  col-sm-6 col-md-3">
                          <br/><br/><br/><br/>
                        <MDBContainer>
                        <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Nombre"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Correo Electrónico"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Confirma tu correo electrónico"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Contraseña"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Registrar
                  </MDBBtn>
                  <MDBBtn>
                  <div width="200" height="500" effect="fadeInUp">                                    
                  <a href={this.state.pagPrev}>
                  <div class="g-signin2" align="center" data-onsuccess="onSignIn" >
                      
                  </div>
                  </a>
                  </div>
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      </MDBContainer>     



                        </section>
                    </section>
                </section>
            </body>
            <this.state.bannBot />
        </div>)
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