import React from "react";
import { Chip, TextField, MenuItem } from "@material-ui/core";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/style_sheets.css';


export default function ArrayOfChips(props) {
  var chipData =[]; 
  chipData= [...props.lista];
  //var auxLocal=props.aux
  var aux={[props.label]:props.aux}
  // This come from the select form onChange
  const handleSelect = ()=> {
    //setChipData([...chipData, aux]);
    if(props.aux!==''){
      console.log(aux)
      if(props.tag!=="categorias"){
        let lastAtPos = aux[props.label].lastIndexOf('@');
        let lastDotPos = aux[props.label].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && aux[props.label].indexOf('@@') == -1 && lastDotPos > 2 && (aux[props.label].length - lastDotPos) > 2)) {
           console.log('jeremi')
         }else{
          console.log(aux)
          addElement()
         }
      }else{
        console.log(aux)
        addElement()
      }
        
    }
  };

  const addElement=()=>{
    console.log(props.lista)
    console.log(props.lista.indexOf(aux))
    var f=0;
    for(let i=0; i <props.lista.length;i++){
      if(JSON.stringify(props.lista[i])===JSON.stringify(aux)){
        f=1;
        console.log("Numero de iteracion: ")
        console.log(i)
        break;
      }
    }
    if(f===0) {
        chipData.push(aux)
        if(chipData.length>0){
          props.handleadd(1,'CategoriasNulo')
        }
        props.handleadd(chipData,props.tag)
        cancelCourse()
    }
  }

  const handleDelete = chipToDelete => () => {
    chipData=chipData.filter(chipData=>chipData[props.label]!==chipToDelete[props.label]);
    //setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    if(chipData.length===0){
      props.handleadd(0,'CategoriasNulo')
    }
    props.handleadd(chipData,props.tag)
  };

  const handleChange= (e) =>{
    console.log(props)
    aux={[props.label]: e.target.value }
    props.handlechange(e,props.auxLabel)
  }

  const cancelCourse = () => { 
    //document.getElementById(props.tag).reset();
    var e={target:{value:''}};
    props.handlechange(e,props.auxLabel)
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSelect()
    }
  }

  return (
    <div>
      <Row> 
      <form id={props.tag} onSubmit={e => { e.preventDefault(); }} style={{width:'100%'}}>
      <div class="input-group mb" style={{paddingBottom:'10px'}} >
        <input 
            type={props.tag==="categorias"?null:"email"}
            value={props.aux}
            //name='email'
            className="form-control" 
            id="id_email"
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{width:"85%"}}
            //style={{width: 360/*,position:"relative"*/}}
            readOnly={props.rol===1}
            maxLength="50"/>
        <div class="input-group-append">
          <button 
            class="btn btn-secondary add"
            variant="primary" 
            type='email' 
            onClick={handleSelect}
            disabled={props.rol===1}
            style={{backgroundColor:"002D3D", color:'white', borderTopRightRadius:'4px', borderBottomRightRadius:'4px'}}>Agregar</button>
        </div>
      </div>
      </form>
      
      </Row>
      {props.lista.map((data, index) => {
              return (
                <Chip
                  style={{fontSize:'16px'}}
                  key={index}
                  label={data[props.label]}
                  onDelete={handleDelete(data)}
                  disabled ={props.rol===1}
                />
              );
            })}
      
    </div>
  );
}