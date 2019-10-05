import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class StepOne extends React.Component {

  render () {
    return (
      <div class="card">
        <div class="panel-title">General</div>
          <Form>
            <FormGroup>
              <label style={styles.rotulos}>Nombre </label>
              <input
                className='u-full-width'
                name='nombre'
                placeholder='Nombre'
                type='text'
                onChange={this.props.handleChange}
                value={this.props.nombre}
                autoFocus
              />
            </FormGroup>
            <FormGroup>
              <label style={styles.rotulos}>Descripcion</label>
              <textarea
                rows='4'
                cols='60'
                className='u-full-width'
                name='descripcion'
                placeholder='Descripcion'
                type='text'
                onChange={this.props.handleChange}
                value={this.props.descripcion}/>
            </FormGroup>
            <FormGroup>
                <label style={styles.rotulos}>Lugar </label>
                <input
                  className='u-full-width'
                  name='lugar'
                  placeholder='Lugar'
                  type='text'
                  onChange={this.props.handleChange}
                  value={this.props.lugar}
                />
            </FormGroup>

            <FormGroup>
                <label style={styles.rotulos}>Precios </label>
                <Row>
                    <Col>
                        <span>Sube la tarifa de precios. El archivo debe ser en formato Excel (extensión .xlx, .xlxs)</span>
                    </Col>
                    <Col>
                      <Button    
                        variant="contained" 
                        color="primary"   
                        name='precios'
                        placeholder='precios'
                        class="mybutton"
                        onChange={this.props.handleChange}
                        style={{ height:46}}
                        value={this.props.lugar}>
                        Agregar Tarifa...
                      </Button>
                    </Col>
                </Row>
            </FormGroup>
          </Form>
      </div>
    )
  }
}

var styles = {
  rotulos:{
    paddingRight: 80,
  }
}