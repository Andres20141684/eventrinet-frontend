import React, {Component} from 'react';
import NewIni from "../General/NewIni";
import { thisExpression } from "@babel/types";
/****************************************************************
 *           Estoy en construccion no me mires asi putho!!!! XD
 ***************************************************************/
class WorkingSpace extends Component{
    state = {
        futureprops:{

        },
        lastComponent:null,
        nextComponent: null,
        currentComponent: NewIni
    }

    setfutureProps(){

    }
    componentWillMount(){
      console.log("WSWillMount")
      
    }
    componentDidMount(){
        console.log("WSDidMount")
        
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.nextComponent !== nextState.nextComponent){
            return true;
        }
        return false;

    }
    setterEvento(){
      
    }
  
    render() {
      return (
        <this.state.currentComponent/>
    );}
  }
  
  export default WorkingSpace;
  