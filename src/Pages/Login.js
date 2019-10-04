import React, { Component } from 'react';
import BannerLogin from '../Components/General/bannerLogin';
import BannerBottom from '../Components/General/bannerBottom'
import '../styles/style_record.css'; 
import 'react-tabs/style/react-tabs.css';
import 'react-table/react-table.css';
import './../styles/style_gig_tittle.css';

class Login extends Component{
    state = {
        bannerLogin: BannerLogin,
        bannBot : BannerBottom,

      }
   
    render(){
        return(<div> 
            <body>
                <section class="container-fluid bg">
                    <section class="row justify-content-center">
                        <section class="col-12  col-sm-6 col-md-3">
                        <form class="form-container">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Submit</button>
                            
                        </form>
                        </section>
                    </section>
                </section>
            </body>
        </div>)
    }
}


export default Login;

