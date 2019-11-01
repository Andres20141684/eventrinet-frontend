import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import ArrayOfChips from './ArrayOfChips';
import '../../../styles/style_sheets.css'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../../../styles/style_sheets.css';


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
                    maxLength="45"
                    autoFocus/>
            </div>
            </Row>
            <Row>
            <div class="form-group col-md-6">
                <label>Descripcion</label>
                <textarea 
                    rows='7'
                    type="text" 
                    name='descripcion'
                    class="form-control" 
                    id="id_description"
                    placeholder='Descripcion'                  
                    onChange={this.props.handleChange}
                    value={this.props.descripcion}       
                    maxLength="200"       
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
                    value={this.props.lugar}
                    maxLength="150"
                    />
            </div>
            </Row>
            <Row>            
                <div class="form-group col-md-3">
                <label >Fecha Inicio</label>
                  <DatePicker
                    type="date"
                    selected={this.props.fechaIE}
                    minDate={new Date()}
                    onChange={(e)=> this.props.handleChange2(e,"fIni")}
                    id="input-date"
                    name="date_in"
                    placeholder="date_in"
                  />
                </div>
                <div class="form-group col-md-3">
                    <label >Fecha Fin </label>
                      <DatePicker
                        style={{position:"absolute"}}
                        type="date"
                        selected={this.props.fechaFE}
                        minDate={this.props.fechaIE}
                        onChange={(e)=> this.props.handleChange2(e,"fFin")}
                        id="input-date"
                        name="date_in"
                        placeholder="date_in"
                      />
                </div>
            </Row>
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Categorias</h1></div>
            <div class="panel-body">
              <div class="form-group col-md-6">
              <ArrayOfChips lista={this.props.categorias} handleadd={this.props.handleChange2} tag="categorias" label="descripcion"/>
              </div>
            </div>
          </div>
          <br></br>
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
