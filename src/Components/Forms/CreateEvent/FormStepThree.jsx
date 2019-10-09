import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import ArrayDinamic from './ArrayDinamic';
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
                    <input type="text" name="actividad" id="actvidad" placeholder="Actividad" onChange={(e) => this.props.onChange(e,this.props.index,"nombre")} value={this.props.value.nombre}autoFocus required />
                    </div>
                    
                    <div class="form-group">
                    <label for="title">Descripcion </label>
                    <textarea rows="3" name="descripcion" id="description" placeholder="Descripcion" onChange={(e) => this.props.onChange(e,this.props.index,"descripcion")} value={this.props.value.descripcion}/>
                    </div>
                    <Row xs sm>
                    <Col> <label >Fecha Inicio: </label> </Col>
                    <Col> <DatePicker
                            selected={new Date()}
                            />
                    </Col>
                    <Col><label >Fecha Fin: </label> </Col>
                    <Col> <DatePicker
                            selected={new Date()}
                            />
                    </Col>
                    </Row>
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
                    <ArrayDinamic {...this.props}/>
                </FormGroup>
            </div> 
            </div>
        </div>
        </div>)
    }
}
export default FormStepThree;