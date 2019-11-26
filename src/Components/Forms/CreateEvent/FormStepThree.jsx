import React, { Component } from 'react';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import '../../../styles/style_sheets.css';
import Col from 'react-bootstrap/Col';
import ArrayDinamic from './ArrayDinamic';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

class FormStepThree extends Component{
    constructor(){
        super();
        this.handleValNum=this.handleValNum.bind(this)
    }
    handleValNum(e){
        console.log(parseInt(e.target.value))
        console.log(this.props.value.numEvaluadores)
        if(parseInt(e.target.value)<=this.props.numEval && parseInt(e.target.value)>0){
            this.props.onChange(e,this.props.index,"numEvaluadores")
        }else{
            this.props.onChange({target:{value:''}},this.props.index,"numEvaluadores")
        }
    } 
    render(){
        return(
            <div clas="panel-group" style={styles.panel}>
                
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                
                <h3>Detalles Generales</h3>
                <div class="panel panel-default">                
                <div class="panel-body">
                <Row >
                <div class="form-group col-md">
                    <label >Actividad</label>
                    <input readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false} 
                    type="text" class="form-control" name="actividad" id="actvidad" maxLength="200" placeholder="Actividad" onChange={(e) => this.props.onChange(e,this.props.index,"nombre")} value={this.props.value.nombre}autoFocus required />
                    {this.props.value.nombre===''?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>}  
                </div>
                </Row>
                
                <Row>
                <div class="form-group col-md">
                    <label>Descripcion</label>
                    <textarea 
                        type="text" 
                        name='descripcion'
                        class="form-control" 
                        id="id_description_fase"
                        placeholder='Descripcion'                  
                        onChange={(e) => this.props.onChange(e,this.props.index,"descripcion")} value={this.props.value.descripcion}
                        maxLength="200" 
                        readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}        
                        />
                    {this.props.value.descripcion===''?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>} 
                </div>
                </Row>
                <Row>            
                <div class="form-group col-md-6">
                    <label >Fecha Inicio:</label>
                    <DatePicker
                      type="date"
                      id="input-date"
                      name="date_in"
                      placeholder="date_in"
                      selected={this.props.value.faseIni}
                      minDate={this.props.fechaAnt===null?new Date():this.props.fechaAnt}
                      maxDate={this.props.value.faseFin!==''?this.props.value.faseFin:null}
                      disabled={this.props.index!==0?this.props.fechaAnt===null?true:false:false}
                      readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                      //minDate={this.props.index===0?new Date():new Date(this.props.fechaAnt).setDate(this.props.fechaAnt.getDate() + 1)}
                      //maxDate={this.props.tamActual-1===this.props.index?null:this.props.fechaPost}
                      onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseIni","fechaFaseIni")}
                    />
                </div>
                <div class="form-group col-md-5">
                    <label >Fecha Fin:</label>
                    <DatePicker
                      type="date"
                      id="input-date"
                      name="date_in"
                      placeholder="date_in"
                      selected={this.props.value.faseFin}
                      minDate={this.props.value.faseIni}
                      disabled={this.props.value.faseIni===''?true:false}
                      readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                      //maxDate={this.props.fechaMax}
                      onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseFin","fechaFaseFin")}
                    />
                </div>
              </Row>
              {this.props.value.faseFin===''?<span class="error" style={{float:'right'}}>*Campo Obligatorio</span>:<br></br>} 
                <Row>                
                <div class="form-group col-md">
                    <div class="form-group col-md" style={{paddingLeft:'0px'}}>
                        <label>Requiere adjuntar Paper (.pdf)  &nbsp;&nbsp;</label>
                        <input
                            disabled={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                            type="checkBox" 
                            name="formHorizontalRadios_1"
                            id="formHorizontalRadios1"
                            checked={this.props.value.reqArch}
                            onClick={(e) => this.props.handleCheck(e,this.props.index,"reqArch","necesitaArchivo")}
                        />
                    </div>
                    <div class="form-group col-md" style={{paddingLeft:'0px'}}>
                        <label>Requiere adjuntar entregable adicional(.pdf)  &nbsp;&nbsp;</label>
                        <input
                            disabled={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                            type="checkBox" 
                            name="formHorizontalRadios_1"
                            id="formHorizontalRadios1"
                            checked={this.props.value.reqEnt}
                            onClick={(e) => this.props.handleCheck(e,this.props.index,"reqEnt","necesitaEntregable")}
                        />
                    </div>
                    <span class='error'>*En caso se requiera de este segundo archivo se debera especifar en la descripcion su contenido </span>
                </div>
                </Row>
                </div>
                </div> 
                {this.props.index===0?null
                :
                <div>                  
                    <div>
                        <h3>Evaluacion</h3>
                            <div class="panel panel-default">    
                            <div class="panel-body">
                            <Row >
                            <div class="form-group col-md">
                                <label for="title">Requiere de Evaluacion: &nbsp;&nbsp;</label>
                                <input
                                    disabled={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                                    type="checkBox" 
                                    checked={this.props.value.reqEval}
                                    onClick={(e) => this.props.handleCheck(e,this.props.index,"reqEval","necesitaEvaluacion")}
                                />
                            </div>
                            </Row>
                            <Row>
                            <div class="form-group col-md">    
                                <div>
                                {this.props.value.reqEval===true?
                                    <div>
                                        <Row>
                                        <div class="form-group col-md-7">
                                            <label >Fecha Evaluacion Inicial de Evaluador:</label>
                                            <DatePicker
                                            readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                                            type="date"
                                            id="input-date"
                                            name="date_in"
                                            placeholder="date_in"
                                            selected={this.props.value.faseEvalIni}
                                            minDate={this.props.value.faseIni}
                                            maxDate={this.props.value.faseFin}
                                            //maxDate={this.props.fechaMax}
                                            onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseEvalIni","fechaEvalIni")}
                                            />
                                        </div>
                                        </Row>
                                        <Row>
                                        <div class="form-group col-md-7">
                                            <label >Fecha Evaluacion Inicial de Presidente:</label>
                                            <DatePicker
                                            readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                                            type="date"
                                            id="input-date"
                                            name="date_in"
                                            placeholder="date_in"
                                            selected={this.props.value.faseEvalPresiIni}
                                            disabled={this.props.value.faseEvalIni===''?true:false}
                                            minDate={this.props.value.faseIni}
                                            maxDate={this.props.value.faseFin}
                                            //maxDate={this.props.fechaMax}
                                            onChange={(e)=> this.props.handleChangeFaseDate(e,this.props.index,"faseEvalPresiIni","fechaEvalPresiIni")}
                                            />
                                        </div>
                                        </Row>
                                        <Row>
                                        <div class="form-group col-md">
                                            <label >Numero de evaluadores: (max {this.props.numEval})</label>
                                            <input 
                                            readOnly={this.props.value.faseFin===''?false:this.props.value.faseFin<new Date()?true:false}
                                            style={{display:'inline-block'}}
                                            type="number" 
                                            name='nombre'
                                            class="form-control" 
                                            id="id_name_fase"       
                                            onChange={this.handleValNum}
                                            value={this.props.value.numEvaluadores}
                                            disabled={this.props.numEval===0?true:false}
                                            />
                                    </div>
                                    </Row>
                                    <ArrayDinamic 
                                    id='idCriterio'
                                    type='Criterio'
                                    campo={this.props.criterios}
                                    value={this.props.value} 
                                    index={this.props.index}
                                    handleChange4={this.props.handleChange4}
                                    handleCheck={this.props.handleCheck}/>
                                    </div>
                                    :null}
                                
                                </div> 
                            </div>
                            </Row>
                            </div>
                            </div> 
                    </div>
                </div>     
                }     

                <h3>Campos personalizados</h3>
                <div class="panel panel-default">
                <div class="panel-body">
                <Row >
                    <div class="form-group col-md-12">
                        <div class="input-group mb-6">
                            <ArrayDinamic 
                            id='idCamposPEnun'
                            type='Campo Personalizado'
                            campo={this.props.camposPerson}
                            value={this.props.value} 
                            index={this.props.index}
                            handleChange4={this.props.handleChange4}
                            handleCheck={this.props.handleCheck}/>
                        </div>
                    </div>
                </Row>
                </div>
                </div>
        </div>)
    }
}
export default FormStepThree;

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
  