import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chip from '@material-ui/core/Chip';
import ArrayOfChips from './ArrayOfChips'

class CEvent_EvalPhase extends Component{    

    formComiteOrganizacional(props){
        return (
            <div>
                <h1>Comité Organizacional</h1>
                <Form>
                <br></br>
                <ArrayOfChips lista={props.comite1} handleadd={props.handleComiteadd}/> 
                </Form>
    </div>
        )
    }

    formComiteAcademico(props){
        return (
            <div>
                <h1>Comité Académico</h1>
                <Form>                                
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label> Presidente</Form.Label>                    
                    <Row>
                        <Col>
                            <Form.Control type="email" placeholder="Ingrese correo electronico" />
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Agregar</Button>                    
                        </Col>
                    </Row>
                    <br></br>
                                      
                </Form.Group>
                
                <Form.Group>
                <Form.Label>Criterio para evaluar preferencia de evaluadores:</Form.Label>
                <Col>
                    <Form.Check
                    type="radio" inline
                    label="Categorias"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                    />
                    <Form.Check
                    type="radio" inline
                    label="Propuestas"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                    />
                </Col>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label> Evaluadores</Form.Label>                    
                    <Row>
                        <Col>
                            <Form.Control type="email" placeholder="Ingrese correo electronico" />
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">Agregar</Button>                    
                        </Col>
                    </Row>
                    <br></br>                  
                </Form.Group>
                </Form>
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

export default CEvent_EvalPhase;