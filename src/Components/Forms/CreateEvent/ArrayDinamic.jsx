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
          array: [{descripcion:'',enunciado:'',obli: false, obligatorio:0}],
          size:0,
        }
      }
      componentWillMount(){
        this.setState({array:this.props.value[this.props.campo]})
      }

      addClick() {
        this.setState(prevState => ({
            array: [...prevState.array, {[this.props.id]:0,descripcion:'',enunciado:'',obli: false, obligatorio:0}],
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
                          <Row>
                          <div class="form-group col-md">
                                <label for="title">{this.props.type} {index+1}</label>
                                <input readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false} class="form-control" type="text" maxLength="200" onChange={(e)=>this.handleChange5(e,index,"enunciado")} value={this.state.array[index].enunciado}/>
                          </div>
                            {this.props.type==='Criterio'?null:
                            <div  class="form-group col-md">
                                <label for="title">Descripcion</label>                                
                                <input readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false} class="form-control" type="text" maxLength="200"  onChange={(e)=>this.handleChange5(e,index,"descripcion")} value={this.state.array[index].descripcion}/>
                            </div>}
                            {this.props.type==='Criterio'?null:
                              <div class="form-group col-md-3" >
                            <label for="title">Obligatorio </label>
                            <input  disabled={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false} type="checkbox" onClick={(e)=>this.handleCheckBox(e,index,"obli","obligatorio")} checked={this.state.array[index].obli}>
                            </input>
                            </div> 
                            }
                              
                          </Row>
                      </div>
                  ))}
                  <Row>
                      <Col>
                      {this.state.array.length===1?null:<input  disabled={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false} style={{float:'left',paddingLeft:'40px',paddingRight:'40px'}}className="btn btn-secondary" type="button" value="-" onClick={() => this.removeClick()} />} 
                      </Col>
                      <Col>
                      <input disabled={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false} class="btn btn-primary"type="button" style={{float:'right',paddingLeft:'40px',paddingRight:'40px'}} value="+" onClick={() => this.addClick()} /> 
                      </Col>
                  </Row>
                  

              </div>
          )
      }


}
export default ArrayDinamics;