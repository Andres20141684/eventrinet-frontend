import React, {Component} from 'react';
import logo from './lollipop.svg';
import BannerTop from './Components/General/bannerTop';
import BannerBottom_ from './Components/General/bannerBottom';
import './App.css'; 
import { thisExpression } from '@babel/types';
import WorkingSpace from './Components/Special/WorkingSpace';
import NewIni from "./../src/Components/General/NewIni";
import EventDetail from './Components/EventDetail';
import SendProposal from './Components/SendProposal';
const Networking = require('./Network/Networking.js') ;


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      bannBot : BannerBottom_,
      workingSpace : WorkingSpace,
      msg: "Not Connected" ,
      initialComponent: NewIni,
      initialComponentProps:{},
      xd: null,
      pathGottenbyDunkUser:""
    }
    console.log(this.props);
    let str = this.props.location.search.split('?');
    console.log("splited: ",str[1]);
    if(this.props.location.search==='?eventrito'){
      this.state.initialComponent=SendProposal;
    }
    
    
  }
  

  componentWillMount(){
    console.log("AppWillMount");
  } 

  render() {
    
    return (
      <div>
        <div className="App">
          <div>
            <this.state.workingSpace 
              nextComponent={this.state.initialComponent}
              nextComponentProps = {this.state.initialComponentProps}
            />
          </div>
        </div>
        <this.state.bannBot/>
    </div>
  );}
}

export default App;
