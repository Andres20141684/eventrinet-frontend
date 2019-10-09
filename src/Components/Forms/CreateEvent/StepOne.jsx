import React from 'react'
import 'react-simple-datepicker/dist/index.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "react-datepicker/dist/react-datepicker.css";
import ArrayOfChips from './ArrayOfChips';
import '../../../styles/style_sheets.css'



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
                  onChange={(e)=> this.props.handleChange2(e,"fIni")}
                  />
          </Col>
          <Col><label style={styles.rotulos}>Fecha Fin: </label> </Col>
          <Col> <DatePicker
                selected={this.props.fechaFE}
                minDate={this.props.fechaIE}
                onChange={(e)=> this.props.handleChange2(e,"fFin")}
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
        <ArrayOfChips lista={this.props.categorias} handleadd={this.props.handleChange2} tag="categorias"/>
        <br></br>
      </Container>
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
