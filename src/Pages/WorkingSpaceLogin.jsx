import React, { Component } from 'react';
import '../styles/style_signUp.css';

class WorkingSpaceLogin extends Component{
  constructor(props){

    super(props);
    this.state = {        
        /*new base de navegacion inherente del working space*/
        historyNavegation: [],
        lastChildComponent:null,
        /* fin */
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
      console.log("WSWillMount");
      this.state.nextChildComponentProps = this.props.nextComponentProps;
      this.state.nextChildComponent= this.props.nextComponent;
      
    }
    componentDidMount(){
        console.log("WSDidMount")
        let  page = sessionStorage.getItem("currentPage");
        console.log("page to redirect ",page);
    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.state.nextChildComponent  !== nextState.nextChildComponent){
            return true;
        }
        return false;

    }
    setterEvento(){
      
    }
  
    render() {
      return (
      <div>
      <this.state.nextChildComponent  
       nextChildComponentProps={this.state.nextChildComponentProps}
        onNextChildComponentChange={this.handleNextChildComponentChange}
        onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
        />
    </div>
    );}
  }
  
  export default WorkingSpaceLogin;
  