import React, { Component }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker"; 
import { FormGroup } from '@material-ui/core';
import JTableMaterial from '../Special/JTableMaterial';
const Networking = require('../../Network/Networking') ;


const useStyles = makeStyles(theme => ({
  modal: { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    borderRadius:' 2px',
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
            dateIniSelected:'',
            dateFinSelected:'',
            flagPermiso:false,
            columns:[],
            data:[],
            dataReady:0
            
        }
        this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
        this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.myCallback = this.myCallback.bind(this)
    }
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
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
                this.tableData();
                this.setState({dataReady:1});
            }   
            
        });
        
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.state.dataReady != nextState.dataReady){
           return true;
        }
        return false;
    }
    componentWillMount(){
        this.renderHeaders();
    }
    makedata(dataRady){
        switch (dataRady) {
            case 0:
               return [];
            case 1: 
                return this.state.data;
        } 
    }
     myCallback (message) {
    //[...we will use the dataFromChild here...]
        this.setState({dataReady:0});
        Networking.listarUsuarios()
        .then((value) => {
            console.log("lista usuarios",value);
            if(value == null){
                console.log('no hay algo aun');
            }else {
                console.log('si hay algo:');
                console.log(value);
                console.log("data ante de setear",this.state.datos_tabla)
                //this.setState({dataReady:0});
                this.setState({datos_tabla:value});
                if (this.state.datos_tabla !== value){
                    this.state.datos_tabla = value;
                }
                this.tableData();
                this.setState({dataReady:1});
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
    
    tableData() {
        let data =  [];
        this.state.datos_tabla.Organizadores.map((element, index) => {
            const {correo,fechaFinPermiso,fechaIniPermiso, tienePermiso,idUsuario, nomComp} = element;
            if (tienePermiso == 0){
                data.push({
                    num: index+1,
                    name: nomComp, 
                    correo: correo,
                    fechaIni: '-',
                    fechaFin: '-',
                    edit: (<TransitionsModal 
                        element={element}                        
                        myCallback={this.myCallback}
                        handleChangeDate = {this.handleChangeDate}
                        />
                    ),
                })
            }else{
                data.push({
                    num: index+1,
                    name: nomComp, 
                    correo: correo,
                    fechaIni: fechaIniPermiso,
                    fechaFin: fechaFinPermiso,
                    edit: (<TransitionsModal 
                        element={element}
                        myCallback={this.myCallback}
                        handleChangeDate = {this.handleChangeDate}
                        />
                    ),
                })
            }
        })
        this.setState({data:data});
    }
    renderHeaders() {
        let columns= [
            { title: 'Nro', field: 'num' ,cellStyle:{ fontSize: 14 }},
            { title: 'Nombre completo', field: 'name',cellStyle:{ width:'30%',fontSize: 14 } },
            { title: 'Correo', field: 'correo',cellStyle:{ width:'15%',fontSize: 14 } },
            { title: 'Vigencia Inicio', field: 'fechaIni',cellStyle:{width:'12%', fontSize: 14 } },
            { title: 'Vigencia Fin', field: 'fechaFin' ,cellStyle:{ width:'12%',fontSize: 14 }},
            { title: 'Editar', field: 'edit' ,cellStyle:{width:'4%'}},
          ];
          this.setState({columns:columns});
     }

    render() {        
        return (
        <div>
            <div style={{marginLeft:15}}>
                <h1><br/>Otorgar permiso de crear evento</h1>
                <br/>
            </div>

            <div className="container">
                <div class="panel panel mypanel ">
                    <JTableMaterial
                    title="Lista de usuarios:"
                    columns={this.state.columns}
                    data={this.makedata(this.state.dataReady)}
                    ready={this.state.dataReady}  
                    />
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
    const [dateIniSelected, setdateIniSelected] = React.useState('');
    const [dateFinSelected, setdateFinSelected] = React.useState('');
  
    const handleOpen = () => {         
        if (props.element.tienePermiso === 1){
            let yyIni=props.element.fechaIniPermiso.substr(0,4); let yyFin=props.element.fechaFinPermiso.substr(0,4);
            let mmIni=props.element.fechaIniPermiso.substr(5,2); let mmFin=props.element.fechaFinPermiso.substr(5,2);
            let ddIni=props.element.fechaIniPermiso.substr(8,2); let ddFin=props.element.fechaFinPermiso.substr(8,2);
                            
            setdateIniSelected (new Date(parseInt(yyIni),parseInt(mmIni)-1,parseInt(ddIni)))
            setdateFinSelected (new Date(parseInt(yyFin),parseInt(mmFin)-1,parseInt(ddFin)))
            
        }
        else {
            setdateIniSelected ("")
            setdateFinSelected ("")            
        }
        console.log("my props",props)
        console.log("my dates",dateIniSelected,dateFinSelected)
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);        
      
    };    
    const handleClickUpdatePermisos = () => {
        
        let dataIni= DateFormat(dateIniSelected);
        let dataFin= DateFormat(dateFinSelected);
        console.log(" Datos a actualizar ",props.element.correo," ",dataIni, " ",dataFin);
        
        Networking.crear_organizador(props.element.correo, dataIni, dataFin).then(
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
                            <input type="text" readOnly class="form-control-plaintext" id="staticName" value={props.element.nomComp}/>
                            </div>
                        </div>
                    <div class="form-group row">
                        <label for="staticEmail" class="col-sm-4 col-form-label">Correo electronico</label>
                        <div class="col-sm-6">
                          <input type="text" readOnly class="form-control-plaintext" id="staticEmail"value={props.element.correo}/>
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
                              maxDate ={dateFinSelected!==''?dateFinSelected:null }                           
                              placeholder="date_in"
                              selected={dateIniSelected}
                              onChange={(e)=> setdateIniSelected(e)}
                              className="form-control"
                          />
                        </div>
                    
                        <div class="form-group date" style={{paddingLeft:"0px"}}>
                            <label style={{paddingLeft:"15px"}}>Fecha Fin &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                            <DatePicker
                            type="date"
                            id="input-date"
                            name="date_in"
                            disabled={dateIniSelected===''?true:false}
                            minDate= {dateIniSelected}
                            placeholder="date_in"
                            selected={dateFinSelected }
                            onChange={(e)=> setdateFinSelected(e)}
                            className="form-control"
                            />
                        </div>
                  </Row>
                    </FormGroup>
                  </div>
                  </div>
                  <div className="modal-footer" style={{paddingRight:"0px", paddingBottom:'0px'}}>
                    <Button type="button" class="btn btn-secondary" onClick={() => handleClose() }>Cancelar</Button>
                    <Button type="button" onClick={()=>handleClickUpdatePermisos()} class="btn btn-primary" >Agregar</Button>
                  </div>
              </div>   
          </Fade>
        </Modal>
        </div>  
    );
  }

export default AdminPageMainTable