import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import FormStepThree from './FormStepThree';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ArrayDinamics extends Component{
    constructor(){
        super();
        this.state={
          array: [{ }],
          size:0,
        }
      }
      componentWillMount(){
        this.setState({array:this.props.value[this.props.campo]})
      }

      addClick() {
        this.setState(prevState => ({
            array: [...prevState.array, {}],
            size:this.state.size+1
        }));
      }


      handleChange5(event,i,str) {
        let val = this.state.array;
        val[i][str] = event.target.value;
        this.setState({ values:val });
        this.props.handleChange4(this.state.array,this.props.index,this.props.campo)
        console.log(this.state)
      }
      handleCheckBox(event,i,str,str2){
        let val = this.state.array;
        val[i][str]=!val[i][str];
        val[i][str2]=val[i][str]===true?1:0
        this.setState({ values:val });
        this.props.handleChange4(this.state.array,this.props.index,this.props.campo)
        console.log(this.state)
      }

      removeClick() {
        let values = [...this.state.array];
        values.splice(this.state.array.length-1, 1);
        this.setState({ array:values, size:this.state.size-1 });
        this.props.handleChange4(values,this.props.index,this.props.campo)
      }

      render(){
          return(
              <div>
                  {this.state.array.map((value, index) => (
                      <div>
                          <br/>
                          <Row>
                              <Col>
                                <label for="title">Enunciado</label>
                                </Col>
                                <Col>
                                <input type="text" onChange={(e)=>this.handleChange5(e,index,"enunciado")} value={this.state.array[index].enunciado}/>
                                </Col> 
                          </Row>
                          <Row>
                              <Col>
                                <label for="title">Descripcion</label>
                                </Col>
                                <Col>
                                <input type="text" onChange={(e)=>this.handleChange5(e,index,"descripcion")} value={this.state.array[index].descripcion}/>
                              </Col>
                          </Row>
                          <Row>
                          <Col>
                                <Col>
                                <label for="title">Obligatorio</label>
                                </Col>
                                <input type="checkbox" onClick={(e)=>this.handleCheckBox(e,index,"obli","obligatorio")} checked={this.state.array[index].obli}>
                                </input></Col>
                          </Row>
                          <br/> 
                      </div>
                  ))}
                  <Row>
                      <Col>
                      <input type="button" value="add more" onClick={() => this.addClick()} /> 
                      </Col>
                      <Col>
                      {this.state.array.length===0?null:<input type="button" value="delete" onClick={() => this.removeClick()} />} 
                      </Col>
                  </Row>
                  

              </div>
          )
      }


}
export default ArrayDinamics;