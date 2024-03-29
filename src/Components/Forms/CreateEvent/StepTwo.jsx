import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import Chip from '@material-ui/core/Chip';
import ArrayOfChips from './ArrayOfChips'
import '../../../styles/style_sheets.css'; 
import Searchable from './Searchable';

class StepTwo extends Component{    
    constructor(){
        super();
        this.state={
            auxPresi:'',
            auxComiteA:'',
            auxComiteO:'',
        }
        this.handleAuxChange=this.handleAuxChange.bind(this)
    }
    handleAuxChange(e,str){
        this.setState({
          [str]:e.target.value
        })
      }

    render(){
        return(        
            <div class="panel-group"style={styles.panel}>
                <div class="panel panel-default">
                <div class="panel-heading"><h1>Comité Organizacional</h1></div>
                <div class="panel-body">
                    <div class="form-group col">
                    <Searchable 
                    rol={this.props.rol}
                    auxLabel='auxComiteO'
                    aux={this.state.auxComiteO} 
                    handlechange={this.handleAuxChange} 
                    lista={this.props.comite1} 
                    handleadd={this.props.handleChange2} 
                    tag="comiteOrganizacional" 
                    label="correo"
                    options={this.props.options}/> 
                    </div>
                    {this.props.comite1.length===0?<span class="error" style={{float:'right'}}>*Minimo un usuario obligatorio</span>:<br></br>} 
                </div>
                </div>           
                <br></br>                   
                <div class="panel panel-default">
                <div class="panel-heading"><h1>Comité Académico</h1></div>
                <div class="panel-body"> 
                    <Row >
                        <div class="form-group col">
                            <label> Presidente</label>
                            <div style={{marginLeft: 13}}>
                            <Searchable 
                            rol={this.props.rol}
                            auxLabel='auxPresi'
                            aux={this.state.auxPresi} 
                            handlechange={this.handleAuxChange} 
                            lista={this.props.presidente} 
                            handleadd={this.props.handleChange2} 
                            tag="presidente" 
                            label="correo"
                            options={this.props.options}/>                          
                            </div>
                            {this.props.presidente.length===0?<span class="error" style={{float:'right'}}>*Minimo un usuario obligatorio</span>:<br></br>} 
                        </div>
                    </Row> 
                    
                    <Row>
                    <div class="form-group col">
                        <label> Criterio para evaluar preferencia de evaluadores:</label>
                        <div class="form-group col">                    
                        <div>
                            <Form.Check
                                type="radio" inline
                                checked={this.props.rdCategry}
                                label="Categorias"
                                name="formHorizontalRadios_1"
                                id="rdCategry"
                                onClick={(e)=>this.props.handleChangeRadio(e,"rdPropuest")}
                                disabled={this.props.rol===1}
                            />
                            <Form.Check
                                type="radio" inline
                                checked={this.props.rdPropuest}
                                label="Propuestas"
                                name="formHorizontalRadios_1"
                                id="rdPropuest"
                                onClick={(e)=>this.props.handleChangeRadio(e,"rdCategry")}
                                disabled={this.props.rol===1}
                            />
                        </div>
                    </div>
                    </div>
                    </Row>

                    <Row >
                        <div class="form-group col">
                            <label> Evaluadores</label>
                            <div style={{marginLeft: 13}}>
                            <Searchable 
                            rol={this.props.rol}
                            auxLabel='auxComiteA'
                            aux={this.state.auxComiteA} 
                            handlechange={this.handleAuxChange} 
                            lista={this.props.evaluadores} 
                            handleadd={this.props.handleChange2} 
                            tag="evaluadores" 
                            label="correo"
                            options={this.props.options}/>                         
                            </div>
                            {this.props.evaluadores.length===0?<span class="error" style={{float:'right'}}>*Minimo un usuario obligatorio</span>:<br></br>} 
                        </div>
                    </Row> 
                </div>
                </div>   
                <br></br>            
            </div>
        );
    }
}

export default StepTwo;

var styles = {
    rotulos:{
      paddingRight: 80,
    },
    panel:{
      margin:'auto',
      maxWidth:'620px',
      minWidth:'330px',
      paddingRight:'2%',
      paddingLeft:'2%',
    }
  }
  