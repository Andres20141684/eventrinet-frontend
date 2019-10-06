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
            fechaFE: '',
            fechaIC: new Date(),
            fechaFC: '',
            rdCategry:false,
            rdPropuest:false,
            comite1:[],
            presidente:[],
            evaluadores:[],
            categorias:[],
            aux: frmCreateEvent     

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleComiteadd=this.handleComiteadd.bind(this)
        this.handleDate=this.handleDate.bind(this)
        this.handleDate2=this.handleDate2.bind(this)
        this.handleCategoryadd=this.handleCategoryadd.bind(this)
        this.handleEvaluadoradd=this.handleEvaluadoradd.bind(this)
        this.handlePresidenteadd=this.handlePresidenteadd.bind(this)
        this.handleDate3=this.handleDate3.bind(this)
        this.handleDate4=this.handleDate4.bind(this)
        this.handleChangeRadio=this.handleChangeRadio.bind(this)
        this.handlePrint=this.handlePrint.bind(this)
      }

      handleDate(date){
        this.setState({
          fechaIE:date
        })
      }

      handleDate2(date){
        this.setState({
          fechaFE:date
        })
      }

      handleDate3(date){
        this.setState({
          fechaIC:date
        })
      }

      handleDate4(date){
        this.setState({
          fechaFC:date
        })
      }
    
      handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });  
        console.log(this.state)
      }

      handleComiteadd(list){
        this.setState({
          comite1 : list
        })
        console.log(this.state.comite1)
      }
      handleCategoryadd(list){
        this.setState({
          categorias : list
        })
      }
      handleEvaluadoradd(list){
        this.setState({
          evaluadores : list
        })
      }
      handlePresidenteadd(list){
        this.setState({
          presidente : list
        })
      }

      handleChangeRadio(event) {
        const target = event.target;
        const checked = target.checked;
        const id = target.id;

        this.setState({
          [id]: checked
        });  
      }

      handlePrint(event){
        console.log(this.state);
        console.log(JSON.stringify(this.state));
      }

      

      render() {    
        return (
          <div className='container'>

              <this.state.aux 
              handlePrint={this.handlePrint}

              handleChangeRadio={this.handleChangeRadio}
              rdCategry={this.state.rdCategry}
              rdPropuest={this.state.rdPropuest}
              evaluadores={this.state.evaluadores}
              presidente={this.state.presidente}
              handleEvaluadoradd={this.handleEvaluadoradd}
              handlePresidenteadd={this.handlePresidenteadd}
              handleCategoryadd={this.handleCategoryadd}
              categorias={this.state.categorias}
              handleDate3={this.handleDate3}
              handleDate4={this.handleDate4}
              fechaIC={this.state.fechaIC}
              fechaFC={this.state.fechaFC}
              handleDate2={this.handleDate2}
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