import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css'
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';

export default class StepTwoSendProp extends React.Component {
  
  
  render () {
    return (
      <div >
        <div class="panel-group mx-auto" style={{width: "600px"}}>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Descripcion</h1></div>
            <div class="panel-body">
            <Row >
            <div class="form-group col-md-12">
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
            <div class="form-group col-md-12">
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
            <Row >
            <div class="form-group col-md-12">              
                <div class="col-xs-9 col-md-9" style={{paddingLeft:0}}>
                  <select class="form-control" id="id_selectCategory">
                    <option>Machine Learning</option>
                    <option>Redes</option>
                    <option>Inteligencia </option>
                    <option>Automirision experta</option>
                    <option>sebiwis</option>
                  </select>
                </div>
                <div class=" col-xs-3 col-md-3"style={{float: "left", paddingRight:0}}>
                  <button type="button" class="btn btn-success" style={{width:"126px"}}>Agregar</button>
                </div>
              </div>
              </Row>
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Archivo</h1></div>
            <div class="panel-body">
              <div class="form-group col-md-12"style={{paddingLeft:0}}>
              <label>Subir propuesta. El archivo debe estar en formato PDF (extension PDF)</label>
              <div class="custom-file" >
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
