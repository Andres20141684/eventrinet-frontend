import React, { Component } from 'react';
import BannerTop from '../Components/General/bannerTop';
import BannerBottom from '../Components/General/bannerBottom'
import frmEventNew from '../Components/Forms/frmEventNew'

class NewEventPage extends Component{
    state = {
        bannTop : BannerTop,
        bannBot : BannerBottom,
        formProceso: frmEventNew
      }

    render(){
        return(
        <div> 
            <this.state.bannTop />
            <div ><this.state.formProceso/></div>
            <this.state.bannBot/>
        </div>)
    }
}
export default NewEventPage;