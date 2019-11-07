import React, { Component } from 'react'
import { FormGroup } from '@material-ui/core';
import '../../styles/styles'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/style_sheets.css'; 
import ArrayOfChips from '../Forms/CreateEvent/ArrayOfChips';
const Networking = require('../../Network/Networking') ;


class FormularioPermiso extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idUser_recived:0,
            fechaFin:new Date(),
            fechaIni:new Date(),
            usuarios:[],
            auxUsuarios:'',
            datos_tabla: {
                Eventos:[        
                ]
            }
        }
        this.handleChangeDate=this.handleChangeDate.bind(this);
        this.handleAuxChange=this.handleAuxChange.bind(this)
    }

    handleChangeDate(value,label){
        this.setState({
            [label]:value
          })

    }
    handleChange2(value,label){
        this.setState({
          [label]:value
        })
      }

    handleAuxChange(e,str){
        this.setState({
          [str]:e.target.value
        })
        console.log(this.state)
      }
    
     render() {
        return (
            <div className="container">
            <div class="panel panel mypanel ">
                <Row>
                <div class="form-group col-md-6">
                    <label >Correo del usuario</label>
                    <ArrayOfChips 
                    auxLabel='auxUsuarios'
                    aux={this.state.auxUsuarios}
                    lista={this.state.usuarios} 
                    handlechange={this.handleAuxChange}
                    handleadd={this.handleChange2} 
                    tag="usuarios" 
                    label="descripcion"/>          
                </div>
                </Row>
                <FormGroup action="" class="card card-body" style={{border:"none"}}>
                <Row>            
                  <div class="form-group col-md-3 date" style={{paddingLeft:"0px"}}>
                        <label style={{paddingLeft:"15px"}}>Fecha Inicio&nbsp;&nbsp;</label>
                        <DatePicker                        
                            type="date"
                            id="input-date"
                            name="date_in"
                            minDate= {new Date()}
                            maxDate={this.state.fechaFin>this.state.fechaIni?this.state.fechaFin:null}
                            placeholder="date_in"
                            selected={this.state.fechaIni}
                            onChange={(e)=>this.handleChangeDate(e,"fechaIni")}
                            onKeyDown={this.onKeyDownDate}
                            className="form-control"
                        />
                  </div>
                  
                  <div class="form-group col-md-3 date" style={{paddingLeft:"0px"}}>
                      <label style={{paddingLeft:"15px"}}>Fecha Fin &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;</label>
                      <DatePicker
                        minDate= {new Date()}
                        type="date"
                        id="input-date"
                        name="date_in"
                        placeholder="date_in"
                        selected={this.state.fechaFin}
                        onChange={(e)=>this.handleChangeDate(e,"fechaFin")}
                        className="form-control"
                      />
                  </div>
                </Row>
                </FormGroup>
            </div>
            </div>
        )
     }
}




class FormOtorgarPermisos extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idUser_recived:0
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
    }

    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    
    render() {
        return (
        <div>
            <div>
                <div style={{marginLeft:15}} className="container">
                    <h1><br/>Otorgar permiso de crear evento</h1>
                </div>

                <div className="form-v5-content">
                    <FormularioPermiso />
                    <button className="btn btn-primary " style={{float:"right"}} >Guardar</button>
                </div>            
            </div>
            <br/><br/>
        </div>
        )
     }
}

export default FormOtorgarPermisos

