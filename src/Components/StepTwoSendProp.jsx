import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';

export default class StepTwoSendProp extends React.Component {
  
  
  render () {
    return (
      <div>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Descripcion</h1></div>
            <div class="panel-body">
            <Row >
            <div class="form-group col-md-6">
                <label >Actividades</label>
                <input 
                    type="text" 
                    name='actividades'
                    class="form-control" 
                    id="id_actividades"
                    placeholder='Actividades'              
                    onChange={this.props.handleChange}
                    value={this.props.actividades}
                    autoFocus/>
            </div>
            </Row>
            <Row>
            <div class="form-group col-md-6">
                <label>Resumen</label>
                <textarea 
                    type="text" 
                    name='resumen'
                    class="form-control" 
                    id="id_resumen"
                    placeholder='Resumen'
                    onChange={this.props.handleChange}
                    value={this.props.resumen}              
                    />
            </div>
            </Row>
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Categorías</h1></div>
            <div class="panel-body">
              <div class="form-group col-md-6">
                <div class="form-group">
                  <Row>
                    <select class="form-control" id="id_selectCategory">
                      <option>Machine Learning</option>
                      <option>Redes</option>
                      <option>Inteligencia </option>
                      <option>Automirision experta</option>
                      <option>sebiwis</option>
                    </select>
                  </Row>
                  <Row>
                    <button type="button" class="btn btn-success">Agregar</button>
                  </Row>
                  
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Archivo</h1></div>
            <div class="panel-body">
              <div class="form-group col-md-6">
              <label>Subir propuesta. El archivo debe estar en formato PDF (extension PDF)</label>
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"/>
                <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
              </div>
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
