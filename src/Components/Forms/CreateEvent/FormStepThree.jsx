import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';

class FormStepThree extends Component{
    render(){
        return(
            <div clas="form-phases">            
                <h1>Detalles Generales</h1>
                <div class="panel panel-default">                
                <div class="panel-body">
                <Row >
                <div class="form-group col-md-6">
                    <label >Actividad</label>
                    <input 
                        type="text" 
                        name='nombre'
                        class="form-control" 
                        id="id_name_fase"
                        placeholder='Actividad'              
                        onChange={this.props.handleChange}
                        value={this.props.nombre}
                        autoFocus/>
                </div>
                </Row>
                <Row>
                <div class="form-group col-md-6">
                    <label>Descripcion</label>
                    <textarea 
                        type="text" 
                        name='descripcion'
                        class="form-control" 
                        id="id_description_fase"
                        placeholder='Descripcion'                  
                        onChange={this.props.handleChange}
                        value={this.props.descripcion}              
                        />
                </div>
                </Row>
                <Row>
                <div class="form-group col-md-6">
                    <label>Requiere adjuntar archivo (.pdf)</label>
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
                </Row>
                </div>
                </div> 
            
                <h1>Configuracion de evaluacion</h1>            
                <div class="panel panel-default">    
                <div class="panel-body">
                <Row >
                <div class="form-group col-md-6">                    
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
                </Row>
                </div>
                </div>            

                <h1>Campos personalizados</h1>
                <div class="panel panel-default">
                <div class="panel-body">
                <Row >
                    <div class="form-group col-md-6">                    
                        <div class="input-group mb-3">
                            <input 
                                type="email" 
                                name='email'
                                class="form-control" 
                                id="id_email"
                                placeholder="example@example.com" 
                                aria-label="Recipient's username" 
                                aria-describedby="basic-addon2"
                                style={{width: 300}}/>
                            <div class="input-group-append">
                            <button 
                                class="btn btn-outline-secondary add"
                                variant="primary" 
                                type='button' 
                                style={{backgroundColor:"002D3D"}}
                                type="button">Agregar campos</button>
                            </div>
                        </div>
                    </div>
                </Row>
                </div>
                </div>
        </div>)
    }
}
export default FormStepThree;