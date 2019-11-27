import React, { Component } from 'react';
import { thisExpression } from '@babel/types';
import './../../styles/styles_Jmodal.css';
class JModal extends Component {
    componentDidMount(){
        
    }
    renderheader(){

    }
    renderBody(){

    }
    renderDefaultfooter=()=>{
        return(<><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button></>);
    }
    componentWillUnmount(){
        
        
    }
    render(){
        console.log("renderin ****",this.props);
        return(
            <div className="modal fade" id="JModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="vertical-alignment-helper">
                    <div className="modal-dialog vertical-align-center">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div class="container-fluid">
                                    <div className="row">
                                        <div class="col-sm-4" ><img src="piruleta_loquisima.png" className="img-fluid"  width="200"/></div>
                                        
                                        <div class="col-sm-7" ><h4 className="modal-title" id="myModalLabel">{this.props.head}</h4></div>
                                        
                                        <div class="col-sm-1" >
                                            <button type="button" class="close" data-dismiss="modal">
                                                <span aria-hidden="true">&times;</span>
                                                <span className="sr-only">Close</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='modal-body'>{this.props.body}</div>
                            <div className='modal-footer'>{this.props.footer || this.renderDefaultfooter}</div> 
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