import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import EventPageTable from '../Components/Jtable/EventPageTable';
import { thisExpression } from '@babel/types';
import frmEventNew from '../Components/Forms/frmEventNew';
import StepThree_copy from '../Components/Forms/CreateEvent/StepThree';
import { FormGroup } from '@material-ui/core';
import Form from 'react-bootstrap/Form';

class Prueba extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        date: new Date(),    
        prueba: StepThree_copy,
    };
    
    render(){
        return(            
        <div> 
            <this.state.bannTop />
            <this.state.prueba />
            <this.state.bannBot/> 
        </div>)
    }
}
export default Prueba;
