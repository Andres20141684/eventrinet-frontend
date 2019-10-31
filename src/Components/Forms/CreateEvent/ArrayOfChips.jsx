import React from "react";
import { Chip, TextField, MenuItem } from "@material-ui/core";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../../styles/style_sheets.css';


export default function ArrayOfChips(props) {
  let chipData =[];
  chipData= props.lista;
  var aux='';
  // This come from the select form onChange
  const handleSelect = ()=> {
    //setChipData([...chipData, aux]);
    if(aux!==''){
      chipData.push(aux)
    props.handleadd(chipData,props.tag)
    console.log(aux)
    cancelCourse()
    }
  };

  const handleDelete = chipToDelete => () => {
    chipData=chipData.filter(chipData=>chipData[props.label]!==chipToDelete[props.label]);
    //setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    props.handleadd(chipData,props.tag)
  };

  const handleChange= (e) =>{
    aux={[props.label]: e.target.value }
    console.log(aux)
  }

  const cancelCourse = () => { 
    document.getElementById(props.tag).reset();
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
            type="email"
            defaultValue=''
            //value={data}
            //name='email'
            class="form-control" 
            id="id_email"
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{width: 360/*,position:"relative"*/}}/>
        <div class="input-group-append">
          <button 
            class="btn btn-outline-secondary add"
            variant="primary" 
            type='button' 
            onClick={handleSelect}
            style={{backgroundColor:"002D3D"}}
            type="button">Agregar</button>
        </div>
      </div>
      </form>
      
      </Row>
      {chipData.map((data, index) => {
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