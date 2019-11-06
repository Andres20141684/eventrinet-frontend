import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import ElegirPrefCategorias from './../../Pages/ElegirPrefCategorias.jsx'
//import NewEventPage from './../../Pages/NewEventPage' //aca debería estar el modificar fases, pero ni en back hay :'v
const Networking = require('./../../Network/Networking.js') ;


class ListadoCategPorEvento  extends Component {
   constructor(props){
      super(props);
      this.state = {
          msg: "Not Connected" ,
          transport: "go to Fake Ini",
          idUser_recived: 0,
         datos_tabla: {
            Categorias:[
                           ]
         }
      }
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  
    }
    handleNextChildComponentChange(_nextChildComponent){
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
    handleClickRegistrarPref = () => {
      console.log('redireccionando a ... FakeNewIni evento');
      this.handleNextChildComponentChangeProps({  
         idOrganizador_nextProps: this.state.idUser_recived,
         id_evento_nextProps: 0, //para q se actualice el evento no?
         nomb_evento: "none"
         
      });
      
      //this.handleNextChildComponentChange(NewEventPage);
    }
   
   componentDidMount(){
      
      
      let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);

      Networking.listar_categoriasPorEvento(this.props.idEvento).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo:');
            this.setState({datos_tabla:value});
         }
         
      });
   }
   shouldComponentUpdate(nextProps, nextState){

      if(this.state.datos_tabla != nextState.datos_tabla){
         return true;
      }
      if(nextProps.idEvento!=this.props.idEvento){
         console.log("<<cambio mi idEvento<<<",nextState.idEvento,"-",this.state.idEvento);
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

      elegirPrefCat = () =>{
         this.props.onNextChildComponentChange(ElegirPrefCategorias);
      }

 
   
   tableData() {
      //this.setState.idUser_recived=this.props.idUser_recived;

        return this.state.datos_tabla.Categorias.map((element, index) => {
         
         const {idCategoria,descripcion} = element
         return (
         <tr >
               <td><input type="checkbox"/></td>
               <td >{descripcion}</td>
         </tr>
         )
      })
    }
  
  
     render() {
         return (
            
           <div class="panel panel mypanel" >
              <div class="panel-heading" style={{backgroundColor:"#ffff", color:"#333"}}>
                  <h3>Lista de eventos a elegir preferencias</h3>
               </div>
              <div  class="table-responsive">
              <table class="table  table-hover">
               <thead style={{backgroundColor:"#002D3D", color:"#6CDCD6"}}>
                  <tr >
                  <th width="5%"><input type="checkbox"/></th>
                     <th align= "left" scope="col">Lista de categorías</th>
                     
                  </tr>
               </thead>
              <tbody>{this.tableData()}</tbody>
              
              </table>
              </div>
           </div>
        )
     }
}

export default ListadoCategPorEvento