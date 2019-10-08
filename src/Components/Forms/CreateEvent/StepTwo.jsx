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
            <div class="panel-group">
                <div class="panel panel-default">
                <div class="panel-heading"><h1>Comité Organizacional</h1></div>
                <div class="panel-body">
                    <div class="form-group col-md-6">
                        <ArrayOfChips lista={props.comite1} handleadd={props.handleComiteadd}/> 
                    </div>
                </div>
                </div>
            </div>    
        )
    }

    formComiteAcademico(props){
        return (
            <div class="panel-group">
                <div class="panel panel-default">
                <div class="panel-heading"><h1>Comité Académico</h1></div>
                <div class="panel-body"> 
                    <Row >
                        <div class="form-group col-md-6">
                            <label> Presidente</label>
                            <div style={{marginLeft: 13}}>
                            <ArrayOfChips lista={props.presidente} handleadd={props.handlePresidenteadd}/>                         
                            </div>
                        </div>
                    </Row> 
                    
                    <Row>
                    <div class="form-group col-md-6">
                        <label> Criterio para evaluar preferencia de evaluadores:</label>
                        <form >
                            <div class="form-check-inline">
                            <label class="form-check-label" for="radio1" style={{float:"left"}}/> 
                            <input
                                checked={props.rdCategry}
                                type="radio" 
                                name="formHorizontalRadios"
                                id="rdCategry"
                                onChange={props.handleChangeRadio}
                                />Categorias 
                            </div>
                            <div class="form-check-inline">
                            <label class="form-check-label" for="radio2" style={{float:"right"}}/>
                            <input
                                checked={props.rdPropuest}
                                type="radio" 
                                name="formHorizontalRadios"
                                id="rdPropuest"
                                onChange={props.handleChangeRadio}
                            />Propuestas
                            </div>                            
                        </form>
                    </div>
                    </Row>

                    <Row >
                        <div class="form-group col-md-6">
                            <label> Presidente</label>
                            <div style={{marginLeft: 13}}>
                            <ArrayOfChips lista={props.evaluadores} handleadd={props.handleEvaluadoradd}/>                         
                            </div>
                        </div>
                    </Row> 
                </div>
                </div>
            </div>
        )
    }

    render(){
        return(
        <div> 
            <this.formComiteOrganizacional {...this.props}/>            
            <br></br>
            <this.formComiteAcademico {...this.props}/>       
            <br></br>            
        </div>
        );
    }
}

export default StepTwo;