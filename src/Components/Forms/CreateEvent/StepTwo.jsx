import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chip from '@material-ui/core/Chip';

class CEvent_EvalPhase extends Component{    
    state = {
        msg: "NotConnected"
      }

    formComiteOrganizacional(){
        return (
            <div>
                <h1>Comité Organizacional</h1>
                <Form>
                <Row>
                    <Col>
                    <Form.Control placeholder="Ingrese correo electronico" />
                    </Col>
                    <Col>
                    <Button variant="primary" type="submit">Agregar</Button>
                    </Col>
                </Row>
                <br></br>
                <div >
                        <Chip label="a20143072@pucp.pe" onDelete={() => {}} />{' '}
                        <Chip label="a20143079@pucp.pe" onDelete={() => {}} />{' '}
                        <Chip label="a20143070@pucp.pe" onDelete={() => {}} />{' '}
                </div> 
                </Form>
    </div>
        )
    }

    formComiteAcademico(){
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
                    <div >
                        <Chip label="a20143072@pucp.pe" onDelete={() => {}} />{' '}
                    </div>
                                      
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
                    <div >
                        <Chip label="a20143072@pucp.pe" onDelete={() => {}} />{' '}
                        <Chip label="a20143079@pucp.pe" onDelete={() => {}} />{' '}
                        <Chip label="a20143070@pucp.pe" onDelete={() => {}} />{' '}
                    </div>                        
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
            <this.formComiteOrganizacional/>
            <br></br>
            </div>

            <div class="panel panel-default"> 
            <br></br>
            <this.formComiteAcademico />            
            <br></br>
            </div>            
        </div>
        );
    }
}

export default CEvent_EvalPhase;