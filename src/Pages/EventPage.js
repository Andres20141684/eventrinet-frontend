import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import frmCreateEvent from '../Components/Forms/frmCreateEvent'
import { thisExpression } from '@babel/types';


class EventPage extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected",
        prueba: frmCreateEvent

      }
    render(){
        return(
        <div> 
            <this.state.bannTop />
            <h1>QueryAllEventos</h1>
            <this.state.prueba/>
        </div>)
    }
}
export default EventPage;