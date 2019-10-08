import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_record.css'; 


class Login extends Component{
    state = {
        bannerLogin: BannerLogin,
        bannBot : BannerBottom,
        usuario : null,
        pagPrev: "/"
    }

    render(){

        return(<div>            
            <body>  
                <div class="component-header"  width="300">
                <a class="component-logo customizable chart" href='/' title="Volver a pagina principal">
                    <img class="component-logo" src="logo.png"  width="240"/> 
                </a>
                </div>                
                <section class="container-fluid bg">
                    <section class="row justify-content-center">
                        <section class="col-12  col-sm-6 col-md-3">
                        <div class="form-container">
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
                                    <div class="g-signin2" data-onsuccess="onSignIn" ></div>
                                    <a href={this.state.pagPrev}>___</a>
                                </div>
                            </section>
                        </div>
                        </div>
                        </section>
                    </section>
                </section>
            </body>
            <this.state.bannBot />
        </div>)
    }
}


export default Login;

