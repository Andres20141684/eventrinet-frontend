import React, { Component } from 'react'
import '../../styles/styles'
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/style_sheets.css'; 
import ModalPermisos from './ModalPermisos';
import $ from 'jquery'

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
            idUsuarioSelected:0,
            dateIniSelected:[],
            dateFinSelected:[]

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
    showModal = (evt,var_id,var_nomb,var_correo,var_fechaIni,var_fechaFin) => {
        let yyIni=var_fechaIni.substr(0,4); let yyFin=var_fechaFin.substr(0,4);
        let mmIni=var_fechaIni.substr(8,2); let mmFin=var_fechaFin.substr(8,2);
        let ddIni=var_fechaIni.substr(5,2); let ddFin=var_fechaFin.substr(5,2);

        this.setState({
            nameUserSelected:var_nomb,
            emailUserSelected:var_correo,
            idUsuarioSelected:var_id,
            dateIniSelected:[parseInt(yyIni),parseInt(mmIni),parseInt(ddIni)],
            dateFinSelected: [parseInt(yyFin),parseInt(mmFin),parseInt(ddFin)]
        })
                
        console.log("idUSUARIO !",this.state.idUsuarioSelected)
        let aux= new Date(2018, 9,11)
        console.log("fehca",aux)
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
                <td>{fechaIniPermiso}</td>                
                <td>{fechaFinPermiso}</td>
                <td><p data-placement="top" data-toggle="tooltip" title="Editar permisos" >
                    <button class="btn btn-primary btn-xs"
                            data-title="Edit" data-toggle="modal" data-target="#modalPerm" 
                            onClick={e => {
                                this.showModal(e,idUsuario,nombComp,correo,fechaIniPermiso,fechaFinPermiso);
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
             <th width="30%">Nombre completo</th>
             <th width="25%">Correo</th>
             <th width="10">Organizador</th>
             <th width="11%">Vigencia Inicio</th>
             <th width="11%">Vigencia Fin</th>
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
                        idUsuarioSelected={this.state.idUsuarioSelected}
                        nameUserSelected={this.state.nameUserSelected}
                        emailUserSelected={this.state.emailUserSelected}
                        dateFinSelected={this.state.dateFinSelected}
                        dateIniSelected={this.state.dateIniSelected}
                    />
            </div>
            <div style={{marginLeft:15}}>
                <h1><br/>Otorgar permiso de crear evento</h1>
            </div>

            <div className="container">
            <div class="panel panel mypanel ">
                <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                    <h3>Lista de usuarios</h3>
                    
                </div>
                <br/>
                <input class="form-control" id="myInput" type="text" placeholder="Buscar.."/>
                <br/>
                <div  class="table-responsive">
                    <table class="table  table-hover table-list-search" >
                    <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                    {this.renderTableHeader()}
                    </thead>
                        <tbody>{this.renderTableData()}</tbody>
                    </table>
                </div>
            </div>
            </div>
            <br/>
    </div>
        )
     }
}

export default AdminPageMainTable//exporting a component make it reusable and this is the beauty of react

