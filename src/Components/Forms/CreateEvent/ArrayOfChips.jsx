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
    chipData=chipData.filter(chipData=>chipData.descripcion!==chipToDelete.descripcion);
    //setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    props.handleadd(chipData,props.tag)
  };

  const handleChange= (e) =>{
    aux={descripcion: e.target.value }
    
  }

  return (
    <div>
      <Row>
          <Col>
          <input placeholder="Ingrese correo electronico" onChange={handleChange}/> 
          </Col>
          <Col>
          <button class="btnAdd" variant="primary" type='button' onClick={handleSelect} >Agregar</button>
          </Col>
      </Row>
      {chipData.map((data, index) => {
              return (
                <Chip
                  key={index}
                  label={data.descripcion}
                  onDelete={handleDelete(data)}
                />
              );
            })}
      
    </div>
  );
}

