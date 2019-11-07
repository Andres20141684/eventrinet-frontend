import React from "react";
import { Chip, TextField, MenuItem } from "@material-ui/core";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/style_sheets.css';


export default function ArrayOfChips(props) {
  var chipData =[];
  chipData= props.lista;
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
          /*
          chipData.push(aux)
          props.handleadd(chipData,props.tag)
          cancelCourse()*/
         }
      }else{
        console.log(aux)
        addElement()
        /*
        chipData.push(aux)
        props.handleadd(chipData,props.tag)
        cancelCourse()*/
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
    if(f===0) { // notice that there is a parenthesis after `id`.
        chipData.push(aux)
        //props.handleadd(chipData,props.tag)
        cancelCourse()
    }
  }

  const handleDelete = chipToDelete => () => {
    chipData=chipData.filter(chipData=>chipData[props.label]!==chipToDelete[props.label]);
    //setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
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
      <form id={props.tag} onSubmit={e => { e.preventDefault(); }}>
      <div class="input-group mb-3">
        <input 
            type={props.tag==="categorias"?null:"email"}
            value={props.aux}
            //name='email'
            class="form-control" 
            id="id_email"
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{width: 360/*,position:"relative"*/}}
            disabled={props.tag!=='presidente'?false:props.lista.length===0?false:true}/>
        <div class="input-group-append">
          <button 
            class="btn btn-outline-secondary add"
            variant="primary" 
            type='email' 
            onClick={handleSelect}
            disabled={props.tag!=='presidente'?false:props.lista.length===0?false:true}
            style={{backgroundColor:"002D3D"}}>Agregar</button>
            
        </div>
      </div>
      </form>
      
      </Row>
      {props.lista.map((data, index) => {
              return (
                <Chip
                  style={{fontSize:'20px'}}
                  key={index}
                  label={data[props.label]}
                  onDelete={handleDelete(data)}
                />
              );
            })}
      
    </div>
  );
}