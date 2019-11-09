import React, { Component } from 'react'
import '../../styles/styles'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { FormGroup } from '@material-ui/core';
import '../../styles/style_sheets.css'; 
import ModalPermisos from './ModalPermisos'

const Networking = require('../../Network/Networking') ;

class AdminPageMainTable extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idUser_recived:0,
            datos_tabla: {
                Organizadores:[
                ]
            },
            show:false,
            nameUserSelected:'',
            emailUserSelected:'',
            idUsarioSelected:0
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
    showModal = (evt,var_id,var_nomb,var_correo) => {
        this.setState({
            nameUserSelected:var_nomb,
            emailUserSelected:var_correo,
            idUsarioSelected:var_id
            
        })
                
        console.log("idUSUARIO !",this.state.idUsarioSelected)
      };
      
      componentDidMount(){      
        Networking.listarOrganizadores()
        .then((value) => {
            console.log("lista organ",value);
            if(value == null){
            console.log('no hay algo aun');
            }else {
            console.log('si hay algo:');
            console.log(value);
            this.setState({datos_tabla:value});
            }   
            
        });
   }
   handleClick = () => {
    console.log('this is:', this);
  }

   renderTableData() {
        return this.state.datos_tabla.Organizadores.map((element, index) => {
         const {correo,fechaFinPermiso,fechaIniPermiso, idPermisosEspeciales,idUsuario, nombComp} = element
            return (
            <tr >
                <td>{nombComp}</td>
                <td>{correo}</td>
                <td>{idUsuario}</td>                
                <td>{fechaFinPermiso}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Editar permisos" >
                    <button class="btn btn-primary btn-xs"
                            data-title="Edit" data-toggle="modal" data-target="#modalPerm" 
                            onClick={e => {
                                this.showModal(e,idUsuario,nombComp,correo);
                           }}
                             ><span class="glyphicon glyphicon-pencil"></span></button></p></td>
                <td><p data-placement="top" data-toggle="tooltip" title="Eliminar usuario"><button class="btn btn-danger btn-xs" data-title="Delete" data-toggle="modal" data-target="#delete" ><span class="glyphicon glyphicon-trash"></span></button></p></td> 
            </tr>
        )
        })
    }
    renderTableHeader() {
      return (
         <tr>
             <th width="35%">Nombre completo</th>
             <th width="27%">Correo</th>
             <th width="12%">Vigencia Inicio</th>
             <th width="12%">Vigencia Fin</th>
             <th width="7%">Editar</th>
             <th width="7%">Eliminar</th>
         </tr>

     )
     }
     
     render() {
        //this.state = this.props.data
        return (
        <div>
            <div class="modal fade" id="modalPerm" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <ModalPermisos 
                        idUsarioSelected={this.state.idUsarioSelected}
                        nameUserSelected={this.state.nameUserSelected}
                        emailUserSelected={this.state.emailUserSelected}
                    />
            </div>
            <div style={{marginLeft:15}}>
                <h1><br/>Otorgar permiso de crear evento</h1>
            </div>

            <div className="container">
            <div class="panel panel mypanel ">
                <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                    <h3>Lista de organizadores que pueden crear evento</h3>
                    
                </div>
                <br/>
                <input class="form-control" id="myInput" type="text" placeholder="Buscar.."/>
                <br/>
                <div  class="table-responsive">
                    <table class="table  table-hover" >
                    <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                    {this.renderTableHeader()}
                    </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>
                </div>
            </div>
            </div>
    </div>
        )
     }
}

export default AdminPageMainTable//exporting a component make it reusable and this is the beauty of react

