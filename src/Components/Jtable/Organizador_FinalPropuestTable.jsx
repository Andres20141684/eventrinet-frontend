import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import NewEventPage from './../../Pages/NewEventPage'
import JActionButton from '../Special/JActionButton';
import JTableMaterial from '../Special/JTableMaterial';import MaterialTable from 'material-table';
import { Chip } from '@material-ui/core';
const Networking = require('./../../Network/Networking.js') ;



class Organizador_FinalPropuestTable  extends Component {
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
         Usuario:this.props.nextChildComponentProps.Usuario
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
         Usuario:this.props.nextChildComponentProps.Usuario
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

      Networking.listarPropuestasAceptadas(JSON.stringify({idEvento:this.props.nextChildComponentProps.idEvento})).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value.Propuestas});
            this.tableData();
            this.setState({dataReady:1});
         }
         
      });
   }
   

      renderHeaders(){
         let columns= [
            { title: 'Titulo de la propuesta', field: 'titulo' ,cellStyle:{ fontSize: 14 }},
            { title: 'Nombre del Autor', field: 'nombreAutor',cellStyle:{ width:'30%',fontSize: 14 } },
            { title: 'Categorias', field: 'categorias',cellStyle:{ width:'10%',fontSize: 14 } },
          ];
          this.setState({columns:columns});
       }
   tableData() {
      //this.setState.idUser_recived=this.props.idUser_recived;
      let data=[];
      this.state.datos_tabla.forEach((propuesta , index )=> {
         const {titulo,nombreAutor,categorias} = propuesta
         data.push(
            { 
               num: index+1,
               titulo: titulo, 
               nombreAutor: nombreAutor,
               categorias: (categorias.map(data => {
                              return (
                              <Chip
                                 style={{fontSize:'12px'}}
                                 label={data}
                              />
                  );})), 
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
            <JTableMaterial
               title="Propuestas:"
               columns={this.state.columns}
               data={this.makedata(this.state.dataReady)}
               ready={this.state.dataReady}
               
          /></div>
            
           
        )
     }
}

export default Organizador_FinalPropuestTable ;