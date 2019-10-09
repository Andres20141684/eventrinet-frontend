import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import '../../../styles/style_sheets.css';
import ArrayOfChips from './ArrayOfChips';

class FormStepThree extends Component{
    
    formGroupCamposPersonalizados(props){
        return(
            <div style={{marginLeft: 13}}>
            <h3>Campos personalizados</h3>
                <div class="panel panel-default">
                <div class="panel-body">
                <Row >
                    <div class="form-group col-md-6">
                    <ArrayOfChips lista={props.campos} handleadd={props.handleCamposadd}/> 
                    </div>
                </Row>
                </div>
                </div>
            </div>
        )

    }
    render(){
        return(
            <div clas="form-phases">
                
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
                <div class="form-group col-md-3">
                    <label >Fecha Inicio</label>
                    <Form.Control
                      type="date"
                      selected={this.props.fechaIC}
                      minDate={new Date()}
                      onChange={this.props.handleDate3}
                      class="form-control"
                    />
                </div>
                <div class="form-group col-md-3">
                    <label >Fecha Fin</label>
                    <Form.Control
                      type="date"
                      selected={this.props.fechaFC}
                      minDate={this.props.fechaIC}
                      onChange={this.props.handleDate4}
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
                
                <h3>Configuracion de evaluacion</h3>
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
                <Row>
                <div class="form-group col-md-6">
                    <label >Numero de evaluadores</label>
                    <input 
                        type="text" 
                        name='nombre'
                        class="form-control" 
                        id="id_name_fase"
                        placeholder='Actividad'              
                        onChange={this.props.handleChange}
                        value={this.props.nombre}
                        />
                </div>
                </Row>
                <Row>
                <div class="form-group col-md-6">
                    <label >Criterios de evaluacion</label>
                    <label style={{fontSize:10, paddingLeft:20}} >Subir los criterios. El archivo debe estar en formato Excel(extension xlx,xlxs)</label>                    
                    
                    
                    <input type="file" class="btn btn-sm float-left" />
                    
                </div>
                </Row>                
                </div>
                </div>            
                <this.formGroupCamposPersonalizados {...this.props} />
        </div>)
    }
}
export default FormStepThree;