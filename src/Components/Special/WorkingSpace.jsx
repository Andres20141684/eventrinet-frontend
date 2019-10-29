import React, {Component, useCallback} from 'react';
import NewIni from "../General/NewIni";
import { thisExpression } from "@babel/types";
import BannerTop from '../General/bannerTop';
/****************************************************************
 *           Estoy en construccion no me mires asi putho!!!! XD
 ***************************************************************/
class WorkingSpace extends Component{
  constructor(props){
    super(props);
      this.state = {
        bannTop : BannerTop,

        nextChildComponent: null,
        nextChildComponentProps:{}
    }
    this.handleNextChildComponentChange=this.handleNextChildComponentChange.bind(this);
    this.handleNextChildComponentChangeProps=this.handleNextChildComponentChangeProps.bind(this);
  }
  handleNextChildComponentChange(_nextChildComponent){
      this.setState(
        {nextChildComponent: _nextChildComponent}
      );
  }
  handleNextChildComponentChangeProps(_nextChildComponentProps){
      this.setState(
        {nextChildComponentProps: _nextChildComponentProps}
      );
  }
    setfutureProps(){
        /**los props del sgt componente ADIOS PAGINAS XD */
    }
    componentWillMount(){
      console.log("WSWillMount")
      this.state.nextChildComponent=
      this.props.nextComponent;
      
      
    }
    componentDidMount(){
        console.log("WSDidMount")
        
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.nextChildComponent 
          !== nextState.nextChildComponent){
            return true;
        }
        return false;

    }
    setterEvento(){
      
    }
  
    render() {
      return (
        <div>
    <div className="App">
      <this.state.bannTop 
        onNextChildComponentChange={this.handleNextChildComponentChange}
        onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
      /> 
      <div>
      <this.state.nextChildComponent
        nextChildComponent={this.state.nextChildComponent}
        nextChildComponentProps={this.state.nextChildComponentProps}
        onNextChildComponentChange={this.handleNextChildComponentChange}
        onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
        />
    </div>
    </div>
    <div>
    </div></div>
    );}
  }
  
  export default WorkingSpace;
  