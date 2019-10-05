import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ArrayOfChips from './ArrayOfChips'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

export default class StepOne extends React.Component {
 
  render () {
    return (
      <div>
        <div class="panel panel-default">
        <Container>
          <h1>Datos Generales</h1>
        <Row>
          <Col>
          <label style={styles.rotulos}>Nombre </label>
          </Col>
          <Col>
          <input
              className='u-full-width'
              name='nombre'
              placeholder='Nombre'
              type='text'
              onChange={this.props.handleChange}
              value={this.props.nombre}
              autoFocus
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <label style={styles.rotulos}>Descripcion</label>
          </Col>
          <Col>
          <textarea
              rows='4'
              cols='60'
              className='u-full-width'
              name='descripcion'
              placeholder='Descripcion'
              type='text'
              onChange={this.props.handleChange}
              value={this.props.descripcion}
              autoFocus
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <label style={styles.rotulos}>Lugar </label>
          </Col>
          <Col>
          <input
              className='u-full-width'
              name='lugar'
              placeholder='Lugar'
              type='text'
              onChange={this.props.handleChange}
              value={this.props.lugar}
              autoFocus
            />
          </Col>
        </Row>
        <Row>
          <Col>Fecha Inicio: </Col>
          <Col> <DatePicker
                  name = 'fechaIE'
                  selected={this.props.fechaIE}
                  minDate={new Date()}
                  onChange={this.props.handleDate}
                  />
          </Col>
          <Col>Fecha Fin:</Col>
          <Col> <DatePicker/>
          </Col>
        </Row>
      </Container>
      </div>
      <div class="panel panel-default">
        <h1>Categorias</h1>
        <ArrayOfChips {... this.props}/>
      </div>
      <div class="panel panel-default">
        <h1>Duracion Convocatoria</h1>
        <Row>
          <Col>Fecha Inicio: </Col>
          <Col> <DatePicker/>
          </Col>
          <Col>Fecha Fin:</Col>
          <Col> <DatePicker/>
          </Col>
        </Row>
      </div>
      </div>
    )
  }
}

var styles = {
  rotulos:{
    paddingRight: 80,
  }
}

/*
<div className='container' > General
        <div className='row'>
          <div className='two columns' >
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
          </div>
        </div>
        <div className='row'>
          <div className='six columns'>
            <label style={styles.rotulos}>Descripcion</label>
            <textarea
              rows='4'
              cols='60'
              className='u-full-width'
              name='descripcion'
              placeholder='Descripcion'
              type='text'
              onChange={this.props.handleChange}
              value={this.props.descripcion}
              autoFocus
            />
          </div>
        </div>
        <div className='row'>
          <div className='two columns' >
            <label style={styles.rotulos}>Lugar </label>
            <input
              className='u-full-width'
              name='lugar'
              placeholder='Lugar'
              type='text'
              onChange={this.props.handleChange}
              value={this.props.lugar}
              autoFocus
            />
          </div>
        </div>
      </div>*/