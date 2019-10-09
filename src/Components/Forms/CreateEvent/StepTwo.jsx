import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import ArrayOfChips from './ArrayOfChips'
import '../../../styles/style_sheets.css'; 

class StepTwo extends Component{    

    formComiteOrganizacional(props){
        return (            
            <div class="panel panel-default">
            <div class="panel-heading"><h1>Comité Organizacional</h1></div>
            <div class="panel-body">
                <div class="form-group col-md-6">
                    <ArrayOfChips lista={props.comite1} handleadd={props.handleComiteadd}/> 
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
                        <ArrayOfChips lista={props.presidente} handleadd={props.handlePresidenteadd}/>                         
                        </div>
                    </div>
                </Row> 
                
                <Row>
                <div class="form-group col-md-6">
                    <label> Criterio para evaluar preferencia de evaluadores:</label>
                    <form >
                        <Form.Check
                            type="radio" inline
                            label="Categorias"
                            name="formHorizontalRadios"
                            id="rdCategry"
                            value={props.rdCategry}
                            onChange={props.handleChangeRadio}
                        />
                        <Form.Check
                            type="radio" inline
                            label="Propuestas"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            value={props.rdPropuest}
                            onChange={props.handleChangeRadio}
                        />
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