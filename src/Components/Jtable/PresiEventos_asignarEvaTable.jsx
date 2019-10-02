import React, { Component } from 'react'
import './../../styles/Jtab.css'
class AsignarEvaluadorTable extends Component {
   constructor(props) {
    
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      console.log("rzwetxrytcvygbuhnj"+this.props);
      
   }
   handleClick = () => {
    console.log('this is:', this);
  }
  
   renderTableData() {
        return this.state.chupetinesGA.map((element, index) => {
        const { id, name, age, email} = element //destructuring
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{email}</td>
                <td><button onClick={this.handleClick}> Activate Lasers </button></td>
            </tr>
        )
        })
    }
    renderTableHeader() {
        let header = Object.keys(this.state.chupetinesGA[0])
        return header.map((key, index) => {
           return <th key={index}>{key.toUpperCase()}</th>
        })
     }
  
     render() {
        this.state = this.props.data
        return (
            
           <div>
              <h1 id='title'>React Dynamic Table</h1>
              <table id='chupetinesGA'>
                 <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                 </tbody>
              </table>
           </div>
        )
     }
}

export default AsignarEvaluadorTable //exporting a component make it reusable and this is the beauty of react
