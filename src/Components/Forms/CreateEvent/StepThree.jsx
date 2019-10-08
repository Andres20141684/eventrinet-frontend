import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import FormStepThree from './FormStepThree';

class StepThree extends Component{
    state = { 
        values: [{ value: null }],
        form_1: FormStepThree,
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

  render() {
    return (
      <form method="Post">
        <div>
        {this.state.values.map((el, index) => (
          <div key={index} class="panel panel-default">
            <div class="panel-heading"><h1>Fase 0{index+1}</h1></div>
            <div class="panel-body">
              <div>
                  <input
                      type="button"
                      class="btn btn-danger"
                      value="Eliminar fase"
                      onClick={() => this.removeClick(index)}
                      style={{float:'right'}}
                  />
                  <this.state.form_1   
                      value={el.value || ""} 
                      onChange={e => this.handleChange(index, e)}/>
                </div>
            </div> 
          </div>
        ))}        
                                
          <input type="button"  class="btn btn-primary" value="Agregar mas fases" onClick={() => this.addClick()} />           
        </div>
            
        
            <h1>Incluir Camera Ready</h1>
            <div class="panel panel-default">
            <FormGroup action="" class="card card-body">
                <div class="form-group">                    
                <div>
                    <Form.Check
                        type="radio" inline
                        label="Si"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                    />
                    <Form.Check
                        type="radio" inline
                        label="No"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                    />
                </div>
                </div>
            </FormGroup>
        </div>        
      </form>
    );
  }
}
export default StepThree;