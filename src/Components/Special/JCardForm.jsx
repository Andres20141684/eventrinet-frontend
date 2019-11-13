import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import JTable from '../Jtable/JTable';
import JUpload from './JUpload';
class JCardForm extends Component {
    constructor(props){
        super(props);
    }
    render(){
        console.log("renderin ****",this.props);
        const _inputs= [];
        this.props.arrayOfInputData.forEach(inputData => {
            {console.log("inputData",inputData)}
        if (inputData.category === 'textArea') {
            _inputs.push(
                <Row >
                    <div class="form-group col-md-12">
                    <div class ="col-md-2">
                        <label >{inputData.label}</label>
                        </div>
                        <div class ="col-md-10"><input 
                        type="text" 
                        class="form-control"
                        name={inputData.name}
                        id={inputData.id}
                        placeholder={inputData.placeholder}              
                        onChange={inputData.onChange}
                        autoFocus
                    /></div>
                    </div>
                </Row>
            );    
        } 
        if(inputData.category === 'comboBox'){
            _inputs.push(
            <Row>
              <div class="form-group col-md-12">
              <div class ="col-md-2"><label >{inputData.label}</label></div> 
              <div class ="col-md-10"><select 
                        name={inputData.name}
                        class="form-control" 
                        id={inputData.id}
                        onChange={inputData.onChange}>
                  
                    {inputData.options}
                </select>
              </div></div>
              </Row>
              ); 
        }
        if(inputData.category === 'Jtable'){
            {console.log("agregue una tabla")}
            _inputs.push(
            <Row>
              <div class="form-group col-md-12">
              <JTable
                    headers={inputData.headers}
                    body={inputData.body}
                />
                </div>
              </Row>
              ); 
        }
        if(inputData.category === 'textBox'){
            _inputs.push(
            <Row>
              <div class="form-group col-md-12">
              <label >{inputData.label}</label> 
              <textarea 
                    type="text" 
                    class="form-control"
                    name={inputData.name}
                    id={inputData.id}
                    placeholder={inputData.placeholder}              
                    onChange={inputData.onChange}
             
                    />
              </div>
              </Row>
            ); 
        }
        if(inputData.category === 'JUpload'){
            {console.log("agregue una JUpload")}
            _inputs.push(
            <Row>
              <div class="form-group col-md-12">
              <div class ="col-md-4"><label>Subir propuesta. El archivo debe 
                  estar en formato PDF (extension PDF)</label></div>
                  <div class ="col-md-8">
              
              <JUpload
                    id={inputData.id}
                    onSuccesLoad={inputData.onChange}
                />
                </div></div>
              </Row>
              ); 
        }
        
        });
        
        return(
            <div class="panel-group mx-auto" style={{width: "600px"}}>
                <div  class="panel panel-default">
                    <div class="panel-heading">
                        <h1>
                            {this.props.cardHeadingText}
                            <a href='' style={{marginRight:10,marginBottom:10,float:"right"}}></a>  
                        </h1>
                    </div>

                    <div class="panel-body">
                        {_inputs}
                    </div>
                </div>
            </div>
        );


    }
}
export default JCardForm;