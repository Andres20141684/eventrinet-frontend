import React, { Component } from 'react';
import { thisExpression } from '@babel/types';
import './../../styles/styles_Jmodal.css';
class JModal extends Component {
    
    render(){
        console.log("renderin ****",this.props);
        
        return(
            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="vertical-alignment-helper">
                    <div className="modal-dialog vertical-align-center">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title" id="myModalLabel">{this.props.head}</h4>
                            <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                            </button>
                            </div>
                            <div className='modal-body'>{this.props.body}</div>
                            <div className='modal-footer'>{this.props.footer}</div> 
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