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
            <div class="lds-roller">
                <div>
                    </div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        );
    }
}