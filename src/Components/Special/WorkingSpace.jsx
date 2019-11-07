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
      
      this.state.nextChildComponentProps = this.props.nextComponentProps;
      this.state.nextChildComponent= this.props.nextComponent;
      console.log("WSWillMount");
      console.log("WSWillMount -> props: ",this.state.nextChildComponentProps);
      console.log("WSWillMount -> comp : ",this.state.nextChildComponent);
      let page = sessionStorage.getItem("currentPage");

      if(!(page === null)){
        console.log("page to redirect ",page);
        if (page == "InscriptionEvent"){
          this.state.nextChildComponent=InscriptionEvent;
        }
        if (page == "SendProposal"){
          this.state.nextChildComponent=SendProposal;
        }
        let alternativeProps =  sessionStorage.getItem("currentProps");
        console.log("currentProps to redirect ",alternativeProps);
        //console.log("currentProps to redirect ",JSON.parse(alternativeProps));
        console.log("currentProps to redirect ", JSON.parse(alternativeProps));
        //console.log("currentProps to redirect ",JSON.stringify(JSON.parse(alternativeProps)));
        if(!(alternativeProps === null)){
          this.state.nextChildComponentProps=JSON.parse(alternativeProps);
        }
      }else{
        console.log("page to redirect ","NULLLLLL");
      }
      console.log("WSWillMount");
      console.log("WSWillMount -> props: ",this.state.nextChildComponentProps);
      console.log("WSWillMount -> comp : ",this.state.nextChildComponent);
    }
    componentDidMount(){
        /*console.log("WSDidMount")
        let  page = sessionStorage.getItem("currentPage");
        console.log("page to redirect ",page);
        if (page == "InscriptionEvent"){
            this.handleNextChildComponentChange(InscriptionEvent);
        }
        if (page == "SendProposal"){
          dc
          this.handleNextChildComponentChangeProps(this.state.nextChildComponentProps);
          this.handleNextChildComponentChange(SendProposal);
        }*/
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
  