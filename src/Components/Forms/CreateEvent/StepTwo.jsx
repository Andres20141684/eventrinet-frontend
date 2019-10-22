import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Chip from '@material-ui/core/Chip';
import ArrayOfChips from './ArrayOfChips'
import '../../../styles/style_sheets.css'; 

class StepTwo extends Component{    

    formComiteOrganizacional(props){
        return (            
            <div class="panel panel-default">
            <div class="panel-heading"><h1>Comité Organizacional</h1></div>
            <div class="panel-body">
                <div class="form-group col-md-6">
                <ArrayOfChips lista={props.comite1} handleadd={props.handleChange2} tag="comiteOrganizacional" label="correo"/> 
                </div>
            </div>
            </div>
        )
    }

    formComiteAcademico(props){
        return (            
            <div class="panel panel-default">
            <div class="panel-heading"><h1>Comité Académico</h1></div>
            <div class="panel-body"> 
                <Row >
                    <div class="form-group col-md-6">
                        <label> Presidente</label>
                        <div style={{marginLeft: 13}}>
                        <ArrayOfChips lista={props.presidente} handleadd={props.handleChange2} tag="presidente" label="correo"/>                          
                        </div>
                    </div>
                </Row> 
                
                <Row>
                <div class="form-group col-md-6">
                    <label> Criterio para evaluar preferencia de evaluadores:</label>
                    <div class="form-group col-md-6">                    
                    <div>
                        <Form.Check
                            type="radio" inline
                            checked={props.rdCategry}
                            label="Categorias"
                            name="formHorizontalRadios_1"
                            id="rdCategry"
                            onClick={(e)=>props.handleChangeRadio(e,"rdPropuest")}
                        />
                        <Form.Check
                            type="radio" inline
                            checked={props.rdPropuest}
                            label="Propuestas"
                            name="formHorizontalRadios_1"
                            id="rdPropuest"
                            onClick={(e)=>props.handleChangeRadio(e,"rdCategry")}
                        />
                    </div>
                </div>
                </div>
                </Row>

                <Row >
                    <div class="form-group col-md-6">
                        <label> Evaluadores</label>
                        <div style={{marginLeft: 13}}>
                        <ArrayOfChips lista={props.evaluadores} handleadd={props.handleChange2} tag="evaluadores" label="correo"/>                         
                        </div>
                    </div>
                </Row> 
            </div>
            </div>
        )
    }

    render(){
        return(        
            <div class="panel-group">
                <this.formComiteOrganizacional {...this.props}/>            
                <br></br>
                <this.formComiteAcademico {...this.props}/>       
                <br></br>            
            </div>
        );
    }
}

export default StepTwo;