import React, { Component } from 'react';
import { thisExpression } from '@babel/types';
import './../../styles/styles_Jmodal.css';
class JModal extends Component {
    constructor(props){
        super(props);
        this.state={
          id:"myModal",
          head:"Modal Heading",
          body:null,
          footer: null
        }
      
    }
    componentWillMount(){
        console.log(this.props);
        if (this.props.body !==null){
            this.setState({body:this.props.body});
        }
        if ( this.props.head !==null){
            this.setState({head:this.props.head});
        }
        
        if (this.props.footer !==null){
            this.setState({footer:this.props.footer});
        }
        if (this.props.id !==null){
            this.setState({id:this.props.id});
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("recivi props de:",this.nextProps);
        this.setState({body:nextProps});
    }
    renderBody(){
        if(this.state.body == null){
            return(
                <div class="modal-body">
                    NULLLL
                </div>
            );
        }else{
            return(<div class="modal-body">
                <this.state.body/>
            </div>);
        }
    }
    renderFooter(){
        if(this.state.footer == null){
            return(
                <div class="modal-footer">
                    <h1>NULLLL</h1>
                </div>
            );
        }else{
            return(
            <div class="modal-footer">
                <this.state.footer/>   
            </div>);
        }
    }
    render(){
        console.log("renderin ****",this.props);
        return(
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="vertical-alignment-helper">
                    <div class="modal-dialog vertical-align-center">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h4 class="modal-title" id="myModalLabel">{this.props.head}</h4>
                            <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                            </button>
                            

                                
                            </div>
                                <div><this.props.body/></div>
                                <div><this.props.footer/></div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default JModal;
/*
<div class="modal-footer">
    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary">Save changes</button>
</div>

*/