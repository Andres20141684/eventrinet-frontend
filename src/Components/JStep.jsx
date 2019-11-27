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
import './../styles/JStep.css';

class JStep extends React.Component {
    constructor(props){
      super(props);
      this.state={
        arrayOfFases:[],
        numFases:4,
        faseActual:2,
        data:0,
      }
     
  }
  componentWillMount(){
    console.log("JStep props", this.props);
  
  }
 componentDidMount(){
   this.setState({data: this.props.data});
 }
  shouldComponentUpdate(nextState,nextProps){
    if(nextProps.data != this.props.data){
      return true;
    }
    return false;
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
    const inputArchivo=[
      
      {
        id:"drop_zone",
        category:'JUpload',
        onChange: this.handleOnLoad,
        fileNedded:this.props.fileNeeded,
        formato:"pdf",
        maxTamanio:100
      }

    ]
    const inputEntregable=[
      
      {
        id:"drop_zone",
        category:'JUpload',
        onChange: this.handleOnLoad,
        fileNedded:this.props.entregableNeeded,
        formato:"pdf",
        maxTamanio:100
      }

    ]
    return (
      <div id={this.props.id}>
      <h1>Fase : 3</h1>
      <JCardForm
          arrayOfInputData={inputCamposPers}
          cardHeadingText = "Informacion solicitada para la Fase:"
      />
      <JCardForm
          arrayOfInputData={inputArchivo}
          cardHeadingText = "Sube tu archivo : "
      />
      <JCardForm
          arrayOfInputData={inputEntregable}
          cardHeadingText = "Sube el entregabl de la fase : "
      />
        
      </div>
      )
  }
}
export default JStep;
