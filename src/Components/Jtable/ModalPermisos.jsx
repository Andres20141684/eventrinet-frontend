import React, { Component } from 'react'
import '../../styles/styles'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup } from '@material-ui/core';
import '../../styles/style_sheets.css'; 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const Networking = require('../../Network/Networking') ;

class FormularioPermiso extends Component {
    constructor(props){
        super(props);
    }
    onChageInput = (evt) => {
        this.setState({add_user: evt.target.value});
    } 
    
    DateFormat(date){
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
    }
    
    handleClickUpdatePermisos (){
        console.log("this.props nieto ",this.props)
        console.log("dateininSelected",this.props.dateIniSelected)
        console.log("dateFinSelected",this.props.dateFinSelected)
        
        let dataIni= this.DateFormat(this.props.dateIniSelected);
        let dataFin= this.DateFormat(this.props.dateFinSelected);
        console.log(" Datos a actulizar ",this.props.idUsuarioSelected," ",dataIni, " ",dataFin);
    
        Networking.crear_organizador(this.props.emailUserSelected, dataIni, dataFin).then(
            (response) => {
                if (response.succeed){                
                    console.log("Se agrego permiso",response);
                }else{
                    console.log("No se dio permiso");
                    console.log(response.message);                
                }
                this.props.myCallback();                
                console.log("this.props",this.props)
            }
        )
    }

     render() {        
        return (
            
            <div className="modal-body" style={{paddingBottom:'0px'}}>
                <div class="form-group row">
                    <label for="staticName" class="col-sm-4 col-form-label">Nombre completo</label>
                    <div class="col-sm-6">
                        <input type="text" readonly class="form-control-plaintext" id="staticName" value={this.props.nameUserSelected}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-4 col-form-label">Correo electronico</label>
                    <div class="col-sm-6">
                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value={this.props.emailUserSelected}/>
                    </div>
                </div>

                <FormGroup action=""  style={{border:"none"}}>                
                <Row>            
                  <div class="form-group  date" style={{paddingLeft:"0px"}}>
                        <label style={{paddingLeft:"15px"}}>Fecha Inicio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <DatePicker                        
                            type="date"
                            id="input-date"
                            name="date_in"
                            minDate= {new Date()}                            
                            placeholder="date_in"
                            selected={this.props.dateIniSelected}
                            onChange={(e)=> this.props.handleChangeDate(e,"dateIniSelected")}
                            onKeyDown={this.onKeyDownDate}
                            className="form-control"
                        />
                  </div>
                  
                  <div class="form-group date" style={{paddingLeft:"0px"}}>
                      <label style={{paddingLeft:"15px"}}>Fecha Fin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      <DatePicker
                        type="date"
                        id="input-date"
                        name="date_in"
                        minDate= {new Date()}
                        placeholder="date_in"
                        selected={this.props.dateFinSelected}
                        onChange={(e)=> this.props.handleChangeDate(e,"dateFinSelected")}
                        className="form-control"
                      />
                  </div>
                </Row>
                </FormGroup>                
                <div className="modal-footer" style={{paddingRight:"0px"}}>
                    <button type="button" onClick={(e)=>this.handleClickUpdatePermisos()} class="btn btn-primary"  data-dismiss="modal">Agregar</button>
                </div>
            
            </div>        
        )
     }
}
 

class ModalPermisos extends Component {    
    render(){           
        //console.log("Datos pasados")
        //console.log(this.props.idUsuarioSelected);
        //console.log(this.props.nameUserSelected);
        //console.log(this.props.emailUserSelected);
        //console.log("flag permiso",this.props.flagPermiso);
        //console.log("dateFinSelected",this.props.dateFinSelected)
        //console.log("dateIniSelected",this.props.dateIniSelected)
        console.log('this.props',this.props)
        return(
            
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={this.props.classNameModal}
                    open={this.props.open}
                    onClose={this.props.onClose}
                    closeAfterTransition
                    BackdropComponent={this.props.BackdropComponent}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                <Fade in={this.props.open}>
                <div className={this.props.classNamePaper}>
                    <h2 id="transition-modal-title">Transition modal</h2>
                    <p id="transition-modal-description">react-transition-group animates me.</p>
                </div>
                </Fade>
            </Modal>
                    <div class="modal-dialog modal-dialog-centered" role="document">{/*
                        <div class="modal-content" style={{paddingBottom:"0px",paddingRight:"5px",paddingTop:"0px"}}>
                        <div class="modal-header" style={{paddingBottom:"5px"}}>
                            <h3 style={{marginTop:"0px", marginBottom:"0px"}}>Agregar permiso para crear eventos</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <FormularioPermiso {...this.props}/> 
                    </div>*/}
                    </div>
            </div>
        )
    }
}
export default ModalPermisos//exporting a component make it reusable and this is the beauty of react

