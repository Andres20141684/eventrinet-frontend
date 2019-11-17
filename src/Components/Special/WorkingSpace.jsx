import React, {Component, useCallback} from 'react';
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
        idUser : -1,
        Usuario: null,
        bannTop : BannerTop,
        /*new: base de navegacion inherente del working space*/
        historyNavegation: [],
        lastChildComponent:null,
        /* fin -> aun no conectado pero ya casi*/
        nextChildComponent: null,
        nextChildComponentProps:{ idUser:0,Usuario:null}
    }
    this.getDataUser=this.getDataUser.bind(this);
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
      this.state.nextChildComponentProps.Usuario = this.props.Usuario;
  }
    setfutureProps(){
        /**los props del sgt componente ADIOS PAGINAS XD */
    }
    getDataUser(){
      
    }
    componentWillMount(){
      window.scrollTo(0, 0);
      this.setState({Usuario: this.props.Usuario});
      this.state.nextChildComponentProps = this.props.nextComponentProps;
      this.state.nextChildComponent= this.props.nextComponent;
      console.log("WSWillMount ***");
      console.log("WSWillMount -> props: ",this.state.nextChildComponentProps);
      console.log("WSWillMount -> comp : ",this.state.nextChildComponent);
      let page = sessionStorage.getItem("currentPage");

      try{
        if(!(page === null)){
          console.log("page to redirect ",page);
          if (page == "InscriptionEvent"){
            this.state.nextChildComponent=InscriptionEvent;
          }
          if (page == "SendProposal"){
            this.state.nextChildComponent=SendProposal;
          }
          let alternativeProps =  sessionStorage.getItem("currentProps");
          //console.log("currentProps to redirect ",alternativeProps);
          //console.log("currentProps to redirect ",JSON.parse(alternativeProps));
          console.log("currentProps to redirect ", JSON.parse(alternativeProps));
          //console.log("currentProps to redirect ",JSON.stringify(JSON.parse(alternativeProps)));
          if(!(alternativeProps === null)){
  
            this.state.nextChildComponentProps=JSON.parse(alternativeProps);
            this.state.nextChildComponentProps.idUser= this.props.Usuario.idUser;
            sessionStorage.setItem("currentProps",null);
          }
          sessionStorage.setItem("currentPage",null);
          /** esto es porque ya use los props y page que estaban en memoria */
        }else{
          console.log("page to redirect ","NULLLLLL");
        }
      }catch(e){

      }
      
      console.log("WSWillMount");
      console.log("WSWillMount -> props: ",this.state.nextChildComponentProps);
      console.log("WSWillMount -> comp : ",this.state.nextChildComponent);
    }
    componentDidMount(){
        

    }

    shouldComponentUpdate(nextProps,nextState){
        if(this.state.nextChildComponent  !== nextState.nextChildComponent){
          console.log("seteo Usuario",this.state.nextChildComponentProps.Usuario);
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
      nextChildComponentProps={this.state.nextChildComponentProps}
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
  