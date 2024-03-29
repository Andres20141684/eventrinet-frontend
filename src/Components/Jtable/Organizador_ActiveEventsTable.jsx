import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import ActionButton from './ActionButton';
import NewEventPage from './../../Pages/NewEventPage'
import JActionButton from '../Special/JActionButton';
import NewIni from '../General/NewIni';
import Dashboard from '../Dashboard';
import JTableMaterial from '../Special/JTableMaterial';import MaterialTable from 'material-table';
import OrganFinalPropuest from '../../Pages/OrganFinalPropuest';
const Networking = require('./../../Network/Networking.js') ;



class Organizador_ActiveEventsTable  extends Component {
   constructor(props){
      super(props); 
      this.state = {
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: {
                  Eventos:[
                           ],
         data_default: {  
            idOrganizador_nextProps: 0,
            id_evento_nextProps: 0,
            nomb_evento: "none"
            
         }
         },
         columns:[],
         data:[],
         dataReady:0
         
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
      //this.handleClickCrearActualizar=this.handleNextChildComponentChange.bind(this);
    }
    handleNextChildComponentChange(_nextChildComponent){
      console.log('cambiando', _nextChildComponent);
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    handleClickCrearActualizar(idO,idE,nom) {
      console.log('redireccionando a ... NewEventPage evento');
      let dataFlow = {   
         idOrganizador_nextProps: idO,
         id_evento_nextProps: idE,
         nomb_evento: nom,
         rol:0,
         Usuario:this.props.nextChildComponentProps.Usuario,editar:false
      }
      console.log('Enviando a Armando se la come',dataFlow);
      this.handleNextChildComponentChangeProps(dataFlow);
      console.log('redireccionando a ... NewEventPage evento');
      this.handleNextChildComponentChange(NewEventPage);
    }

   handleEditButton =(idO,idE,nom)=>{
      let dataFlow = {   
         idOrganizador_nextProps: idO,
         id_evento_nextProps: idE,
         nomb_evento: nom,
         rol:0,  //Identifica que es un organizador
         Usuario:this.props.nextChildComponentProps.Usuario,
         editar:true
      }
      this.handleNextChildComponentChangeProps(dataFlow);
      this.handleNextChildComponentChange(NewEventPage);
   }
   componentWillMount(){
      
      this.renderHeaders();
      
   }
   componentDidMount(){
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);
      
      console.log("flag permisos", retrievedJson.permisos[7]);
      if (retrievedJson.permisos[7]){
         let btnCrearEvent = document.getElementById("btnCrearEvento");
         //btnCrearEvent.display="block";
         console.log("Cambios realizados");
      }


      Networking.populateDataOrgTab1(retrievedJson.infoUsuario.idUsuario).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
            this.tableData();
            this.setState({dataReady:1});
         }
         
      });
   }
   

      renderHeaders(){
         let columns= [
            { title: 'Nro', field: 'num' ,cellStyle:{ fontSize: 14 }},
            { title: 'Lista de eventos', field: 'name',cellStyle:{ width:'30%',fontSize: 14 } },
            { title: 'Fase: Actual/Total', field: 'fase',cellStyle:{ width:'10%',fontSize: 14 } },
            { title: 'Estado actual', field: 'state',cellStyle:{ width:'15%',fontSize: 14 } },
            { title: 'Fecha Inicio', field: 'fechaIni',cellStyle:{width:'12%', fontSize: 14 } },
            { title: 'Fecha Fin', field: 'fechaFin' ,cellStyle:{ width:'12%',fontSize: 14 }},
            { title: 'Editar', field: 'edit' ,cellStyle:{width:'4%'}},
            { title: 'Publicar evento', field: 'publish',cellStyle:{width:'4%'} },
            { title: 'Cancelar evento', field: 'cancel' ,cellStyle:{width:'4%'}},
          ];
          this.setState({columns:columns});
       }
       handlePublishClick=(idE)=>{
         let dataFlow = {   
            idEvento: idE,
            Usuario:this.props.nextChildComponentProps.Usuario
         }
         this.handleNextChildComponentChangeProps(dataFlow);
         this.handleNextChildComponentChange(OrganFinalPropuest);
       }
       handleCancelClick(_idEvento_){
         alert("Cancelando Evento con ID: =>" + _idEvento_);
         

         Networking.NetworkMutation_JAchievingData( 
            {
              methodPath: '/api/eventos/cancelar_evento',
              JsonToBack:{
                  idEvento: _idEvento_
              },
            }
          ).then((value) => {
            console.log(value);
            if(value == null || value.succeed==false){
              console.error('FALLO FATAL');
              /************** si fallo mensaje de error************ */
              //this.setState({modal:-1});
            }else {
               console.log('si hay algo:');
               this.handleNextChildComponentChange(Dashboard);
              
            }
         });
         
      }
   tableData() {
      //this.setState.idUser_recived=this.props.idUser_recived;
      let data=[];
      this.state.datos_tabla.Eventos.forEach((evento , index )=> {
         const {idEvento, nombre,descripcion,fechaIni,
            fechaFin,lugar,precios,faseActual,numFases,estado,
            preferencia,tieneCameraRdy,programaCompletado,
            fechaMaxPref,numeroPropuestas,ultimaFaseActual} = evento
         data.push(
            { 
               num: index+1,
               name: nombre, 
               fase: ultimaFaseActual!=0?"" + (ultimaFaseActual) + "/" + numFases:"-",
               state: estado, 
               fechaIni: fechaIni, 
               fechaFin: fechaFin,
               edit: 
               (<JActionButton
                     onClick = {()=>this.handleEditButton(this.state.idUser_recived,
                                                               evento.idEvento,
                                                               evento.nombre)}
                     button_class ="fa fa-edit" 
                     />)
               , 
               publish:
               (estado==='LISTO PARA PUBLICAR'?
                     <JActionButton
                     onClick = {()=>this.handlePublishClick(evento.idEvento)}
                     button_class ="fa fa-play" 
                     />:
                     null
               )
               
               ,
               cancel: 
               (<JActionButton
                           onClick = {()=>this.handleCancelClick(evento.idEvento)}
                           button_class ="fa fa-times" 
                        />)
            }
         );
      });
      this.setState({data:data});
    }
    shouldComponentUpdate(nextProps, nextState){
      if(this.state.dataReady != nextState.dataReady){
         return true;
      }
      return false;
    }
    makedata(dataRady){
      switch (dataRady) {
         case 0:
             return [];
         case 1: 
             return this.state.data;
       } 
    }
    
     render() {
         return (
            <div style={{"font-size": "15"}}>
               <br/>
               <a  class="pull-right" onClick={()=>this.handleClickCrearActualizar( 
                           this.state.idUser_recived, 0,  'ARMANDO SE LA COMEEEE')} 
                  value="Nuevo" style={{marginRight:30,marginBottom:20,paddingLeft:25,paddingRight:25,paddingTop:5,paddingBottom:5, color:"white"}}>Nuevo</a>
                  <br/><br/>
            <JTableMaterial
               title="Eventos Activos:"
               columns={this.state.columns}
               data={this.makedata(this.state.dataReady)}
               ready={this.state.dataReady}
               
          /></div>
            
           
        )
     }
}

export default Organizador_ActiveEventsTable ;