import './../../styles/styles_Jloading.css';
import React from 'react';
import { Component } from 'react';
export default class Jloading extends Component {
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        return(
            <div class="container">
                <div class="row">
                <div class="col-sm">
                    </div>
                    <div class="col-sm">
                    <div class="lds-roller" style={{color: "#002D3D"}}>
            <div>
            </div><div></div><div>
                    </div>
                     <div>
                    </div>
                     <div>
                    </div>
         <div>      </div>
         <div></div><div>
            </div></div>
                    </div>
                    <div class="col-sm">
                    Cargando...
                    </div>
                    <div class="col-sm">
                    </div>
                    
                </div>
                </div>
            
        );
    }
}