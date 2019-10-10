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
    chipData.push(aux)
    props.handleadd(chipData,props.tag)
  };

  const handleDelete = chipToDelete => () => {
    chipData=chipData.filter(chipData=>chipData[props.label]!==chipToDelete[props.label]);
    //setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    props.handleadd(chipData,props.tag)
  };

  const handleChange= (e) =>{
    aux={[props.label]: e.target.value }
    
  }

  return (
    <div>
      <Row> 
      <div class="input-group mb-3">
        <input 
            type="email" 
            name='email'
            class="form-control" 
            id="id_email"
            aria-label="Recipient's username" 
            aria-describedby="basic-addon2"
            onChange={handleChange}
            style={{width: 360,position:"relative"}}/>
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
      </Row>
      {chipData.map((data, index) => {
              return (
                <Chip
                  key={index}
                  label={data[props.label]}
                  onDelete={handleDelete(data)}
                />
              );
            })}
      
    </div>
  );
}

