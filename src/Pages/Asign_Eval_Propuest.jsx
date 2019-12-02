import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '.././styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from '../Components/Jtable/ActionButton';
import ChipsLista from '../Components/ListOfChips';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent, DialogContentText, DialogActions, Chip, makeStyles } from '@material-ui/core';
import Select from "react-dropdown-select";
import DialogTitle from '@material-ui/core/DialogTitle';
import PresiAsignarEvalEvents from './PresiAsignarEvalEvents';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import EvaluadorPreferenceList from './EvaluadorPreferenceList';
import EvaluadorPreferenceCategoria from './EvaluadorPreferenceCategoria';

const Networking = require('../Network/Networking.js') ;

var aux=[]

const useStyles = makeStyles(theme => ({
   root: {
     display: 'flex',
     justifyContent: 'center',
     flexWrap: 'wrap',
     padding: theme.spacing(0.5),
   },
   chip: {
     margin: theme.spacing(0.5),
   },
 }));
 
class AsignEvalPropuesta  extends Component {
    constructor(props){
       super(props);
       this.state = {
           idEvento:1,
           optiones:[],
           open:true,
           clearable:true,
           selectValues: [],
           labelField: "nombre",
           valueField: "nombre",
           dropdownHeight: "100px",
           currentIndex:0,
           nombre:'Evento 1',
           msg: "Not Connected" ,
           transport: "go to Fake Ini",
           idUser_recived: 0,
           loading:true,
           tipoPref:1,
          datos_tabla: [ ]
       }
       this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
       this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
       this.handleDeleteArray=this.handleDeleteArray.bind(this);
       this.handleClickOpen=this.handleClickOpen.bind(this);
       this.handleClose=this.handleClose.bind(this);
       this.setValues=this.setValues.bind(this);
       this.filtradoOpciones=this.filtradoOpciones.bind(this);
       this.handleClickRetroceder=this.handleClickRetroceder.bind(this);
       this.handleAplicarAlgortimo=this.handleAplicarAlgortimo.bind(this);
       this.mostrarPref=this.mostrarPref.bind(this)
   
     }

     setValues = selectValues => this.setState({ selectValues:selectValues,clearable:true});

     handleNextChildComponentChange(_nextChildComponent){
       console.log('cambiando', _nextChildComponent);
         this.props.onNextChildComponentChange(_nextChildComponent);
         
     }
     handleNextChildComponentChangeProps(_nextChildComponentProps){
         this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
     }

     handleClickOpen(index){
      console.log('Llego al open index:',index)
        //this.state.open=true
      this.filtradoOpciones(index);
      this.setState({open:true,currentIndex:index})   
    }

    handleClose=()=> {
      this.setState({open:false,clearable:false,currentIndex:0})  
    }

    handleSave=(index)=>{
      console.log('llego al guardado con el index: ',index)
      var tabla=[...this.state.datos_tabla]
      tabla[index].evaluadores.push(JSON.parse(JSON.stringify(this.state.selectValues[0])))
      this.setState({datos_tabla:tabla,selectValues:[]})
      
       this.handleClose()
    }
     handleClickRetroceder = () => {
        console.log('estoy retrocediendo')
       this.handleNextChildComponentChange(PresiAsignarEvalEvents);
     }

     handleClickGuardar = () => {
        this.setState({loading:true,open:true})
        var aux={idEvento:this.state.idEvento}
        aux.Propuestas=[...this.state.datos_tabla]
        console.log(JSON.stringify(aux))
      Networking.InsertarEvaluadorAPaper(JSON.stringify(aux)).then((value)=>{
         console.log(value)
         this.setState({open:false,loading:false})
         this.handleNextChildComponentChange(PresiAsignarEvalEvents);
      })
    }
    
    componentWillMount(){
       var listaAux=[];
       var object={};

       console.log(this.props.nextChildComponentProps.idEvento)
       this.setState({idEvento:this.props.nextChildComponentProps.idEvento})
       Networking.EvaluadorxEvento(JSON.stringify({idEvento:this.props.nextChildComponentProps.idEvento})).then((value)=>{
         console.log(value);
         this.setState({options:value.correos,open:false});
         this.setState({loading:false})
      })

      Networking.PropuestaxEvento(JSON.stringify({idEvento:this.props.nextChildComponentProps.idEvento})).then((value)=>{
         console.log(value)
         value.Propuestas.map((element,index)=>{
            object={nombre:element.nombre,idPropuesta:element.idPropuesta,evaluadores:element.Evaluadores,categorias:element.Categorias}
            listaAux.push(object);
            console.log(object);
            console.log(listaAux);
         })
         this.setState({datos_tabla:listaAux,tipoPref:value.tipoPref});   
         console.log(this.state.datos_tabla); 
      });   
      this.setState({nombre:this.props.nextChildComponentProps.nomb_evento})
    }

    shouldComponentUpdate(nextProps, nextState){
       if(this.state.datos_tabla!= nextState.datos_tabla){
          console.log(this.state.datos_tabla)
          return true;
       }
       if(this.state.open!=nextState.open){
         console.log(this.state.open)
          return true;
       }
       if(this.state.selectValues!=nextState.selectValues){
         console.log(this.state.selectValues)
          return true;
       }
       return false
    }
   

       handleDeleteArray(e,index){
          console.log('Datos: ',e,' En el index',index)
          var tabla=[...this.state.datos_tabla]
          tabla[index].evaluadores=e;
          this.setState({
             datos_tabla:tabla
          })
          console.log(tabla)
          console.log(this.state)
       }

   filtradoOpciones(index){
      aux=[...this.state.options]
      for(var i=0;i<this.state.datos_tabla[index].evaluadores.length;i++){
         aux=aux.filter(opt=>opt.correo!==this.state.datos_tabla[index].evaluadores[i].correo)
         console.log("Valor de aux: ",aux)
      }
      console.log(aux)
   }
 
   mostrarPref(){
      var tipoPref=1
      let dataFlow={
         idEvento:this.props.nextChildComponentProps.idEvento,
         Usuario:this.props.nextChildComponentProps.Usuario,
         nomb_evento:this.props.nextChildComponentProps.nomb_evento
      }
      if(this.state.tipoPref==2){ //Tipo por propuesta
         this.handleNextChildComponentChangeProps(dataFlow);
         this.handleNextChildComponentChange(EvaluadorPreferenceList);
      }
      else if(this.state.tipoPref==1){//tipo por categoria
         this.handleNextChildComponentChangeProps(dataFlow);
         this.handleNextChildComponentChange(EvaluadorPreferenceCategoria);
      }
   }
   handleAplicarAlgortimo(){
      var listaAux=[...this.state.datos_tabla];
       var object={};

      Networking.AlgoritmoAsignacion(JSON.stringify({idEvento:this.props.nextChildComponentProps.idEvento})).then((value)=>{
         console.log(value)
         value.Propuestas.map((element,index)=>{
            //object={nombre:element.nombre,idPropuesta:element.idPropuesta,evaluadores:element.Evaluadores}
            listaAux[index].evaluadores=[...element.Evaluadores]
            console.log(index);
            console.log(listaAux);
         })
         this.setState({datos_tabla:listaAux});   
      })
   }
  
    
    tableData() {
       //this.setState.idUser_recived=this.props.idUser_recived;
 
         return this.state.datos_tabla.map((element, index) => {
          const {idEvento, nombre,evaluadores,fechaIni,
             fechaFin,lugar,precios,numFases,estado,
             preferencia,tieneCameraRdy,programaCompletado,
             fechaMaxPref,numeroPropuestas} = element
          return (
          <tr >
                <td >{nombre}</td>
                <td>
                  <div style={{float:'left',display: 'flex',
                              justifyContent: 'left',
                              flexWrap: 'wrap',
                              padding: '0.5px'}}>
                   {
                      element.categorias.map(data => {
                        return (
                        <Chip
                           style={{fontSize:'12px'}}
                           label={data.descripcion}
                           className={useStyles.chip}
                        />
                        );})
                   }
                   </div>
                </td>
                <td >
                   <div style={{float:'left'}}>
                   {element.evaluadores.length==0?null:
                      <ChipsLista
                      index={index}
                      lista={element.evaluadores}
                      handleChangeArray={this.handleDeleteArray}
                      ></ChipsLista>
                   }
                   </div>
                </td>
                <td component={'span'}>
                   <button style={{float:'left'}} 
                   class="btn_plus fa fa-plus" onClick={()=>this.handleClickOpen(index)} disabled={element.evaluadores.length<4?false:true}></button>
                     <Dialog component={'span'}
                        open={this.state.open===true?true:false}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        disableBackdropClick={false}
                     >
                      <div>
                         {this.state.loading===true?
                         <div>
                           <DialogContent component={'span'}>
                           <DialogContentText>
                           <h2>Procesando...</h2>
                           </DialogContentText>
                           <div class='col-md-4'></div>
                           <div class='col-md-4'>
                              <Fade
                              in='true'
                              style={{
                                 transitionDelay: '800ms',
                              }}
                              unmountOnExit
                              >
                              <CircularProgress />
                              </Fade>
                           </div>
                           <div class='col-md-4'></div>
                           </DialogContent>

                        </div>:
                        <div>
                           <DialogTitle class="modal-header" style={{paddingBottom:"5px"}}>Seleccione un Evaluador</DialogTitle>
                           <DialogContent component={'span'} style={{height:'200px',width:'350px'}}>
                              <div class='col-md-8'>
                                 <DialogContentText component={'span'}>
                                    <div >
                                       <Select component={'span'} style={{fontSize:'18px', width: "270px", margin: " auto" }} 
                                       placeholder="Elige Evaluador" 
                                       options={aux} 
                                       noDataLabel="No evaluador encontrado"
                                       onChange={values => this.setValues(values)}
                                       dropdownHeight={this.state.dropdownHeight}
                                       labelField={this.state.labelField}
                                       valueField={this.state.valueField}
                                       //dropdownGap={5}
                                       //searchBy={this.state.labelField}
                                       clearable={this.state.clearable}
                                       />
                                    </div>
                                    <br/>
                                 </DialogContentText>
                              </div>
                              {this.state.selectValues.length===0?null:
                              <div class='form-group'>
                                 <DialogContentText>
                                 <br/>
                                 <div>
                                 <label style={{fontSize:'14px'}}>Nombre: {this.state.selectValues[0].nombre}</label>
                                 </div>
                                 <div>
                                 <label style={{fontSize:'14px',paddingTop:'10px'}} >Correo: {this.state.selectValues[0].correo}</label>
                                 </div>                                 
                                 </DialogContentText>
                              </div>}
                           </DialogContent>
                           <DialogActions component={'span'}>
                              <button style={{float:'left'}} className="mybutton"  variant="contained" color="primary"  onClick={this.handleClose} color="primary">
                                 Rechazar
                              </button>
                              <button style={{float:'right'}} className="mybutton"  variant="contained" color="primary"  onClick={()=>this.handleSave(this.state.currentIndex)} color="primary" autoFocus>
                                 Aceptar
                              </button>
                           </DialogActions>
                        </div>
                           }
                      </div>
                   </Dialog>
                                                 
                </td>
                
          </tr>
          )
       })
     }
   
   
      render() {
         console.log('RENDER DE MRD! se loqueo');
          return (
             <div>
                <div>
                <div class='container'>
                <div class='panel-body'>
                <div class="panel" >
                  <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                     <div>
                     <div style={{marginLeft:15}}>
                        <h3><br/>{this.state.nombre}</h3>
                     </div>    
                     </div>
                  </div>
                  <div class='col-md-12'>
                     <div class='col-md-4'><label>Mostrar Preferencias:</label></div>
                     <div class='col-md-8'><button class="mybutton" onClick={this.mostrarPref} style={{float:'left',marginBottom:'15px'}}>Mostrar</button>
                     <br/>
                  </div>
                  </div>
                  <div class='col-md-12'>
                  <div class='col-md-4'><label>Asignacion Automatica:</label></div>
                  <div class='col-md-8'><button class="mybutton" onClick={this.handleAplicarAlgortimo} style={{float:'left',marginBottom:'15px'}}>Aplicar</button>
                  <br/>
                  </div>
                  </div>
                  <div  class="table-responsive">
                  <table class="table  table-hover">
                  <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                     <tr >
                        <th width="30%" align= "left" scope="col">Papers</th>
                        <th width="15%" align= "left" scope="col">Categorias</th>
                        <th width="50%" scope="col">Evaluadores</th>
                        <th width="5%" scope='col'>Añadir</th>
                     </tr>
                  </thead>
                  <tbody style={{fontSize:'16px'}}>{this.tableData()}</tbody>
                  </table>
                  </div>
                  <div>
                  <button class="mybutton" onClick={this.handleClickRetroceder} style={{marginTop:15,float:'left'}}>Atras</button>
                  </div>
                  <div>
                  <button class="mybutton" onClick={this.handleClickGuardar} style={{float:'right',marginTop:15}}>Guardar</button>
                  </div>
               </div>
                </div>
             </div>
                </div>
             </div>
             
         )
      }
 }

export default AsignEvalPropuesta;

