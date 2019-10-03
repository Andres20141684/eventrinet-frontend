import React from 'react'
import 'react-simple-datepicker/dist/index.css';
export default class StepOne extends React.Component {

  render () {
    return (
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
      </div>
    )
  }
}

var styles = {
  rotulos:{
    paddingRight: 80,
  }
}