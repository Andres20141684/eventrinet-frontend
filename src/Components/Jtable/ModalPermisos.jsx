import React, { Component } from 'react'
import '../../styles/styles'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup } from '@material-ui/core';
import '../../styles/style_sheets.css'; 
import ArrayOfChips from '../Forms/CreateEvent/ArrayOfChips';
import ActionButton from './ActionButton';
import FormOtorgarPermisos from './FormOtorgarPermisos'

const Networking = require('../../Network/Networking') ;

class FormularioPermiso extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idUser_recived:0,
            fechaFin:new Date(),
            fechaIni:new Date(),
            add_user:"",
        }
        this.handleChangeDate=this.handleChangeDate.bind(this);
        
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
    onChageInput = (evt) => {
        this.setState({add_user: evt.target.value});
    }
    DateFormat(date){
         return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
    }
    handleClickAdd = () => {
        let dataIni= this.DateFormat(this.state.fechaIni);
        let dataFin= this.DateFormat(this.state.fechaFin);
        console.log(" Datos a enviar",this.state.add_user," ",dataIni, " ",dataFin);
       
        Networking.crear_organizador(this.state.add_user, dataIni, dataFin).then(
            (response) => {
              console.log(response);
              console.log("Data del json",response);
              if (response.succeed){                
                console.log("Se agrego permiso",response);
              }else{
                console.log("No se dio permiso");
                console.log(response.message);                
              }
            }
          )

    }
    
     render() {

        return (
            <div className="modal-body">
                <FormGroup  style={{border:"none"}} >
                <Row>
                <div className="form-group ">
                    Nombre completo
                    <input type="text" class="form-control" value={this.state.nameUserSelected}/>
                </div>
                </Row>
                <Row>
                <div className="form-group ">
                    Correo electrónico
                    <input type="text" class="form-control" value={this.state.emailUserSelected}/>
                </div>
                </Row>
                </FormGroup>
                <FormGroup action=""  style={{border:"none"}}>                
                <Row>            
                  <div class="form-group  date" style={{paddingLeft:"0px"}}>
                        <label style={{paddingLeft:"15px"}}>Fecha Inicio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
                  
                  <div class="form-group date" style={{paddingLeft:"0px"}}>
                      <label style={{paddingLeft:"15px"}}>Fecha Fin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
                <div className="modal-footer" style={{paddingRight:"0px"}}>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button type="button" onClick={this.handleClickAdd} class="btn btn-primary">Agregar</button>
                </div>
            
            </div>        
        )
     }
}


class ModalPermisos extends Component {
    /*
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idUser_recived:0,
            show: false,
            idUser: -1,
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
    }*/
    render(){        
        console.log(this.props.show);
        console.log("Datos pasados")
        console.log(this.props.idUsarioSelected);
        console.log(this.props.nameUserSelected);
        console.log(this.props.emailUserSelected);
        if(this.props.show == false){
            return null;
        }
        return(
            
            <div>
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content" style={{paddingBottom:"0px",paddingRight:"5px"}}>
                        <div class="modal-header" >
                            <h3 style={{marginTop:"0px", marginBottom:"0px"}}>Agregar permiso de organizador</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <FormularioPermiso 
                        idUsarioSelected={this.state.idUsarioSelected}
                        nameUserSelected={this.state.nameUserSelected}
                        emailUserSelected={this.state.emailUserSelected}/>                        
                        </div>
                    </div>
            </div>
        )
    }
}
export default ModalPermisos//exporting a component make it reusable and this is the beauty of react

