import React, { Component } from 'react';
import frmCreateEvent from './frmCreateEvent'
import { string } from 'prop-types';

export default class EventNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            descripcion:'ff',
            lugar:'',
            fechaI: new Date(),
            comite1:[{key:1,label:'none'},{key:2,label:'Gleen'}],
            aux: frmCreateEvent     
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleComiteadd=this.handleComiteadd.bind(this)
        this.handleComitedelete=this.handleComitedelete.bind(this)
      }
    
      handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name]: value
        })    
      }

      handleComiteadd(list){
        this.setState({
          comite1 : list
        })
      }

      handleComitedelete(event){

      }

      render() {    
        return (
          <div className='container'>
              <this.state.aux 
              handleComitedelete={this.handleComitedelete}
              handleComiteadd={this.handleComiteadd}
              handleChange={this.handleChange} 
              nombre={this.state.nombre} 
              descripcion={this.state.descripcion}
              lugar={this.state.lugar}
              fechaI={this.state.fechaI}
              comite1={this.state.comite1}
              />
          </div>
          /*
          
          <React.Fragment>            
          <form onSubmit={this.handleSubmit}>

            <Step1 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              email={this.state.email}
            />
            <Step2 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              username={this.state.username}
            />
            <Step3 
              currentStep={this.state.currentStep} 
              handleChange={this.handleChange}
              password={this.state.password}
            />       
        
          </form>
          </React.Fragment>*/
        )
        }


}