import React, {Component, useCallback} from 'react';
import NewIni from "../General/NewIni";
import { thisExpression } from "@babel/types";
import BannerTop from '../General/bannerTop';
import InscriptionEvent from '../../Components/InscriptionEvent';
import SendProposal from '../../Components/SendProposal'


/****************************************************************
 *           Estoy en construccion no me mires asi putho!!!! XD
 ***************************************************************/
class WorkingSpace extends Component{
  constructor(props){

    super(props);
    this.state = {
        bannTop : BannerTop,
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
        if (page == "InscriptionEvent"){
            this.handleNextChildComponentChange(InscriptionEvent);
        }
        if (page == "SendProposal"){
          this.handleNextChildComponentChange(SendProposal);
        }
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
    <div className="App">
      <this.state.bannTop 
        onNextChildComponentChange={this.handleNextChildComponentChange}
        onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
        
      /> 
      <div>
      <this.state.nextChildComponent  
       nextChildComponentProps={this.state.nextChildComponentProps}
        onNextChildComponentChange={this.handleNextChildComponentChange}
        onNextChildComponentChangeProps={this.handleNextChildComponentChangeProps}
        />
    </div>
    </div>
    </div>
    );}
  }
  
  export default WorkingSpace;
  