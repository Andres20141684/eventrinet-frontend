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
import Autocompleter from './Autocomplete';


export default class StepOne extends React.Component {
  constructor(){
    super();
    this.state={
      auxCat:''
    }
    this.handleAuxChange=this.handleAuxChange.bind(this)
  }

  handleAuxChange(e,str){
    this.setState({
      [str]:e.target.value
    })
    console.log(this.state)
  }
  

  render () {
    return (
      <div>
        <div class="panel-group">
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Datos Generales</h1></div>
            <div class="panel-body">
              {/*<div>
                <Row>
                <Autocompleter></Autocompleter>
                </Row>
              </div>*/}
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
            </div>
          </div>
          <br></br>
          <div class="panel panel-default">
            <div class="panel-heading"><h1>Categorias</h1></div>
            <div class="panel-body">
              <div class="form-group col-md-6">
              <ArrayOfChips 
              auxLabel='auxCat'
              aux={this.state.auxCat} 
              handlechange={this.handleAuxChange} 
              lista={this.props.categorias} 
              handleadd={this.props.handleChange2} 
              tag="categorias" 
              label="descripcion"/>
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
