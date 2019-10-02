import React from "react";
import { Chip, TextField, MenuItem } from "@material-ui/core";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Test(props) {
  const [chipData, setChipData] = React.useState(props.comite1);
  var aux='';
  // This come from the select form onChange
  const handleSelect = ()=> {
    {setChipData([...chipData, aux]);
    props.handleComiteadd(chipData)}
  };

  const handleDelete = chipToDelete => () => {
    {setChipData(chips => chips.filter(chips => chips.key !== chipToDelete.key));
    props.handleComiteadd(chipData)}
  };

  const handleChange= (e) =>{
    aux={ key: e.target.value, label: e.target.value }
  }

  return (
    <div>
      <Row>
          <Col>
          <Form.Control placeholder="Ingrese correo electronico" onChange={handleChange}/>
          </Col>
          <Col>
          <Button variant="primary" onClick={handleSelect} >Agregar</Button>
          </Col>
      </Row>
      {chipData.map((data, index) => {
        return (
          <Chip
            key={data.key + index}
            label={data.label}
            onDelete={handleDelete(data)}
          />
        );
      })}
    </div>
  );
}

/*<TextField select value={userValues} onChange={e => handleSelect(e)} >
        {userArray.map(option => (
          <MenuItem key={option.key} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>*/