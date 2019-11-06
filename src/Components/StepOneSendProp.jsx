import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';

export default class StepOneSendProp extends React.Component {
  constructor(){
    super();
    this.state={
      values: [{ }]
    }
    this.handleChange3=this.handleChange3.bind(this)
    this.handleChange4=this.handleChange4.bind(this)
    this.handleChangeFaseDate=this.handleChangeFaseDate.bind(this)
    this.DateFormat=this.DateFormat.bind(this)
    this.handleCheck=this.handleCheck.bind(this)
  }

  componentWillMount(){
    console.log("StepOneSendProp props");
    console.log(this.props);
    this.setState({values:this.props.fases})
  }
  DateFormat(date,json,tag){
    let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
    json[tag]=aux
  }
  handleCheck(event,i,str,str2){
    let val = this.state.values;
    val[i][str]=!val[i][str]
    val[i][str2]=val[i][str]===true?1:0
    this.setState({ values:val})
    this.props.handleChange2(this.state.values,"fases")
  }
  handleChange3(event,i,str) {
    let val = this.state.values;
    val[i][str] = event.type==="checkBox"?event.target.checked:event.target.value
    this.setState({ values:val });
    this.props.handleChange2(this.state.values,"fases")
    console.log(this.state)
  }
  handleChange4(value,i,str){
    let val = this.state.values;
    val[i][str] = value;
    this.setState({ values:val });
    this.props.handleChange2(this.state.values,"fases")
  }
  
  handleChangeFaseDate(value,i,str,str2){
    let val = this.state.values;
    val[i][str] = value;
    this.DateFormat(value,val[i],str2)
    this.setState({ values:val });
    this.props.handleChange2(this.state.values,"fases")
  }
  
  addClick() {
    this.setState(prevState => ({
      values: [...prevState.values, {idFase:0,secuencia:this.state.values.length+1,camposPerson:[],criterios:[],reqArch:false,reqEval:false}]
    }));
  }
  removeClick(i) {
    let val = [...this.state.values];
    val.splice(i, 1);
    this.setState({ values:val });
    this.props.handleChange2(val,"fases")
  }
  render () {
    return (
      <div>
        <div class="panel-group mx-auto" style={{width: "600px"}}>
        <div  class="panel panel-default">
            <div class="panel-heading">
              <h1>Autor
                <a  style={{marginRight:10,marginBottom:10,float:"right"}}/>  
              </h1>
            </div>
            <div class="panel-body">
              <Row >
              <div class="form-group col-md-12">
                  <label >Nombres</label>
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
              <Row >
              <div class="form-group col-md-12">
                  <label >Apellidos</label>
                  <input 
                      type="text" 
                      name='apellidos'
                      class="form-control" 
                      id="id_ap"
                      placeholder='Apellidos'              
                      onChange={this.props.handleChange}
                      value={this.props.apellidos}
                      autoFocus/>
              </div>
              </Row>
              <Row >
              <div class="form-group col-md-12">
                  <label >Telefono principal</label>
                  <input 
                      type="text" 
                      name='telf'
                      class="form-control" 
                      id="id_telf"
                      placeholder='Telefono'              
                      onChange={this.props.handleChange}
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
                      onChange={this.props.handleChange}
                      value={this.props.email}
                      autoFocus/>
              </div>
              </Row>
              <Row>
              <div class="form-group col-md-12">
                <label >Nivel de estudio</label> 
                <select class="form-control" id="id_selectStudyLevel">
                  <option>Primaria</option>
                  <option>Secundaria</option>
                  <option>Profesional </option>
                  <option>Post-grado</option>
                  <option>Otros...</option>
                </select>
              </div>
              </Row>
            </div> 
          </div>

        {/*this.state.values.map((el, index) => (
          <div key={index} class="panel panel-default">
            <div class="panel-heading">
              <h1>Autor 0{index+1}
              <a  style={{marginRight:10,marginBottom:10,float:"right"}}>
              {index===this.state.values.length-1?<input
                    type="button"
                    value="Eliminar autor"
                    class="btn btn-danger"
                    onClick={() => this.removeClick(index)}
                    style={{float:'right'}}
                />:null}
                
              </a></h1>
            </div>
            <div class="panel-body">
              <Row >
              <div class="form-group col-md-6">
                  <label >Nombres</label>
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
              <Row >
              <div class="form-group col-md-6">
                  <label >Apellidos</label>
                  <input 
                      type="text" 
                      name='apellidos'
                      class="form-control" 
                      id="id_ap"
                      placeholder='Apellidos'              
                      onChange={this.props.handleChange}
                      value={this.props.apellidos}
                      autoFocus/>
              </div>
              </Row>
              <Row >
              <div class="form-group col-md-6">
                  <label >Telefono principal</label>
                  <input 
                      type="text" 
                      name='telf'
                      class="form-control" 
                      id="id_telf"
                      placeholder='Telefono'              
                      onChange={this.props.handleChange}
                      value={this.props.telf}
                      autoFocus/>
              </div>
              </Row>
              <Row >
              <div class="form-group col-md-6">
                  <label >Correo electronico</label>
                  <input 
                      type="text" 
                      name='email'
                      class="form-control" 
                      id="id_email"
                      placeholder='Email'              
                      onChange={this.props.handleChange}
                      value={this.props.email}
                      autoFocus/>
              </div>
              </Row>
              <Row>
              <div class="form-group col-md-6">
                <label >Nivel de estudio</label> 
                <select class="form-control" id="id_selectStudyLevel">
                  <option>Primaria</option>
                  <option>Secundaria</option>
                  <option>Profesional </option>
                  <option>Post-grado</option>
                  <option>Otros...</option>
                </select>
              </div>
              </Row>
            </div> 
          </div>
              ))*/}  
          
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
