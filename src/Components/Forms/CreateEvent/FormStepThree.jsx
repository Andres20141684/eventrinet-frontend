import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import '../../../styles/style_sheets.css';
import Col from 'react-bootstrap/Col';
import ArrayDinamic from './ArrayDinamic';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

class FormStepThree extends Component{
    render(){
        return(
            <div clas="panel-group">
                
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                
                <h3>Detalles Generales</h3>
                <div class="panel panel-default">                
                <div class="panel-body">
                <Row >
                <div class="form-group col-md-6">
                    <label >Actividad</label>
                    <input type="text" class="form-control" name="actividad" id="actvidad" placeholder="Actividad" onChange={(e) => this.props.onChange(e,this.props.index,"nombre")} value={this.props.value.nombre}autoFocus required />
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
                        onChange={(e) => this.props.onChange(e,this.props.index,"descripcion")} value={this.props.value.descripcion}
                        maxLength="200"         
                        />
                </div>
                </Row>
                <Row>            
                <div class="form-group col-md-3">
                    <label >Fecha Inicio:</label>
                    <DatePicker
                      type="date"
                      id="input-date"
                      name="date_in"
                      placeholder="date_in"
                      selected={this.props.value.faseIni}
                      minDate={this.props.index===0?new Date():new Date(this.props.fechaAnt).setDate(this.props.fechaAnt.getDate() + 1)}
                      maxDate={this.props.fechaMax}
                      onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseIni","fechaFaseIni")}
                    />
                </div>
                <div class="form-group col-md-3">
                    <label >Fecha Fin:</label>
                    <DatePicker
                      type="date"
                      id="input-date"
                      name="date_in"
                      placeholder="date_in"
                      selected={this.props.value.faseFin}
                      minDate={this.props.value.faseIni}
                      maxDate={this.props.fechaMax}
                      onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseFin","fechaFaseFin")}
                    />
                </div>
              </Row>
                <Row>                
                <div class="form-group col-md-6">
                    <div class="form-group col-md-12" >
                        <label>Requiere adjuntar archivo (.pdf)</label>
                        <div>
                            <Form.Check
                                type="checkBox" 
                                name="formHorizontalRadios_1"
                                id="formHorizontalRadios1"
                                checked={this.props.value.reqArch}
                                onClick={(e) => this.props.handleCheck(e,this.props.index,"reqArch","necesitaArchivo")}
                            />
                        </div>
                    </div>
                </div>
                </Row>
                </div>
                </div> 
                
                <h3>Evaluacion</h3>
                <div class="panel panel-default">    
                <div class="panel-body">
                <Row >
                <div class="form-group col-md-6">                    
                    <div>
                            <Col>
                            <label for="title">Requiere de Criterios: </label>
                            </Col>
                            <Col><input
                                type="checkBox" 
                                checked={this.props.value.reqEval}
                                onClick={(e) => this.props.handleCheck(e,this.props.index,"reqEval","necesitaEvaluacion")}
                            />
                            </Col>
                    </div>
                    <div>
                    {this.props.value.reqEval===true?
                        <div>
                            <Row>
                            <div class="form-group col-md-6 form-inline">
                                <label >Numero de evaluadores: </label>
                                <input 
                                style={{display:'inline-block'}}
                                type="number" 
                                name='nombre'
                                class="form-control" 
                                id="id_name_fase"       
                                onChange={(e) => this.props.onChange(e,this.props.index,"numEvaluadores")}
                                value={this.props.value.numEvaluadores}
                                />
                        </div>
                        </Row>
                        <ArrayDinamic 
                        type='Criterio'
                        campo={this.props.criterios}
                        value={this.props.value} 
                        index={this.props.index}
                        handleChange4={this.props.handleChange4}
                        handleCheck={this.props.handleCheck}/>
                        </div>
                        :null}
                    
                    </div> 
                </div>
                </Row>
                
                   
                </div>
                </div>            

                <h3>Campos personalizados</h3>
                <div class="panel panel-default">
                <div class="panel-body">
                <Row >
                    <div class="form-group col-md-6">
                        <div class="input-group mb-3">
                            <ArrayDinamic 
                            campo={this.props.camposPerson}
                            value={this.props.value} 
                            index={this.props.index}
                            handleChange4={this.props.handleChange4}
                            handleCheck={this.props.handleCheck}/>
                        </div>
                    </div>
                </Row>
                </div>
                </div>
        </div>)
    }
}
export default FormStepThree;