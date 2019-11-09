import React, { Component } from 'react'
import '../../styles/styles'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup } from '@material-ui/core';
import '../../styles/style_sheets.css'; 

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
       
        Networking.crear_organizador(this.props.emailUserSelected, dataIni, dataFin).then(
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
            <div className="modal-body" style={{paddingBottom:'0px'}}>
                <div class="form-group row">
                    <label for="staticName" class="col-sm-4 col-form-label">Nombre completo</label>
                    <div class="col-sm-6">
                        <input type="text" readonly class="form-control" id="staticName" value={this.props.nameUserSelected}/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="staticEmail" class="col-sm-4 col-form-label">Correo electronico</label>
                    <div class="col-sm-6">
                        <input type="text" readonly class="form-control" id="staticEmail" value={this.props.emailUserSelected}/>
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
                            maxDate={this.state.fechaFin>this.state.fechaIni?this.state.fechaFin:null}
                            placeholder="date_in"
                            selected={this.state.fechaIni}
                            onChange={(e)=>this.handleChangeDate(e,"fechaIni")}
                            onKeyDown={this.onKeyDownDate}
                            className="form-control"
                        />
                  </div>
                  
                  <div class="form-group date" style={{paddingLeft:"0px"}}>
                      <label style={{paddingLeft:"15px"}}>Fecha Fin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
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
                    <button type="button" onClick={this.handleClickAdd} class="btn btn-primary"  data-dismiss="modal">Agregar</button>
                </div>
            
            </div>        
        )
     }
}


class ModalPermisos extends Component {
    render(){        
        console.log(this.props.show);
        console.log("Datos pasados")
        console.log(this.props.idUsuarioSelected);
        console.log(this.props.nameUserSelected);
        console.log(this.props.emailUserSelected);
        if(this.props.show == false){
            return null;
        }
        return(
            
            <div>
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content" style={{paddingBottom:"0px",paddingRight:"5px",paddingTop:"0px"}}>
                        <div class="modal-header" style={{paddingBottom:"5px"}}>
                            <h3 style={{marginTop:"0px", marginBottom:"0px"}}>Agregar permiso de organizador</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <FormularioPermiso 
                        idUsuarioSelected={this.props.idUsuarioSelected}
                        nameUserSelected={this.props.nameUserSelected}
                        emailUserSelected={this.props.emailUserSelected}/>                        
                        </div>
                    </div>
            </div>
        )
    }
}
export default ModalPermisos//exporting a component make it reusable and this is the beauty of react

