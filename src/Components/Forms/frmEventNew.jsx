import React, { Component } from 'react';
import frmCreateEvent from './frmCreateEvent'

export default class EventNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            descripcion:'',
            lugar:'',
            fechaI: new Date(),
            aux: frmCreateEvent     
        }
        this.handleChange = this.handleChange.bind(this)
      }
    
      handleChange(event) {
        const {name, value} = event.target
        this.setState({
          [name]: value
        })    
      }

      render() {    
        return (
          <div className='container'>
              <this.state.aux 
              handleChange={this.handleChange} 
              nombre={this.state.nombre} 
              apellido={this.state.apellido}
              lugar={this.state.lugar}
              fechaI={this.state.fechaI}
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