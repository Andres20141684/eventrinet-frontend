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
  let val = [...this.state.values];
  val[i][str] = event.type==="checkBox"?event.target.checked:event.target.value
  console.log(val[i])
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
    values: [...prevState.values, {idFase:0,faseIni:'',faseFin:'',faseEvalIni:'',secuencia:this.state.values.length+1,camposPerson:[{idCamposPEnun:0,descripcion:'',enunciado:'',obli: false, obligatorio:0}],criterios:[{idCriterio:0,descripcion:'',enunciado:'',obli: false, obligatorio:0}],reqArch:false,reqEval:false,reqEnt:false,necesitaArchivo:0,necesitaEvaluacion:0,necesitaEntregable:0}]
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
      <div class="panel-group" style={styles.panel}>
        <div>
        {this.state.values.map((el, index) => (
          <div key={index} class="panel panel-default">
            <div class="panel-heading">
              <h1>Fase 0{index+1}
              <a  style={{marginRight:10,marginBottom:10,float:"right"}}>
              {index>0 && index===this.state.values.length-1?<input
                    type="button"
                    value="Eliminar fase"
                    className="btn btn-secondary"
                    onClick={() => this.removeClick(index)}
                    style={{float:'right'}}
                />:null}
                
              </a></h1>
            </div>
            <div class="panel-body">
              <div>
              <this.state.form_1 
                    numEval={this.props.evaluadores.length}
                    tamActual={this.state.values.length}
                    camposPerson="camposPerson"
                    criterios="criterios"
                    value={this.state.values[index]} 
                    index={index}
                    onChange={this.handleChange3}
                    handleChange4={this.handleChange4}
                    handleChangeFaseDate={this.handleChangeFaseDate}
                    handleCheck={this.handleCheck}
                    fechaAnt={index===0?null:this.state.values[index-1].faseFin==''?null:this.state.values[index-1].faseFin}
                    /*fechaPost={this.state.values.length-1===index?null:this.state.values[index-1].faseFin}*//>
                </div>
            </div> 
          </div>
        ))}        
                         
          <input type="button" style={{marginTop:'20px'}} class="btn btn-primary" value="Agregar fase" onClick={() => this.addClick()} />           
        </div>
            
            <br/>

            <div>
            <h3>Camera Ready</h3> 
            <div class="panel panel-default">  
            <div class="panel-body">   
            <div >
              <label>Requiere Camera Ready: &nbsp;&nbsp;</label>
              <input 
                type="checkbox" 
                checked={this.props.rdCamR}
                onClick={(e)=>this.props.handleCheckB(e,"rdCamR")}
                />
            </div>
            </div>
              {this.props.rdCamR===true?<FormGroup action="" class="card card-body">
                  <Row>            
                  <div class="form-group col-md-6">
                      <label >Fecha Inicio</label>
                      <DatePicker
                        type="date"
                        id="input-date"
                        name="date_in"
                        placeholder="date_in"
                        selected={this.props.fCRIni}
                        minDate={this.state.values.length===0?new Date():this.state.values[this.state.values.length-1].faseFin}
                        disabled={this.state.values[this.state.values.length-1].faseFin===''?true:false}
                        //minDate={new Date(this.state.values[this.state.values.length-1].faseFin).setDate(this.state.values[this.state.values.length-1].faseFin.getDate() + 1)}
                        //maxDate={this.props.fechaIE}
                        maxDate={this.props.fCRFin!==''?this.props.fCRFin:this.props.fechaIE}
                        onChange={(e)=> this.props.handleChange2(e,"fCRIni")}
                        class="form-control"
                        
                      />
                  </div>
                  <div class="form-group col-md-5">
                      <label >Fecha Fin</label>
                      <DatePicker
                        type="date"
                        id="input-date"
                        name="date_in"
                        placeholder="date_in"
                        selected={this.props.fCRFin}
                        disabled={this.props.fCRIni===''?true:false}
                        minDate={this.props.fCRIni}
                        //minDate={this.props.fCRIni}
                        //maxDate={this.props.fechaIE}
                        onChange={(e)=> this.props.handleChange2(e,"fCRFin")}
                        
                      />
                  </div>
                </Row>
                                  
              </FormGroup>:null}
              
            </div>
            </div>
            {/*<div>
              <h3>Fecha de realizacion del evento: </h3>
              <div class="panel panel-default">
                <div class="panel-body">
                  
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
            </div>*/}

            <h3>Fecha límite de elección de preferencias para los evaluadores</h3>            
              <FormGroup class="card card-body">  
                  <Row>            
                  <div class="form-group col-md-6">                      
                      <DatePicker
                        type="date"
                        id="input-date"
                        name="date_in"
                        placeholder="date_in"
                        selected={this.props.fechPref}
                        minDate={this.state.values[0].faseFin===''?new Date():new Date(this.state.values[0].faseFin).setDate(this.state.values[0].faseFin.getDate() + 1)}
                        maxDate={this.props.fechaIE}
                        disabled={this.state.values[0].faseFin===''?true:false}
                        readOnly={this.props.fechPref===''?false:this.props.fechPref<new Date()?true:false}
                        onChange={(e)=> this.props.handleChange2(e,"fechPref")}
                      />
                  </div>
                </Row>        
              </FormGroup><br/>
      </div>
    );
  }
}
export default StepThree;

var styles = {
  rotulos:{
    paddingRight: 80,
  },
  panel:{
    margin:'auto',
    maxWidth:'620px',
    minWidth:'330px',
    paddingRight:'2%',
    paddingLeft:'2%',
  }
}
