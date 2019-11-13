import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css'
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import '../styles/style_sheets.css';
import { assignmentExpression } from '@babel/types';
import JCardForm from './../Components/Special/JCardForm'

class StepOneSendPropuesta extends React.Component {
    constructor(props){
      super(props);
      this.state={
        state1:{
            authorName:""
        }
        
      }
      this.defaultMutableHandle=this.defaultMutableHandle.bind(this);
      
    }      

componentWillMount(){
    console.log("StepOneSendProp props ****");
    console.log(this.props);
    
}
DateFormat(date,json,tag){
  let aux=date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
  json[tag]=aux
}

defaultMutableHandle(e){
    this.props.multiHandle({to:e.target.name,value:e.target.value});
}
renderacademicLevel(){
  const academicLevels = 
  ['Primaria','Secundaria','Profesional','Post-grado','Otros...']
  return academicLevels.map((academicLevel) => {
    return(<option>{academicLevel}</option>)
  })
}
  render () {
    
    const inputGenerales =[
      {
        label:"Nombres",
        category:'textArea',
        name:'authorName',
        placeholder:'Nombre', 
        id:"id_name",           
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Apellidos",
        category:'textArea',
        name:'authorLastname',
        placeholder:'Apellidos', 
        id:"id_ap",           
        onChange:this.defaultMutableHandle,
      }
    ]
    const inputContacto =[
      {
        label:"Telefono principal",
        category:'textArea',
        name:'telefono',
        placeholder:'Telefono', 
        id:"id_telf",           
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Correo electronico",
        category:'textArea',
        name:'email',
        placeholder:'Email' ,
        id:"id_email",             
        onChange:this.defaultMutableHandle,
      },
      {
        label:"Nivel de estudios",
        category:'comboBox',
        name:"academicLevel",
        id:"id_selectStudyLevel",
        onChange:this.defaultMutableHandle,
        options:this.renderacademicLevel()
      }
    ]


    return (
      <div>
          <h1>Ingresa los datos del Autor y Co-autores</h1>
            
              
              <JCardForm
                arrayOfInputData={inputGenerales}
                cardHeadingText = "Datos Generales de los Autores"
                value = {this.props.authorName}
              />
              <JCardForm
                arrayOfInputData={inputContacto}
                cardHeadingText = "Datos de Contacto"
              />


      </div>
      
    )
  }
}
export default StepOneSendPropuesta;
var styles = {
  rotulos:{
    paddingRight: 80,
  }
}