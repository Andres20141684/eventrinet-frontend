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
        console.log(this.props.id_evento)
        return(
        <div> 
            <this.state.bannTop />
            <div style={{marginBottom:25}} >
                <this.state.formProceso/>
            </div>
            <this.state.bannBot/>
        </div>)
    }
}
export default NewEventPage;