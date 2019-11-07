import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/style_sheets.css'
import { is } from '@babel/types';
import ActionButton from './ActionButton';
import ElegirPrefCategorias from './../../Pages/ElegirPrefCategorias.jsx'
import Checkbox from './Checkbox'

const Networking = require('./../../Network/Networking.js') ;

//var OPTIONS = ["One", "Two", "Three"];
var OPTIONS = [];

class ListadoCategPorEvento  extends Component {
   constructor(props){
      super(props);
      this.state = {
          idUser_recived: 0,
         datos_tabla: {
            Categorias:[
                           ]          
         },
         rememberMe: false,
         idEvento: 0,
         //idEvaluador : 0,


         checkboxes: OPTIONS.reduce(
            (options, option) => ({
              ...options,
              [option]: true
            }),
            {}
          )          
      }
      //OPTIONS = ['kk', 'asco','asdas'];
      this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
      this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
   }
   selectAllCheckboxes = isSelected => {
     console.log("select ",isSelected);
      Object.keys(this.state.checkboxes).forEach(checkbox => {
        // BONUS: Can you explain why we pass updater function to setState instead of an object?
        this.setState(prevState => ({
          checkboxes: {
            ...prevState.checkboxes,
            [checkbox]: isSelected
          }
        }));
      });
    };
  
    selectAll = () => this.selectAllCheckboxes(true);
  
    deselectAll = () => this.selectAllCheckboxes(false);
  
    handleCheckboxChange = changeEvent => {
      const { name } = changeEvent.target;
      console.log("caMBIO a ");
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [name]: !prevState.checkboxes[name]
        }
      }));
      
    };
  
    handleFormSubmit = formSubmitEvent => {
      formSubmitEvent.preventDefault();
      Object.keys(this.state.checkboxes)
        .filter(checkbox => this.state.checkboxes[checkbox])
        .forEach(checkbox => {
          console.log("Se va a insertar: ",this.state.idEvento, this.state.idUser_recived, checkbox);
          /*Networking.registrar_PrefXCat(this.state.idEvento, this.state.idUser_recived, checkbox).then((value) => {
            console.log(value);
            if(value == null){
               console.log('devolvio null pero no se q devuelve el back :V');
               
            }else {
               console.log('Se inserto :V');
               
            }
            
         });*/

        });
        
    };
  
    createCheckbox = option => (
      <Checkbox
        label={option} 
        isSelected={this.state.checkboxes[option]}
        onCheckboxChange={this.handleCheckboxChange}
        key={option}
      />
    );
  
    createCheckboxes = () =>{
      OPTIONS.map(this.createCheckbox);
    } //()



    handleNextChildComponentChange(_nextChildComponent){
        this.props.onNextChildComponentChange(_nextChildComponent);
        
    }
    handleNextChildComponentChangeProps(_nextChildComponentProps){
        this.props.onNextChildComponentChangeProps(_nextChildComponentProps);
    }
  
      
      //this.handleNextChildComponentChange(NewEventPage);
   componentWillMount(){
         console.log("WILL MOUNT")
         let retrievedObject = sessionStorage.getItem('dataUser');
      let retrievedJson = JSON.parse(retrievedObject);  
      this.state.idUser_recived= retrievedJson.infoUsuario.idUsuario;
      console.log(retrievedJson);


      Networking.listar_categoriasPorEvento(this.props.idEvento).then((value) => {
         console.log(value);
         if(value == null){
            console.log('no hay algo aun');
            
         }else {
            console.log('si hay algo: A ACTUALIZAR EL ESTADO');
            this.setState({datos_tabla:value});

            //OPTIONS = this.state.datos_tabla.Categorias.map( (e) => e.descripcion);
            //console.log(this.state.datos_tabla.Categorias.map( (e) => e.descripcion));
         }
         
      });
      
   }
   componentDidMount(){
      console.log("DID MOUNT");
      console.log("jxjx",this.state.datos_tabla);

      this.setState({
        //nombre_evento : this.props.nextChildComponentProps.nomb_evento,
        idEvento : this.props.idEvento,
        //idEvaluador : this.props.nextChildComponentProps.idOrganizador_nextProps,
      });
      console.log("<<<<<<<<<ID evento",this.state.idEvento);
      
      
      //OPTIONS = ['sda','asdas'];
   }
   /*shouldComponentUpdate(nextProps, nextState){

      if(this.state.datos_tabla != nextState.datos_tabla){
         return true;
      }
      if(nextProps.idEvento!=this.props.idEvento){
         console.log("<<cambio mi idEvento<<<",nextState.idEvento,"-",this.state.idEvento);
         return true;
     }
      return false;
   }*/
   

      elegirPrefCat = () =>{
         this.props.onNextChildComponentChange(ElegirPrefCategorias);
      }

   /*handleCheck = event => {
         this.setState({ rememberMe: event.target.checked});
         console.log(this.state.rememberMe);
   };*/

 
   
   tableData() {
     //this.setState.idUser_recived=this.props.idUser_recived;
//<td><input type="checkbox"/></td>

     return this.state.datos_tabla.Categorias.map((element, index) => {
         
      const {idCategoria,descripcion} = element
      return (
      <tr >
        <Checkbox
      label={idCategoria}
      isSelected={this.state.checkboxes[idCategoria]}
      onCheckboxChange={this.handleCheckboxChange}
      key={idCategoria}
    />
            
            <td >{descripcion}</td>
      </tr>
      )
   })
/*
      var longitud = this.state.datos_tabla.Categorias.map( (e) => e.descripcion).length;
      console.log("L =",longitud); 
      OPTIONS = this.state.datos_tabla.Categorias.map( (e) => e.descripcion);
      //this.setState.idUser_recived=this.props.idUser_recived;
      console.log(this.state.datos_tabla.Categorias.map( (e) => e.descripcion));
        return this.state.datos_tabla.Categorias.map( (e) => e.descripcion);
      /*return this.state.datos_tabla.Categorias.map((element, index) => {
         
         const {idCategoria,descripcion} = element
         return (
         <tr >
               <td><input type="checkbox" checked={this.state.rememberMe} onChange={this.handleCheck}/></td>
               <td >{descripcion}</td>
         </tr>
         )
      })*/
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
           <form onSubmit={this.handleFormSubmit}> 
           <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.selectAll}
                >
                  Seleccionar todos
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary mr-2"
                  onClick={this.deselectAll}
                >
                  Deseleccionar todos
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button></form>
           </div>
           
        </div>
     )
    }
  }

export default ListadoCategPorEvento