import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom';
import Organizador_ActiveEventsTable from '../Components/Jtable/Organizador_ActiveEventsTable';
class AnnouncementPage extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        msg: "NotConnected"
      }

    render(){
        return(
        <div> 
            <this.state.bannTop />
            <h1>QueryAllConvocatorias</h1>
        </div>)
    }
}
export default AnnouncementPage;