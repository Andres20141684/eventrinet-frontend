import React, { Component } from 'react';
import frmCreateEvent from './frmCreateEvent'
import { string } from 'prop-types';

export default class EventNew extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            descripcion:'',
            lugar:'',
            fechaIE: new Date(),
            fechaFE: new Date(),
            comite1:[{key:1,label:'none'},{key:2,label:'Gleen'}],
            frmCreateEvent: frmCreateEvent     
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleComiteadd=this.handleComiteadd.bind(this)
        this.handleDate=this.handleDate.bind(this)

      }

      handleDate(date){
        this.setState({
          fechaIE:date
        })
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

      render() {    
        return (
          <div className='container'>

              <this.state.frmCreateEvent 
              handleDate={this.handleDate}
              fechaIE={this.state.fechaIE}
              fechaFE={this.state.fechaFE}

              handleComiteadd={this.handleComiteadd}
              handleChange={this.handleChange} 
              nombre={this.state.nombre} 
              descripcion={this.state.descripcion}
              lugar={this.state.lugar}
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