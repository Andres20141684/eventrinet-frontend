import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import { FormGroup } from '@material-ui/core';
const Networking = require('../../Network/Networking') ;


const useStyles = makeStyles(theme => ({
  modal: { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


class AdminPageMainTable extends React.Component {
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
            dateIniSelected:new Date(),
            dateFinSelected:new Date(),
            flagPermiso:false,
            refreshData:false
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this)
    }
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    showModal = (var_id,var_nomb,var_correo,var_fechaIni,var_fechaFin,flagPermiso) => {
        console.log(var_id,var_nomb,var_correo,var_fechaIni,var_fechaFin,flagPermiso)
        this.setState({
            nameUserSelected:var_nomb,
            emailUserSelected:var_correo,
            idUsuarioSelected:var_id,
            flagPermiso:flagPermiso
        });

        if (flagPermiso === 1){
            let yyIni=var_fechaIni.substr(0,4); let yyFin=var_fechaFin.substr(0,4);
            let mmIni=var_fechaIni.substr(5,2); let mmFin=var_fechaFin.substr(5,2);
            let ddIni=var_fechaIni.substr(8,2); let ddFin=var_fechaFin.substr(8,2);

            this.setState({
                dateIniSelected:new Date(parseInt(yyIni),parseInt(mmIni)-1,parseInt(ddIni)),
                dateFinSelected: new Date(parseInt(yyFin),parseInt(mmFin)-1,parseInt(ddFin))
            })
        }
        else{
            /*this.setState({
                dateIniSelected:new Date(),
                dateFinSelected: new Date()
            })*/
        }
        console.log("this.state.ABUELO !",this.state)        
    }
      
    componentDidMount(){      
        Networking.listarUsuarios()
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

     myCallback = (message) => {
    //[...we will use the dataFromChild here...]
        Networking.listarUsuarios()
        .then((value) => {
            console.log("lista usuarios",value);
            if(value == null){
            console.log('no hay algo aun');
            }else {
            console.log('si hay algo:');
            console.log(value);
            this.setState({datos_tabla:value});
            }   
            alert(message);
        });

    }

    handleChangeDate(value,label){
        this.setState({
            [label]:value
        })
        console.log("cambiando fecha seleccionada ...",label," ",this.state[label])
    }
    
    DateFormat(date){
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
    }
    
    renderTableData() {
        return this.state.datos_tabla.Organizadores.map((element, index) => {
         const {correo,fechaFinPermiso,fechaIniPermiso, tienePermiso,idUsuario, nomComp} = element;
         if (tienePermiso == 0){ //No tiene permiso
            return (
                <tr >
                    <td>{nomComp}</td>
                    <td>{correo}</td>
                    <td>-</td>                 
                    <td>-</td>
                    <td>
                        <TransitionsModal 
                            element={element}
                            showModal={this.showModal}
                            idUsuarioSelected={this.state.idUsuarioSelected}
                            nameUserSelected={this.state.nameUserSelected}
                            emailUserSelected={this.state.emailUserSelected}
                            refreshData={this.state.refreshData}
                            dateFinSelected={this.state.dateFinSelected}
                            dateIniSelected={this.state.dateIniSelected}
                            flagPermiso={this.state.flagPermiso}
                            myCallback={this.myCallback}
                            handleChangeDate = {this.handleChangeDate}
                            handleClickUpdatePermisos = {this.handleClickUpdatePermisos}/>
                    </td>
                </tr>
            )            
         }

            return (
            <tr >
                <td>{nomComp}</td>
                <td>{correo}</td>                
                <td>{fechaIniPermiso}</td>                
                <td>{fechaFinPermiso}</td>
                <td>
                    <TransitionsModal
                        element={element}
                        showModal={this.showModal}
                        idUsuarioSelected={this.state.idUsuarioSelected}
                        nameUserSelected={this.state.nameUserSelected}
                        emailUserSelected={this.state.emailUserSelected}
                        refreshData={this.state.refreshData}
                        dateFinSelected={this.state.dateFinSelected}
                        dateIniSelected={this.state.dateIniSelected}
                        flagPermiso={this.state.flagPermiso}
                        myCallback={this.myCallback}
                        handleChangeDate = {this.handleChangeDate}
                        handleClickUpdatePermisos = {this.handleClickUpdatePermisos}/>
                </td>                
            </tr>
        )
        })
    }
    renderTableHeader() {
      return (
         <tr>
             <th width="40%">Nombre completo</th>
             <th width="32%">Correo</th>        
             <th width="11%">Vigencia Inicio</th>
             <th width="11%">Vigencia Fin</th>
             <th width="7%">Editar</th>             
         </tr>

     )
     }

    render() {        
        return (
        <div>
            <div style={{marginLeft:15}}>
                <h1><br/>Otorgar permiso de crear evento</h1>
            </div>

            <div className="container">
            <div class="panel panel mypanel ">
                <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                    <h3>Lista de usuarios</h3>
                    
                </div>                
                <div  class="table-responsive">
                <table class="table  table-hover table-list-search" >
                    <thead  style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                        {this.renderTableHeader()}
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                
                </div>
            </div>
            </div>
            <br/>
    </div>
        )
     }
}


function TransitionsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
        console.log("my props",props)
        props.showModal(props.element.idUsuario,props.element.nomComp,props.element.correo,props.element.fechaIniPermiso,props.element.fechaFinPermiso,props.element.tienePermiso);
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
        var e=new Date()
        props.handleChangeDate(e,"dateIniSelected")
        props.handleChangeDate(e,"dateFinSelected")
      
    };    
    const handleClickUpdatePermisos = () => {
        
        let dataIni= DateFormat(props.dateIniSelected);
        let dataFin= DateFormat(props.dateFinSelected);
        console.log(" Datos a actualizar ",props.idUsuarioSelected," ",dataIni, " ",dataFin);
        
        Networking.crear_organizador(props.emailUserSelected, dataIni, dataFin).then(
            (response) => {
                if (response.succeed){                
                    console.log("Se agrego permiso",response);
                }else{
                    console.log("No se dio permiso");
                    console.log(response.message);                
                }
                props.myCallback(response.message);
                handleClose()
            }
        )
    }
    const DateFormat = (date) => {
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
    }
    return (        
      <div>        
        <button class="btn btn-primary btn-xs" data-title="Edit" onClick={handleOpen}>
            <span class="glyphicon glyphicon-pencil"></span>
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          nameUserSelected= {props.nameUserSelected}
        >
          <Fade in={open} style={{width:'40%'}}>
              <div className={classes.paper}>
                  <h3 id="transition-modal-title" >Agregar permiso para crear eventos</h3>
                  <div id="transition-modal-description">
                    <div className="modal-body" style={{paddingBottom:'0px'}}>
                        <div class="form-group row">
                            <label for="staticName" class="col-sm-4 col-form-label">Nombre completo</label>
                            <div class="col-sm-6">
                            <input type="text" readOnly class="form-control-plaintext" id="staticName" value={props.nameUserSelected ? props.nameUserSelected :'nada'}/>
                            </div>
                        </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-4 col-form-label">Correo electronico</label>
                        <div class="col-sm-6">
                          <input type="text" readOnly class="form-control-plaintext" id="staticEmail"value={props.emailUserSelected ? props.emailUserSelected :'nada'}/>
                        </div>
                    </div>
                    <FormGroup style={{border:"none"}}>                
                    <Row>            
                        <div class="form-group  date" style={{paddingLeft:"0px"}}>
                          <label style={{paddingLeft:"15px"}}>Fecha Inicio&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                          <DatePicker                        
                              type="date"
                              id="input-date"
                              name="date_in"
                              minDate= {new Date()} 
                              maxDate ={props.dateFinSelected}                           
                              placeholder="date_in"
                              selected={props.dateIniSelected }
                              onChange={(e)=> props.handleChangeDate(e,"dateIniSelected")}
                              //onKeyDown={this.onKeyDownDate}
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
                            selected={props.dateFinSelected }
                            onChange={(e)=> props.handleChangeDate(e,"dateFinSelected")}
                            className="form-control"
                            />
                        </div>
                  </Row>
                    </FormGroup>
                  </div>
                  </div>
                  <div className="modal-footer" style={{paddingRight:"0px", paddingBottom:'0px'}}>
                    <Button type="button" onClick={()=>handleClickUpdatePermisos()} class="btn btn-primary" >Agregar</Button>
                  </div>
              </div>  
          </Fade>
        </Modal>
        </div>  
    );
  }

export default AdminPageMainTable