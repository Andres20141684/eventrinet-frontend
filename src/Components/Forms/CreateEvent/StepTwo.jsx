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
            <div>
                <Container>
                <h1>Comité Organizacional</h1>
                <Form>
                <br></br>
                <ArrayOfChips lista={props.comite1} handleadd={props.handleChange2} tag="comite1"/> 
                </Form>
                </Container>
                
    </div>
        )
    }

    formComiteAcademico(props){
        return (
            <div>
                <Container>
                <h1>Comité Académico</h1>
                <Form>                                
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label> Presidente</Form.Label>                    
                    <br></br>
                    <ArrayOfChips lista={props.presidente} handleadd={props.handleChange2} tag="presidente"/> 
                    <br></br>
                                      
                </Form.Group>
                
                <Form.Group>
                <br></br>    
                <Form.Label>Criterio para evaluar preferencia de evaluadores:</Form.Label>
                <br></br>
                <Col>
                    <input
                    checked={props.rdCategry}
                    type="radio" inline
                    name="formHorizontalRadios"
                    id="rdCategry"
                    onChange={(e)=>props.handleChangeRadio(e,"rdPropuest")}
                    />Categorias
                    <input
                    checked={props.rdPropuest}
                    type="radio" inline
                    name="formHorizontalRadios"
                    id="rdPropuest"
                    onChange={(e)=>props.handleChangeRadio(e,"rdCategry")}
                    />Propuestas
                </Col>
                <br></br>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label> Evaluadores</Form.Label>
                    <br></br>    
                    <ArrayOfChips lista={props.evaluadores} handleadd={props.handleChange2} tag="evaluadores"/> 
                    <br></br>                  
                </Form.Group>
                </Form>
                </Container>  
    </div>
        )
    }

    render(){
        return(
        <div> 
            <div class="panel panel-default">
            <br></br>
            <this.formComiteOrganizacional {...this.props}/>
            <br></br>
            </div>

            <div class="panel panel-default"> 
            <br></br>
            <this.formComiteAcademico {...this.props}/>            
            <br></br>
            </div>            
        </div>
        );
    }
}

export default StepTwo;