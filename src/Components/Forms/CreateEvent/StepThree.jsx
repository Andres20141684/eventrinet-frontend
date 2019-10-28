import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import FormStepThree from './FormStepThree';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

  
class StepThree extends Component{
  constructor(){
    super();
    this.state={
      values: [{ }],
      
      form_1: FormStepThree,
    }
    this.handleChange3=this.handleChange3.bind(this)
    this.handleChange4=this.handleChange4.bind(this)
    this.handleChangeFaseDate=this.handleChangeFaseDate.bind(this)
    this.DateFormat=this.DateFormat.bind(this)
    this.handleCheck=this.handleCheck.bind(this)
  }

componentWillMount(){
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

/*handleSubmit(event) {
  alert("A name was submitted: " + this.state.values.join(", "));
  event.preventDefault();
}*/

handleCheckboxChange = event =>{
  this.setState({ checked: event.target.checked });
  const isChecked = this.state.checked;
  if (isChecked){
    console.log("bloquea");
  }
}
  
    

  render() {
    return (
      <form method="Post">
        <div>
        {this.state.values.map((el, index) => (
          <div key={index} class="panel panel-default">
            <div class="panel-heading">
              <h1>Fase 0{index+1}
              <a  style={{marginRight:10,marginBottom:10,float:"right"}}>
              {index===this.state.values.length-1?<input
                    type="button"
                    value="Eliminar fase"
                    class="btn btn-danger"
                    onClick={() => this.removeClick(index)}
                    style={{float:'right'}}
                />:null}
                
              </a></h1>
            </div>
            <div class="panel-body">
              <div>
              <this.state.form_1 
                    camposPerson="camposPerson"
                    criterios="criterios"
                    value={this.state.values[index]} 
                    index={index}
                    onChange={this.handleChange3}
                    handleChange4={this.handleChange4}
                    handleChangeFaseDate={this.handleChangeFaseDate}
                    handleCheck={this.handleCheck}/>
                </div>
            </div> 
          </div>
        ))}        
                                
          <input type="button"  class="btn btn-primary" value="Agregar mas fases" onClick={() => this.addClick()} />           
        </div>
            
            <br/>

            <div>
            <h3>Camera Ready</h3>
            <div class="panel panel-default">  
            <div class="panel-body">   
            <div>
              <label>Requiere Camera Ready</label>
            <input 
                type="checkbox" 
                checked={this.props.rdCamR}
                onClick={(e)=>this.props.handleCheckB(e,"rdCamR")}
                />
            </div>
            </div>
              {this.props.rdCamR===true?<FormGroup action="" class="card card-body">
                  <Row>            
                  <div class="form-group col-md-3">
                      <label >Fecha Inicio</label>
                      <DatePicker
                        type="date"
                        id="id_IniCamReady"
                        selected={this.props.fCRIni}
                        minDate={new Date()}
                        onChange={(e)=> this.props.handleChange2(e,"fCRIni")}
                        class="form-control"
                        
                      />
                  </div>
                  <div class="form-group col-md-3">
                      <label >Fecha Fin</label>
                      <DatePicker
                        type="date"
                        id="id_FinCamReady"
                        selected={this.props.fCRFin}
                        minDate={this.props.fCRIni}
                        onChange={(e)=> this.props.handleChange2(e,"fCRFin")}
                        
                      />
                  </div>
                </Row>
                                  
              </FormGroup>:null}
              
            </div>
            </div>

            <h3>Fecha límite de elección de preferencias para los evaluadores</h3>            
              <FormGroup action="" class="card card-body">  
                  <Row>            
                  <div class="form-group col-md-3">                      
                      <DatePicker
                        selected={this.props.fechPref}
                        minDate={new Date()}
                        onChange={(e)=> this.props.handleChange2(e,"fechPref")}
                        class="form-control"
                      />
                  </div>
                </Row>        
              </FormGroup><br/>
      </form>
    );
  }
}
export default StepThree;
