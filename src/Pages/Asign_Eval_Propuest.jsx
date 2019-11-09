import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '.././styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from '../Components/Jtable/ActionButton';
import ChipsLista from '../Components/ListOfChips';
import { Dialog } from '@material-ui/core';

const Networking = require('../Network/Networking.js') ;

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
           open:false,
           nombre:'Evento 1',
           msg: "Not Connected" ,
           transport: "go to Fake Ini",
           idUser_recived: 0,
          datos_tabla: {
                   propuestas:[{nombre:'Gleen ',evaluadores:[{id:0,nombre:'Juan',correo:'ret@pucp.pe'},{id:1,nombre:'Cesar',correo:'ffff@pucp.pe'}]}
                            ]
          }
       }
       this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
       this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
       this.handleDeleteArray=this.handleDeleteArray.bind(this);
       this.handleClickOpen=this.handleClickOpen.bind(this);
       this.handleClose=this.handleClose.bind(this)
   
     }
     handleNextChildComponentChange(_nextChildComponent){
       console.log('cambiando', _nextChildComponent);
         this.props.onNextChildComponentChange(_nextChildComponent);
         
     }
     handleNextChildComponentChangeProps(_nextChildComponentProps){
         this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
     }

     handleClickOpen(){
      this.setState({open:true})   
    }

    handleClose () {
      this.setState({open:false})  
    }

     handleClickCrearActualizar = () => {
       /*console.log('redireccionando a ... NewEventPage evento');
       this.handleNextChildComponentChangeProps({  
          idOrganizador_nextProps: this.state.idUser_recived,
          id_evento_nextProps: 0,
          nomb_evento: "none"
          
       });
       console.log('redireccionando a ... NewEventPage evento');
       this.handleNextChildComponentChange(NewEventPage);*/
     }
    
    componentWillMount(){
       
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
       if(this.state.datos_tabla != nextState.datos_tabla){
          return true;
       }
       return false;
    }
   
   
       handleClick2 = () => {
          console.log('redireccionando a ... update evento');
          sessionStorage.setItem('nextProp',
               JSON.stringify(
                              {   idOrganizador_nextProps: this.state.idUser_recived,
                                 id_evento_nextProps: 0,
                                 nomb_evento: "none"
                                 
                              }
                           ))
          //window.location.replace("./");
       }

       handleDeleteArray(e,index){
          console.log('Datos: ',e,' En el index',index)
          var tabla=JSON.parse(JSON.stringify(this.state.datos_tabla))

          tabla.propuestas[index].evaluadores=e;
          this.setState({
             datos_tabla:tabla
          })
          console.log(tabla)
          console.log(this.state)
       }
 
  
    
    tableData() {
       //this.setState.idUser_recived=this.props.idUser_recived;
 
         return this.state.datos_tabla.propuestas.map((element, index) => {
          
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
                <td>
                   <button  class="btn btn-primary" onClick={this.handleClickOpen}>+</button>
                   <Dialog
                     open={this.state.open}
                     onClose={this.handleClose}
                     aria-labelledby="responsive-dialog-title"
                     disableBackdropClick={true}
                   ></Dialog>
                   
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
                     <a  class="pull-right" onClick={this.handleClickCrearActualizar} 
                     value="Nuevo" style={{marginRight:30,marginBottom:20}}>Nuevo</a>
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