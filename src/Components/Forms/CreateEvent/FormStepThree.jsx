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
                            selected={this.props.value.faseIni}
                            minDate={new Date()}
                            onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseIni","fechaFaseIni")}
                            />
                    </Col>
                    <Col><label >Fecha Fin: </label> </Col>
                    <Col> <DatePicker
                            selected={this.props.value.faseFin}
                            minDate={this.props.value.faseIni}
                            onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseFin","fechaFaseFin")}
                            />
                    </Col>
                    </Row>
                    <div class="form-group">
                        <Row>
                            <Col>
                            <label for="title">Requiere adjuntar archivo (.pdf)</label>
                            </Col>
                            <Col><input
                                type="checkBox" inline
                                label="Si"
                                name="formHorizontalRadios_1"
                                id="formHorizontalRadios1"
                                checked={this.props.value.reqArch}
                                onClick={(e) => this.props.handleCheck(e,this.props.index,"reqArch","necesitaArchivo")}
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <label for="title">Número de evaluadores: </label>
                            </Col>
                            <Col><input
                                type="number" 
                                minValue="0"
                                maxValue="20"
                            />
                            </Col>
                        </Row>
                    </div>
                </FormGroup>
            </div>
            <div class="cointainer p-4">
                <h1>Evaluacion</h1>
                <FormGroup action="" class="card card-body">
                    <Row>
                            <Col>
                            <label for="title">Requiere de Criterios: </label>
                            </Col>
                            <Col><input
                                type="checkBox" 
                                checked={this.props.value.reqEval}
                                onClick={(e) => this.props.handleCheck(e,this.props.index,"reqEval","necesitaEvaluacion")}
                            />
                            </Col>
                        </Row>
                    <div>
                    {this.props.value.reqEval===true?
                        <ArrayDinamic 
                        campo={this.props.criterios}
                        value={this.props.value} 
                        index={this.props.index}
                        handleChange4={this.props.handleChange4}
                        handleCheck={this.props.handleCheck}/>
                        :null}
                    
                    </div>                    
                </FormGroup>
            </div> 

            <div class="cointainer p-4">
                <h1>Campos personalizados</h1>
                <FormGroup action="" class="card card-body">
                    <ArrayDinamic 
                    campo={this.props.camposPerson}
                    value={this.props.value} 
                    index={this.props.index}
                    handleChange4={this.props.handleChange4}
                    handleCheck={this.props.handleCheck}/>
                </FormGroup>
            </div> 
            </div>
        </div>
        </div>)
    }
}
export default FormStepThree;