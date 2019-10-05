import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import FormStepThree from './FormStepThree';
class Prueba extends Component{
    state = { 
        values: [{index:0, value: null }],
        form_1: FormStepThree,
    };  

  handleChange(i, event) {
    let values = [...this.state.values];
    values[i].value = event.target.value;
    this.setState({ values: values});
  }

  addClick(index) {
    this.setState(prevState => ({
      values: [...prevState.values, {index:index, value: null }]
    }));
  }

  removeClick(i) {
    let values = [...this.state.values];
    values.splice(i,1)
    this.setState({ values:values });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.values.join(", "));
    event.preventDefault();
  }

  render() {
    return (
      <form method="Post">
        <div>
        {this.state.values.map((el, index) => (
          <div key={index} class="panel panel-default">
                <h1>Fase 0{index+1} </h1>  
                <div>
                <input
                    type="button"
                    value="remove"
                    onClick={() => this.removeClick(index)}
                    style={{float:'right'}}
                />
                <this.state.form_1   
                    value={el.value || ""} 
                    onChange={e => this.handleChange(index, e)}/>
                </div>
                <input type="button" value="add more" onClick={() => this.addClick(index)} /> 
          </div>
        ))}  
        </div>
            
        <div class="cointainer p-4">
            <h1>Incluir Camera Ready</h1>
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
        <button class="btn btn-primary" type="submit" style={{float:'right'}}>Crear evento</button>
      </form>
    );
  }
}
export default Prueba;