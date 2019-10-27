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
        return true;

    }
    setterEvento(){
      
    }
  
    render() {
      return (
        <this.state.currentComponent/>
    );}
  }
  
  export default WorkingSpace;
  