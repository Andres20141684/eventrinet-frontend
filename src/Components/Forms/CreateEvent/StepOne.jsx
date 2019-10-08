import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import ArrayOfChips from './ArrayOfChips';
import '../../../styles/style_sheets.css'

export default class StepOne extends React.Component {
 
  render () {
    return (
      <div>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Datos Generales</h1></div>
            <div class="panel-body">
            <Row >
            <div class="form-group col-md-6">
                <label >Nombre</label>
                <input 
                    type="text" 
                    name='nombre'
                    class="form-control" 
                    id="id_name"
                    placeholder='Nombre'              
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
                    id="id_description"
                    placeholder='Descripcion'                  
                    onChange={this.props.handleChange}
                    value={this.props.descripcion}              
                    />
            </div>
            </Row>
            <Row>
            <div class="form-group col-md-6">
                <label >Lugar</label>
                <input 
                    type="text" 
                    name='lugar'
                    class="form-control" 
                    id="id_place"
                    placeholder='Lugar'                
                    onChange={this.props.handleChange}
                    value={this.props.lugar}/>
            </div>
            </Row>
            <Row>            
                <div class="form-group col-md-3">
                    <label >Fecha Inicio</label>
                    <div><DatePicker
                      selected={this.props.fechaIC}
                      minDate={new Date()}
                      onChange={this.props.handleDate3}
                      class="form-control"
                    /></div>
                </div>
                <div class="form-group col-md-3">
                    <label >Fecha Fin</label>
                    <div><DatePicker
                      selected={this.props.fechaFE}
                      minDate={this.props.fechaIE}
                      onChange={this.props.handleDate2}
                      class="form-control"
                    /></div>
                </div>
            </Row>
            </div>
          </div>
          <br/>
          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Categorias</h1></div>
              <div class="panel-body">
                <div class="form-group col-md-6">
                    <ArrayOfChips lista={this.props.categorias} handleadd={this.props.handleCategoryadd}/>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading"><h1>Duración de la convocatoria</h1></div>
              <div class="panel-body">
              <Row>            
                <div class="form-group col-md-4">
                    <label >Fecha Inicio</label>
                    <div><DatePicker
                      selected={this.props.fechaIC}
                      minDate={new Date()}
                      onChange={this.props.handleDate3}
                      class="form-control"
                    /></div>
                </div>
                <div class="form-group col-md-3">
                    <label >Fecha Fin</label>
                    <div><DatePicker
                      selected={this.props.fechaFC}
                      minDate={this.props.fechaIC}
                      onChange={this.props.handleDate4}
                    /></div>
                </div>
              </Row>              
              </div>
            </div>
          </div>
      </div>
      </div>
    )
  }
}

var styles = {
  rotulos:{
    paddingRight: 80,
  }
}
