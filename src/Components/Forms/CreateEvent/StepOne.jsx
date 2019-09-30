import React from 'react'

export default class StepOne extends React.Component {
  constructor () {
    super()
    this.state = { 
      firstName:'', 
      lastName:''
    }
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
  }

  handleFirstNameChanged (event) {
    this.setState({firstName: event.target.value})
  }

  handleLastNameChanged (event) {
    this.setState({lastName: event.target.value})
  }

  componentWillUnmount() {
    localStorage.setItem('someSavedState', JSON.stringify(this.state))
  }

  componentWillMount() {
    var  rehydrate = JSON.parse(localStorage.getItem('someSavedState'))
    this.setState(rehydrate)
  }

  render () {
    return (
      <div>
        <div className='row'>
          <div className='six columns'>
            <label>First Name</label>
            <input
              className='u-full-width'
              placeholder='First Name'
              type='text'
              onChange={this.handleFirstNameChanged}
              value={this.state.firstName}
              autoFocus
            />
          </div>
        </div>
        <div className='row'>
          <div className='six columns'>
            <label>Last Name</label>
            <input
              className='u-full-width'
              placeholder='Last Name'
              type='text'
              onChange={this.handleLastNameChanged}
              value={this.state.lastName}
            />
          </div>
        </div>
      </div>
    )
  }
}

