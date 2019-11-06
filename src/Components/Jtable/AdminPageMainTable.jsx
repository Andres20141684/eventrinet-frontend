import React, { Component } from 'react'
import '../../styles/styles'
import ActionButton from './ActionButton';
import FormOtorgarPermisos from './FormOtorgarPermisos'

const Networking = require('../../Network/Networking') ;

class AdminPageMainTable extends Component {
    constructor(props) {
        super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
        this.state = {
            idUser_recived:0,
            datos_tabla: {
                Organizadores:[
                ]
            }
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
  handleClickPermiso = () => {
    this.handleNextChildComponentChange(FormOtorgarPermisos);

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
                <td>
                    
                    <ActionButton
                        idUser_recived={this.state.idUser_recived} 
                        button_class ="fa fa-times" 
                        onNextChildComponentChange={this.props.onNextChildComponentChange}
                        onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                        redirect_to="/"
                  />
               </td> 
            </tr>
        )
        })
    }
    renderTableHeader() {
      return (
         <tr>
             <th width="30%">Nombre completo</th>
             <th width="30%">Correo</th>
             <th width="15%">Vigencia Inicio</th>
             <th width="15%">Vigencia Fin</th>
             <th width="10%">Eliminar</th>
         </tr>

     )
     }
  
     render() {
        //this.state = this.props.data
        return (
        <div>
            <div style={{marginLeft:15}}>
                <h1><br/>Otorgar permiso de crear evento</h1>
            </div>

            <div className="container">
            <div class="panel panel mypanel ">
                <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                    <h3>Lista de organizadores que pueden crear evento</h3>
                    <a  class="pull-right" onClick={this.handleClickPermiso} 
                        style={{marginRight:30,marginBottom:20}}>Otorgar permiso</a>
                </div>
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

