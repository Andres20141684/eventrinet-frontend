import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import FormStepThree from './FormStepThree';
import Row from 'react-bootstrap/Row';



  
class StepThree extends Component{
    state = { 
        values: [{ value: null }],
        form_1: FormStepThree,
        checked:false,
    };  

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i].value = event.target.value;
    this.setState({ values });
  }

  addClick() {
    this.setState(prevState => ({
      values: [...prevState.values, { value: null }]
    }));
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i, 1);
    this.setState({ values });
  }

  /*handleSubmit(event) {
    alert("A name was submitted: " + this.state.values.join(", "));
    event.preventDefault();
  }*/
  
  handleCheckboxChange = event =>{
    this.setState({ checked: event.target.checked });
    const isChecked = this.state.checked;
    if (isChecked){
      console.log("bloquea");
    }
  }
    

  render() {
    return (
      <form method="Post">
        <div>
        {this.state.values.map((el, index) => (
          <div key={index} class="panel panel-default">
            <div class="panel-heading">
              <h1>Fase 0{index+1}
              <a  style={{marginRight:10,marginBottom:10,float:"right"}}>
                <input
                  type="button"
                  class="btn btn-danger"
                  value="Eliminar fase"
                  onClick={() => this.removeClick(index)}
                  style={{float:'right'}}
              />
              </a></h1>
            </div>
            <div class="panel-body">
              <div>
                  <this.state.form_1   
                      value={el.value || ""} 
                      onChange={e => this.handleChange(index, e)}/>
                </div>
            </div> 
          </div>
        ))}        
                                
          <input type="button"  class="btn btn-primary" value="Agregar mas fases" onClick={() => this.addClick()} />           
        </div>
            
            <br/>

            <div>
            <h3>Incluir Camera Ready</h3>
            <input 
                type="checkbox" 
                checked={this.state.checked}
                onChange={this.handleCheckboxChange}
                />
            </div>
            <div class="panel panel-default">                
            <div class="panel-body">
              <FormGroup action="" class="card card-body">
                  <Row>            
                  <div class="form-group col-md-3">
                      <label >Fecha Inicio</label>
                      <Form.Control
                        type="date"
                        id="id_IniCamReady"
                        selected={this.props.fechaIC}
                        minDate={new Date()}
                        onChange={this.props.handleDateStartCamReady}
                        class="form-control"
                        disabled ={this.state.checked}
                      />
                  </div>
                  <div class="form-group col-md-3">
                      <label >Fecha Fin</label>
                      <Form.Control
                        type="date"
                        id="id_FinCamReady"
                        selected={this.props.fechaFC}
                        minDate={this.props.fechaIC}
                        onChange={this.props.handleDateEndCamReady}
                        disabled ={this.state.checked}
                      />
                  </div>
                </Row>
                                  
              </FormGroup>
            </div>
            </div>

            <h3>Fecha límite de elección de preferencias para los evaluadores</h3>            
              <FormGroup action="" class="card card-body">  
                  <Row>            
                  <div class="form-group col-md-3">                      
                      <Form.Control
                        type="date"
                        selected={this.props.fechaIC}
                        minDate={new Date()}
                        onChange={this.props.handleDateEndEval}
                        class="form-control"
                      />
                  </div>
                </Row>        
              </FormGroup><br/>
      </form>
    );
  }
}
export default StepThree;
