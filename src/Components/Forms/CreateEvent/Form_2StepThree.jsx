import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'

class Prueba extends Component{

    state = { 
        values: [{ value: null }],
    };

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i].value = event.target.value;
        this.setState({ values });
      }

    render(){
        return(            
            <div class="cointainer p-4">
                <h1>General</h1>
                <FormGroup action="" class="card card-body">
                    <div class="form-group">
                    <label for="title">Actividad</label>
                    <input type="text" class="form-control" name="actividad" id="actvidad" placeholder="Actividad" autoFocus required />
                    </div>
                </FormGroup>
            </div>)
    }
}
export default Prueba;