import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import FormStepThree from './FormStepThree';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { throwStatement } from '@babel/types';

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
    let aux=date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() 
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
      values: [...prevState.values, {secuencia:this.state.values.length+1,camposPerson:[],criterios:[],reqArch:false,reqEval:false}]
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

  render() {
    return (
      <form method="Post">
        <div>
        {this.state.values.map((el, index) => (
          <div key={index} class="panel panel-default">
                <h1>Fase 0{index+1} </h1>  
                <div>
                {index===this.state.values.length-1?<input
                    type="button"
                    value="remove"
                    onClick={() => this.removeClick(index)}
                    style={{float:'right'}}
                />:null}
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
        ))}

        <input type="button" value="add more" onClick={() => this.addClick()} />   
        </div>
            
        <div class="cointainer p-4">
            <h1>Camera Ready</h1>
            <FormGroup action="" class="card card-body">
                <div class="form-group">                    
                <Row>
                  <Col><label >Requiere:</label> </Col>
                  <Col><input
                                type="checkBox" 
                                checked={this.props.rdCamR}
                                onClick={(e)=>this.props.handleCheckB(e,"rdCamR")}
                            /></Col>
                    
                </Row>
                </div>
                {this.props.rdCamR===true?<Row xs sm>
                    <Col> <label >Fecha Inicio: </label> </Col>
                    <Col> <DatePicker
                            selected={this.props.fCRIni}
                            minDate={new Date()}
                            onChange={(e)=> this.props.handleChange2(e,"fCRIni")}
                            />
                    </Col>
                    <Col><label >Fecha Fin: </label> </Col>
                    <Col> <DatePicker
                            selected={this.props.fCRFin}
                            minDate={new Date()}
                            onChange={(e)=> this.props.handleChange2(e,"fCRFin")}
                            />
                    </Col>
                    </Row>:null}
                
            </FormGroup>
        </div>  
        <div>
        <Col><label >Fecha máxima para elegir preferencia el evaluador::</label> </Col>
        <Col> <DatePicker
                            selected={this.props.fechPref}
                            minDate={new Date()}
                            onChange={(e)=> this.props.handleChange2(e,"fechPref")}
                            />
                    </Col>
          </div>          
      </form>
    );
  }
}
export default StepThree;