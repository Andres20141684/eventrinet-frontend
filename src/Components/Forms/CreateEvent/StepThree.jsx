import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import FormStepThree from './FormStepThree';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
    }

  componentWillMount(){
    this.setState({values:this.props.fases})
  }
  handleChange3(event,i,str) {
    let val = this.state.values;
    val[i][str] = event.target.value;
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

  addClick() {
    this.setState(prevState => ({
      values: [...prevState.values, {secuencia:this.state.values.length+1,camposPerson:[{}]}]
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
                    value={this.state.values[index]} 
                    index={index}
                    onChange={this.handleChange3}
                    handleChange4={this.handleChange4}/>
                </div>
          </div>
        ))}

        <input type="button" value="add more" onClick={() => this.addClick()} />   
        </div>
            
        <div class="cointainer p-4">
            <h1>Incluir Camera Ready</h1>
            <FormGroup action="" class="card card-body">
                <div class="form-group">                    
                <div>
                    <Form.Check
                        type="radio" inline
                        label="Si"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                    />
                    <Form.Check
                        type="radio" inline
                        label="No"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                    />
                </div>
                </div>
                <Row xs sm>
                    <Col> <label >Fecha Inicio: </label> </Col>
                    <Col> <DatePicker
                            selected={new Date()}
                            />
                    </Col>
                    <Col><label >Fecha Fin: </label> </Col>
                    <Col> <DatePicker
                            selected={new Date()}
                            />
                    </Col>
                    </Row>
            </FormGroup>
        </div>            
        <button class="btn btn-primary" type="submit" style={{float:'right'}}>Crear evento</button>
      </form>
    );
  }
}
export default StepThree;