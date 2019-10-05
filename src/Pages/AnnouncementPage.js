import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom';
import Organizador_ActiveEventsTable from '../Components/Jtable/Organizador_ActiveEventsTable';

import Dashboard from '../Components/Dashboard';
import { thisExpression } from '@babel/types';

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
            <h1>
            <font size="38">
                Inscripción a convocatorias
                </font></h1>
            <Dashboard/>
            <BannerBottom/>
        </div>
        )
    }
}
export default AnnouncementPage;