import React, { Component } from 'react';
import "./JStepper.css";
import Jloading from './Jloading';
class JStepper extends Component{
    constructor(props){
        super(props);
        this.state={
            currentStep:0,
            Nsteps:2,
            labels:['Autores', 'Información'],

        }
    }
    componentWillMount(){
//HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    }
    shouldComponentUpdate(nextState,nextProps){
        if(this.props.flagPrimeraFase != nextProps.flagPrimeraFase){
            return true;
        }
        if(this.props.currentStep != nextProps.currentStep){
            return true;
        }
        if(this.props.labelfase != nextProps.labelfase){
            return true;
        }
        if(this.props.content != nextProps.content){
            return true;
        }
        return false;
    }
    renderSingleStep(currentStep){
        if(this.props.flagPrimeraFase===1){
            if(currentStep===0){
                return(
                    <div class="md-stepper-horizontal blue">
                    <div class="md-step active editable">
                        <div class="md-step-circle"><span>1</span></div>
                        <div class="md-step-title">{this.state.labels[0]}</div>
                        <div class="md-step-bar-left"></div>
                        <div class="md-step-bar-right"></div>
                    </div>
                    <div class="md-step">
                        <div class="md-step-circle"><span>2</span></div>
                        <div class="md-step-title">{this.state.labels[1]}</div>
                        <div class="md-step-bar-left"></div>
                        <div class="md-step-bar-right"></div>
                    </div>
        
                    </div>
                );
            }else if(currentStep===1){return(
                <div class="md-stepper-horizontal blue">
                <div class="md-step active done">
                    <div class="md-step-circle"><span>1</span></div>
                    <div class="md-step-title">{this.state.labels[0]}</div>
                    <div class="md-step-bar-left"></div>
                    <div class="md-step-bar-right"></div>
                </div>
                <div class="md-step active editable">
                    <div class="md-step-circle"><span>2</span></div>
                    <div class="md-step-title">{this.state.labels[1]}</div>
                    <div class="md-step-bar-left"></div>
                    <div class="md-step-bar-right"></div>
                </div>
    
                </div>);
            }
        }
        else if(this.props.flagPrimeraFase===0 && this.props.content===true){
            
            return(
                <div class="md-stepper-horizontal blue">
                    <div class="md-step active done">
                        <div class="md-step-circle"><span>1</span></div>
                        <div class="md-step-title">{this.state.labels[0]}</div>
                        <div class="md-step-bar-left"></div>
                        <div class="md-step-bar-right"></div>
                    </div>
                    <div class="md-step active done">
                        <div class="md-step-circle"><span>2</span></div>
                        <div class="md-step-title">{this.state.labels[1]}</div>
                        <div class="md-step-bar-left"></div>
                        <div class="md-step-bar-right"></div>
                    </div>
                    <div class="md-step active editable">
                        <div class="md-step-circle"><span>Fase actual</span></div>
                        <div class="md-step-title">Fase actual</div>
                        <div class="md-step-optional">{this.props.labelfase}</div>
                        <div class="md-step-bar-left"></div>
                    <div class="md-step-bar-right"></div>
                    </div>
                </div>
                );
        }else if(this.props.flagPrimeraFase===0 && this.props.content===false){
            
            return(
                <div class="md-stepper-horizontal blue">
                    <div class="md-step active done">
                        <div class="md-step-circle"><span>1</span></div>
                        <div class="md-step-title">{this.state.labels[0]}</div>
                        <div class="md-step-bar-left"></div>
                        <div class="md-step-bar-right"></div>
                    </div>
                    <div class="md-step active done">
                        <div class="md-step-circle"><span>2</span></div>
                        <div class="md-step-title">{this.state.labels[1]}</div>
                        <div class="md-step-bar-left"></div>
                        <div class="md-step-bar-right"></div>
                    </div>
                    <div class="md-step active done">
                        <div class="md-step-circle"><span>Fase actual</span></div>
                        <div class="md-step-title">Fase actual</div>
                        <div class="md-step-optional">{this.props.labelfase}</div>
                        <div class="md-step-bar-left"></div>
                    <div class="md-step-bar-right"></div>
                    </div>
                </div>
                );
        }else{
            return(
                <div className="Row">
                  <Jloading />
                </div>
              );
        }
    }
    render(){
        return(
            <div>
            
                {this.renderSingleStep(this.props.currentStep)}
              </div>  

        );
    }
}

export default JStepper;


/**

<div class="md-stepper-horizontal blue">
                    <div class="md-step active editable">
                <div class="md-step-circle"><span>2</span></div>
                <div class="md-step-title">Shipping</div>
                <div class="md-step-optional">Optional</div>
                <div class="md-step-bar-left"></div>
                <div class="md-step-bar-right"></div>
                </div>
                <div class="md-step active">
                <div class="md-step-circle"><span>3</span></div>
                <div class="md-step-title">Payment</div>
                <div class="md-step-bar-left"></div>
                <div class="md-step-bar-right"></div>
                </div>
                <div class="md-step">
                <div class="md-step-circle"><span>4</span></div>
                <div class="md-step-title">Review</div>
                <div class="md-step-bar-left"></div>
                <div class="md-step-bar-right"></div>
                </div>
            </div>




*/