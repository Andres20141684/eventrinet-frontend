import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '.././styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from '../Components/Jtable/ActionButton';
import ChipsLista from '../Components/ListOfChips';
import Dialog from '@material-ui/core/Dialog';
import {DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Select from "react-dropdown-select";
import DialogTitle from '@material-ui/core/DialogTitle';
import PresiAsignarEvalEvents from './PresiAsignarEvalEvents';

const Networking = require('../Network/Networking.js') ;

const options=[{id:0,nombre:'Juan',correo:'ret@pucp.pe'},{id:2,nombre:'Pepito',correo:'pepex@pucp.pe'},{id:1,nombre:'Cesar',correo:'ffff@pucp.pe'}]
var aux=[]
function MainTittle(props){
    console.log(props)
    return ( <div>
    <div style={{marginLeft:15}}>
        <h3><br/>{props.nomb_evento}</h3>
    </div>    
    </div>
    )
}

class AsignEvalPropuesta  extends Component {
    constructor(props){
       super(props);
       this.state = {
           idEvento:1,
           optiones:[],
           open:false,
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
       this.handleAplicarAlgortimo=this.handleAplicarAlgortimo.bind(this)
   
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
        var aux={idEvento:this.state.idEvento}
        aux.Propuestas=[...this.state.datos_tabla]
        console.log(JSON.stringify(aux))
      Networking.InsertarEvaluadorAPaper(JSON.stringify(aux)).then((value)=>{
         console.log(value)
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
         this.setState({options:value.correos});
      })

      Networking.PropuestaxEvento(JSON.stringify({idEvento:this.props.nextChildComponentProps.idEvento})).then((value)=>{
         console.log(value)
         value.Propuestas.map((element,index)=>{
            object={nombre:element.nombre,idPropuesta:element.idPropuesta,evaluadores:element.Evaluadores}
            listaAux.push(object);
            console.log(object);
            console.log(listaAux);
         })
         this.setState({datos_tabla:listaAux});   
         console.log(this.state.datos_tabla); 
      });   

      
      
       /*
       let retrievedObject = sessionStorage.getItem('dataUser');
       let retrievedJson = JSON.parse(retrievedObject);  
       this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
       console.log(retrievedJson);
 
 
       Networking.populateDataOrgTab1(retrievedJson.infoUsuario.idUsuario).then((value) => {
          console.log(value);
          if(value == null){
             console.log('no hay algo aun');
             
          }else {
             console.log('si hay algo:');
             this.setState({datos_tabla:value});
          }
          
       });*/
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
 
   handleAplicarAlgortimo(){
      var listaAux=[];
       var object={};

      Networking.AlgoritmoAsignacion(JSON.stringify({idEvento:this.props.nextChildComponentProps.idEvento})).then((value)=>{
         console.log(value)
         value.Propuestas.map((element,index)=>{
            object={nombre:element.nombre,idPropuesta:element.idPropuesta,evaluadores:element.Evaluadores}
            listaAux.push(object);
            console.log(object);
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
                   {element.evaluadores.length==0?null:
                      <ChipsLista
                      index={index}
                      lista={element.evaluadores}
                      handleChangeArray={this.handleDeleteArray}
                      ></ChipsLista>
                   }
                </td>
                <td component={'span'}>
                 
                 
                   <button style={{float:'right'}} 
                   class="btn_plus fa fa-plus" onClick={()=>this.handleClickOpen(index)} disabled={element.evaluadores.length<4?false:true}></button>
                     <Dialog component={'span'}
                        open={this.state.open===true?true:false}
                        onClose={this.handleClose}
                        aria-labelledby="responsive-dialog-title"
                        disableBackdropClick={false}
                     >
                      <div>
                         <DialogTitle class="modal-header" style={{paddingBottom:"5px"}}>Seleccione un Evaluador</DialogTitle>
                           <DialogContent component={'span'} style={{height:'150px',width:'350px'}}>
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
                   </Dialog>
                                                 
                </td>
                
          </tr>
          )
       })
     }
   
   
      render() {
       //console.log(this.state.datos_tabla.Eventos.length);
       //superWait(this.state.datos_tabla.Eventos);
         //this.state = this.props.data
         //console.log('this.props.data:', this.props.data);
         console.log('RENDER DE MRD! se loqueo');
          return (
             <div>
                <div>
                <div class='container'>
                <div class='panel-body'>
                <div class="panel" >
                  <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                     <h3>{this.state.nombre}</h3>
                     {/*<a  class="pull-right" onClick={this.handleClickCrearActualizar} 
                     value="Nuevo" style={{marginRight:30,marginBottom:20}}>Nuevo</a>*/}
                  </div>
                  <div class='col-md-12'>
                  <div class='col-md-4'><label>Asignacion Automatica:</label></div>
                  <div class='col-md-8'><button class="mybutton" onClick={this.handleAplicarAlgortimo} style={{float:'left'}}>Aplicar</button>
                  </div>
                  </div>
                  <div  class="table-responsive">
                  <table class="table  table-hover">
                  <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                     <tr >
                        <th width="30%" align= "left" scope="col">Papers</th>
                        <th width="60%" scope="col">Evaluadores</th>
                        <th width="10" scope='col'>Añadir</th>
                     </tr>
                  </thead>
                  <tbody>{this.tableData()}</tbody>
                  </table>
                  </div>
                  <div>
                  <button class="mybutton" onClick={this.handleClickRetroceder} style={{float:'left'}}>Atras</button>
                  </div>
                  <div>
                  <button class="mybutton" onClick={this.handleClickGuardar} style={{float:'right'}}>Guardar</button>
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

/*            <div> 
    <div style={{marginLeft:15}}>
        <h1 style={{fontSize:35}}><br/>{this.state.nombre_evento}</h1>
    </div>
    <div style={{marginLeft:40,marginTop:25}} ><h2>Preferencias por categorías</h2></div>
            
            <div class="container" >
                <div class ="panel-body">
                
                    <Tabs defaultIndex={0} onSelect={index => console.log(index)}>

                            <TabList>
                                <Tab>Lista de categorías por evento</Tab>
                            </TabList>
                            <TabPanel>
                                <br/>
                                <this.state.formActives  
                                    onNextChildComponentChange={this.props.onNextChildComponentChange} 
                                    onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                                    idEvento = {this.props.nextChildComponentProps.id_evento_nextProps}
                                    idEvaluador = {this.props.nextChildComponentProps.idUser_recived}
                                />
                            </TabPanel>
                            
                        </Tabs>
                        <div>
        <h2><br/></h2>
        <h3>
        <button class="mybutton" onClick={this.elegirPrefCat} style={{float:'left'}}>Atras</button>
        <br/><br/>
        </h3>
    </div>
                    </div>
                </div>
                <br/><br/>
                
                </div>
                

--------------------------------------------------------
                <td >{estado}</td>
                <td >{fechaIni}</td>
                <td >{fechaFin}</td>
 
                <td>
                   <ActionButton 
                         id_evento={idEvento} 
                         nomb_evento ={nombre} 
                         idUser_recived={this.state.idUser_recived} 
                         button_class ="fa fa-edit" 
                         onNextChildComponentChange={this.props.onNextChildComponentChange}
                         onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                         redirect_to="/"
                   />
                </td> 
 
                <td>
                   <ActionButton 
                      id_evento={idEvento} 
                      nomb_evento ={nombre} 
                      idUser_recived={this.state.idUser_recived} 
                      button_class ="fa fa-play" 
                      onNextChildComponentChange={this.props.onNextChildComponentChange}
                      onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                      redirect_to="/"
                   />
                </td> 
 
                <td>
                   <ActionButton
                      id_evento={idEvento} 
                      nomb_evento ={nombre} 
                      idUser_recived={this.state.idUser_recived} 
                      button_class ="fa fa-times" 
                      onNextChildComponentChange={this.props.onNextChildComponentChange}
                      onNextChildComponentChangeProps={this.props.onNextChildComponentChangeProps}
                      redirect_to="/"
                   />
                </td> 
             */