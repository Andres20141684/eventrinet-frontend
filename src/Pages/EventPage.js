import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import EventPageTable from '../Components/Jtable/EventPageTable';
import frmCreateEvent from '../Components/Forms/frmCreateEvent'
import { thisExpression } from '@babel/types';
import frmEventNew from '../Components/Forms/frmEventNew'

class EventPage extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected",
        prueba: frmEventNew
      }

    render(){
        return(
        <div> 
            <this.state.bannTop />
            <this.state.prueba/>
            <this.state.bannBot/>
        </div>)
    }
}
export default EventPage;