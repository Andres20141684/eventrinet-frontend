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
        <br></br>
        <Row xs={5} sm={5}>
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
        <br></br>
        <Row xs sm>
          <Col>
          <label style={styles.rotulos}>Descripcion</label>
          </Col>
          <Col>
          <textarea
              rows='4'
              cols='50'
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
        <br></br>
        <Row xs sm>
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
        <br></br>
        <Row xs sm>
          <Col> <label style={styles.rotulos}>Fecha Inicio: </label> </Col>
          <Col> <DatePicker
                  selected={this.props.fechaIE}
                  minDate={new Date()}
                  onChange={this.props.handleDate}
                  />
          </Col>
          <Col><label style={styles.rotulos}>Fecha Fin: </label> </Col>
          <Col> <DatePicker
                selected={this.props.fechaFE}
                minDate={this.props.fechaIE}
                onChange={this.props.handleDate2}
                />
          </Col>
        </Row>
        <br></br>
      </Container>
      </div>
      <div class="panel panel-default">
      <Container>
        <h1>Categorias</h1>
        <br></br>
        <ArrayOfChips lista={this.props.categorias} handleadd={this.props.handleCategoryadd}/>
        <br></br>
      </Container>
      </div>
      <div class="panel panel-default">
        <Container>
        <h1>Duracion Convocatoria</h1>
        <br></br>
        <Row>
          <Col><label style={styles.rotulos}>Fecha Inicio: </label></Col>
          <Col> <DatePicker
                selected={this.props.fechaIC}
                minDate={new Date()}
                onChange={this.props.handleDate3}
                />
          </Col>
          <Col><label style={styles.rotulos}>Fecha Inicio: </label></Col>
          <Col> <DatePicker
                  selected={this.props.fechaFC}
                  minDate={this.props.fechaIC}
                  onChange={this.props.handleDate4}
                  />
          </Col>
        </Row>
        </Container>
        <br></br>
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