import React, {Component} from 'react';
import WorkingSpace from './WorkingSpaceLogin';
import LoginForm from './LoginForm';

class LoginPage extends Component{
  state = {
    workingSpace : WorkingSpace,
    initialComponent: LoginForm,
    initialComponentProps:{},
    xd: null
  }

  componentWillMount(){
    console.log("AppWillMount")
    
  }

  render() {
    
    return (
      <div>
        <div className="component-header"  width="300"  style={{paddingLeft:20}}>
            <a className="component-logo customizable chart" href='/' title="Volver a pagina principal">
                <img className="component-logo" src="logo.png"  width="240"/> 
            </a>
          </div> 
        <this.state.workingSpace 
        nextComponent={this.state.initialComponent}
        nextComponentProps = {this.state.initialComponentProps}  
        />
    </div>
    
    
  );}
}

export default LoginPage;
