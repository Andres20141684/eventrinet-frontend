import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import EventPageTable from '../Components/Jtable/EventPageTable';

class EventPage extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
      }
    render(){
        return(
        <div> 
            <this.state.bannTop />
            <h1>QueryAllEventos</h1>
            <this.state.bannBot/>
        </div>)
    }
}
export default EventPage;