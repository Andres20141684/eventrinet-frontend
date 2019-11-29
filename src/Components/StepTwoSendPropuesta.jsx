import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';
import '../styles/styles_dropzone.css';
import { assignmentExpression } from '@babel/types';
import JTable from './Jtable/JTable';
import JCardForm from './Special/JCardForm';
import JUpload from './Special/JUpload';

class StepTwoSendPropuesta extends React.Component {
    constructor(props){
      super(props);
      this.state={
        categorias: [],
        progress:null,
        reader:null
      }
      this.defaultMutableHandle=this.defaultMutableHandle.bind(this);
      

      this.defaultMutableHandlePerso=this.defaultMutableHandlePerso.bind(this);
      this.handleOnLoad=this.handleOnLoad.bind(this);
      this.renderBody=this.renderBody.bind(this);
      this.renderHeaders=this.renderHeaders.bind(this);
      this.handleChecked=this.handleChecked.bind(this);
}

  handleOnLoad(result){
    this.props.multiHandle(
      {to:'archivo', 
      value:result
    });
  }

  shouldComponentUpdate(nextState,nextProps){
    if(nextProps.categorias != this.props.Categorias){
      return true;
    }
    return false;
  }

  componentWillMount(){
    window.scrollTo(0, 0);
    console.log("<<<<<<<<<<<<<<<>>>>>>>>>>>   StepTwoSendProp props");
    console.log(this.props);
  }
  
  onSuccesLoad(archivo){

  }
  componentDidMount(){
    console.log("<<<<<<<<<<<<<<<>>>>>>>>>>>   StepTwoSendProp props");
    console.log(this.props.CamposPers);
  }
  DateFormat(date,json,tag){
    let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
    json[tag]=aux
  }
  
  defaultMutableHandle(e){
    this.props.multiHandle(
      {to:e.target.name,
        value:e.target.value});
  }
  defaultMutableHandlePerso(e){
    let pre_value ={
      value:e.target.value,
      index:e.target.id
    }
    this.props.multiHandle(
      {to:e.target.name,
        value:pre_value});
  }
  renderOptions(){
    return this.props.Categorias.map((element, index) => {
      const {descripcion} = element
      return (
        <option>{descripcion} </option>
      )
   })

  }
  renderHeaders(){
    return(
      <tr>
          <th align= "left" scope="col">Categoria</th>
          <th scope="col">Agregar</th>
      </tr>
    )
  }
  handleChecked(e){
      console.log("Selected categorie: ",e.target.id);
      let mode_check = e.target.checked?'add':'rmv';
      this.props.multiHandle(
        {
          to: e.target.name,
          value: {
                    mode:mode_check,
                    value:e.target.id,
                  }
        }
      );
  }
  renderBody(){
    return this.props.Categorias.map((element, index) => { 
      const {idCategoria, descripcion} = element
      return (
      <tr >
            <td >{index+1} &nbsp;&nbsp; {descripcion}</td>
            <td >
              <form>
                  <input
                    type="checkbox"
                    id={idCategoria}
                    name='categorias'
                    onChange={this.handleChecked}
                  />
              </form>
            </td>
      </tr>
      )});
  }
  render () {
    const inputCamposPers =[];
    this.props.CamposPers.forEach(element => {
      inputCamposPers.push(
        {
          label:element.enunciado,
          category:'textArea',
          name:'campoPEnun',
          placeholder:element.descripcion, 
          id: element.index,  
          readonly:false,           
          onChange:this.defaultMutableHandlePerso,           
        }

      );
    });
    const inputPaperDescripcion =[
      {
        label:"Titulo",
        category:'textArea',
        name:'titulo',
        placeholder:'Titulo', 
        id:"id_Titulo",           
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Resumen",
        category:'textBox',
        name:'resumen',
        placeholder:'Resumen' ,
        id:"id_resumen",             
        onChange:this.defaultMutableHandle,
      }
      ,
      
    ]
    const inputCategorias= [
      {
        label:"Escge las categorias a participar",
        category:'Jtable',
        id:"id_resumen",             
        headers:this.renderHeaders,
        body:this.renderBody
      }
    ]
    const inputArchivo=[
      
      {
        label: "Subir propuesta corregida. (Si son varios, comprimelos en un solo archivo de extencion .zip)",
        id:"drop_zone",
        category:'JUpload',
        onChange: this.handleOnLoad,
        fileNedded:this.props.fileNeeded,
        formato:"pdf",
        maxTamanio:100
      }

    ]
    return (
      <div id={this.props.id}>
        <h1>Ingresa los detalles de la propuesta y sube un archivo</h1>

        <JCardForm
          arrayOfInputData={inputPaperDescripcion}
          cardHeadingText = "Escribe una breve reseña de tu propuesta"
        />
        
        <JCardForm
          arrayOfInputData={inputCategorias}
          cardHeadingText = "Escoge tus Categorias"
        />

        <JCardForm
          arrayOfInputData={inputArchivo}
          cardHeadingText = "Sube el archivo de tu Propuesta: "
        />
        <JCardForm
                arrayOfInputData={inputCamposPers}
                cardHeadingText = "Informacion personalizada por fase:"
              />
    
      </div>
    )
  }
}
export default StepTwoSendPropuesta;
var styles = {
  rotulos:{
    paddingRight: 80,
  }
}