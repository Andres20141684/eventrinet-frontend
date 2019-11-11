import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';
import { assignmentExpression } from '@babel/types';


class StepOneSendPropuesta extends React.Component {
    constructor(){
      super();
      this.state={
        state1:{
            
        }
      }
      this.defaultMutableHandle=this.defaultMutableHandle.bind(this);
      
    }      

componentWillMount(){
    console.log("StepOneSendProp props ****");
    console.log(this.props);
}
DateFormat(date,json,tag){
  let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
  json[tag]=aux
}

defaultMutableHandle(e){
    this.props.multiHandle({to:e.target.name,value:e.target.value});
}
 
  render () {
    return (
      <div>
        
          <h1>Ingresa los datos del Autor</h1>
            <div class="panel-group mx-auto" style={{width: "600px"}}>
              <div  class="panel panel-default">
                <div class="panel-heading">
                  <h1>Datos Generales del Autor
                    <a  style={{marginRight:10,marginBottom:10,float:"right"}}/>  
                  </h1>
                </div>
                <div class="panel-body">
              <Row >
              <div class="form-group col-md-12">
                  <label >Nombres</label>
                  <input 
                      type="text" 
                      name='authorName'
                      class="form-control" 
                      id="id_name"
                      placeholder='Nombre'              
                      onChange={this.defaultMutableHandle}
                      value={this.props.nombre}
                      autoFocus/>
              </div>
              </Row>
              <Row >
              <div class="form-group col-md-12">
                  <label >Apellidos</label>
                  <input 
                      type="text" 
                      name='authorLastname'
                      class="form-control" 
                      id="id_ap"
                      placeholder='Apellidos'              
                      onChange={this.defaultMutableHandle}
                      value={this.props.apellidos}
                      autoFocus/>
              </div>
              </Row>
              </div>


              </div>
            </div>

            <div class="panel-group mx-auto" style={{width: "600px"}}>
              <div  class="panel panel-default">
                <div class="panel-heading">
                  <h1>Datos de Contacto
                    <a  style={{marginRight:10,marginBottom:10,float:"right"}}/>  
                  </h1>
                </div>
                <div class="panel-body">
              <Row >
              <div class="form-group col-md-12">
                  <label >Telefono principal</label>
                  <input 
                      type="text" 
                      name='telefono'
                      class="form-control" 
                      id="id_telf"
                      placeholder='Telefono'              
                      onChange={this.defaultMutableHandle}
                      value={this.props.telf}
                      autoFocus/>
              </div>
              </Row>
              <Row >
              <div class="form-group col-md-12">
                  <label >Correo electronico</label>
                  <input 
                      type="text" 
                      name='email'
                      class="form-control" 
                      id="id_email"
                      placeholder='Email'              
                      onChange={this.defaultMutableHandle}
                      value={this.props.email}
                      autoFocus/>
              </div>
              </Row>
              <Row>
              <div class="form-group col-md-12">
                <label >Nivel de estudio</label> 
                <select name="academicLevel"
                        class="form-control" 
                        id="id_selectStudyLevel"
                        onChange={this.defaultMutableHandle}>
                  <option>Primaria</option>
                  <option>Secundaria</option>
                  <option>Profesional </option>
                  <option>Post-grado</option>
                  <option>Otros...</option>
                </select>
              </div>
              </Row>
            </div> 
          </div>   </div>   
        </div>      
      
    )
  }
}
export default StepOneSendPropuesta;
var styles = {
  rotulos:{
    paddingRight: 80,
  }
}