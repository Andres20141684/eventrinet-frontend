import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'


class FormStepThree extends Component{
    render(){
        return(    
            <div>
            <div class="panel">
            
            <div>
            <div class="cointainer p-4">
                <h1>General</h1>
                <FormGroup action="" class="card card-body">
                    <div class="form-group">
                    <label for="title">Actividad</label>
                    <input type="text" class="form-control" name="actividad" id="actvidad" placeholder="Actividad" autoFocus required />
                    </div>
                    
                    <div class="form-group">
                    <label for="title">Descripcion </label>
                    <textarea class="form-control" rows="3" name="descripcion" id="description" placeholder="Descripcion" />
                    </div>
                    
                    <div class="form-group">
                    <label for="title">Requiere adjuntar archivo (.pdf)</label>
                    <div>
                        <Form.Check
                            type="radio" inline
                            label="Si"
                            name="formHorizontalRadios_1"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio" inline
                            label="No"
                            name="formHorizontalRadios_1"
                            id="formHorizontalRadios2"
                        />
                    </div>
                    </div>
                </FormGroup>
            </div>
            <div class="cointainer p-4">
                <h1>Configuracion de evaluacion</h1>
                <FormGroup action="" class="card card-body">
                    <div class="form-group">                    
                    <div>
                        <Form.Check
                            type="radio" inline
                            label="Si"
                            name="formHorizontalRadios_2"
                            id="formHorizontalRadios1"
                        />
                        <Form.Check
                            type="radio" inline
                            label="No"
                            name="formHorizontalRadios_2"
                            id="formHorizontalRadios2"
                        />
                    </div>
                    </div>                    
                </FormGroup>
            </div> 

            <div class="cointainer p-4">
                <h1>Campos personalizados</h1>
                <FormGroup action="" class="card card-body">
                    <div class="form-group">
                        <input type="text"  class="form-control"/>
                        <button>Agregar mas campos</button>
                    </div>
                </FormGroup>
            </div> 
            </div>
        </div>
        </div>)
    }
}
export default FormStepThree;