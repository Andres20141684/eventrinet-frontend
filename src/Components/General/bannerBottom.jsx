import React, { Component } from 'react';
import '../../styles/Jtab.css'; 
class BannerBottom extends Component{
    state = {
      role: null
    }
    render(){
      return (
        
        <div id="bannerBot" style={styles.banner}> 
        
          <footer role="contentinfo" class="footer" ng-class="::{'footer--process': process}">
            <div ng-hide="::process" class="footer-content">
              <div class="container">
                
                <div class="hidden-xs  footer-contentLinks">
                <div class="row">
                  <div class="col-xs-3  col-sm-3  col-md-3">
                    <h3 class="footer-headLineH3"> Conócenos </h3>
                    <ul class="footer-unorderedList">
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="/es_pe/conocenos/" target="_self" title="Sobre nosotros"> Sobre nosotros </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="/es_pe/prensa/" target="_self" title="Sala de Prensa"> Sala de Prensa </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="Sostenibilidad"> Sostenibilidad </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="Medios de pago"> Medios de pago </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="Preguntas frecuentes"> Preguntas frecuentes </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="Relación con inversionistas"> Relación con inversionistas </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="Trabaja con nosotros"> Trabaja con nosotros </a> </li>
                    </ul>
                  </div>
                  <div class="col-xs-3  col-sm-3  col-md-3">
                    <h3 class="footer-headLineH3"> Transparencia </h3>
                    <ul class="footer-unorderedList">
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="Condiciones del contrato de Eventos"> Condiciones del contrato de Eventos </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="Seguridad y privacidad"> Seguridad y privacidad </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="Términos de uso"> Términos de uso </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="Manejo masivo de evento"> Manejo masivo de eventos </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="Compra seguro"> Compra seguro </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="Medios de Pago premium"> Medios de Pago premium </a> </li>
                    </ul>
                  </div>
                  <div class="col-xs-3  col-sm-3  col-md-3">
                    <h3 class="footer-headLineH3"> Portales asociados </h3>
                    <ul class="footer-unorderedList">
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="EVENTRINET Cargo"> EVENTRINET Asesorias </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="EVENTRINET Trade"> EVENTRINET Trade </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="EVENTRINET Cloud">  EVENTRINET Cloud</a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_self" title="EVENTRINET events international"> EVENTRINET events international </a> </li>
                    </ul>
                  </div>
                  <div class="col-xs-3  col-sm-3  col-md-3">
                    <h3 class="footer-headLineH3"> Links de interés </h3>
                    <ul class="footer-unorderedList">
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="Call for Papers UK"> Call for Papers UK </a> </li>
                      <li class="footer-unorderedItem--links"> <a class="footer-unorderedLink footer-unorderedLink--links" href="#" target="_blank" title="Amazon Web Services"> AWS </a> </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="separatorSSJ">
                <div class="divider div-transparent"></div>
              </div>

              <div class="row footer-socialRow">
                <div class="footer-awardsAndCerts hidden-xs hidden-sm col-md-6 col-lg-6">
                <div class="footer-awardsAndCertsBlock">
                  <h4 class="footer-headLineH4">Sitio certificado por:</h4>
                  <ul class="footer-unorderedList footer-unorderedList--awards">
                  <li class="footer-unorderedItem--awards"> 
                  <a class="footer-awardsLink" 
                    href="https://www.pucp.edu.pe" 
                      target="_blank" 
                        title="Secured"> 
                  <img class="footer-processCertificateImage" 
                  data-ptm-src="piruleta.ico" 
                  alt="PUCP LOGO"/> <span class="sr-only">Secured</span> </a> </li>
                  </ul>
                </div>
                <div class="footer-awardsAndCertsBlock">
                  <h4 class="footer-headLineH4">Premios:</h4>
                  <ul class="footer-unorderedList footer-unorderedList--awards">
                    <li class="footer-unorderedItem--awards"> <a class="footer-awardsLink" href="#" target="_self" title="Premios"> <img class="footer-processCertificateImage" data-ptm-src="#" alt="Premios"/> <span class="sr-only">Premios</span> </a> </li>
                  </ul>
                </div>
                </div>
                <div class="footer-socialNetworkLinks col-xs-12 col-sm-12 col-md-6 col-lg-6">

                  <div class="footer-socialLinks">
                    <h4 class="footer-headLineH4 footer-socialHeader"> Síguenos en: <br/></h4>
                    <ul class="footer-unorderedList--social list-inline"> <br/>
                          <li><a href="https://www.facebook.com/pucp"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                          <li><a href="https://www.youtube.com/pucp"><i class="fa fa-youtube" aria-hidden="true"></i></a></li>
                          <li><a href="https://www.instagram.com/?hl=en"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                          <li><a href="https://www.pinterest.com/"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
                          <li><a href="https://twitter.com/?lang=en"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                          <li><a href="https://linkedin.com/?lang=en"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              </div>
            </div>

            <div class="footer-process">
              <div class="container container-md-height">
              <div class="row">

                <div class="footer-brand col-xs-5 col-sm-3 col-md-3 col-lg-3 col-sm-push-9 col-md-push-9 col-md-push-9">
                
                  <p class="footer-paragraph--copy footer-copyright footer-paragraph--smToBlock">
                  <a href="/" target="_self" title="Volver al home"> <img src="piruleta_loquisima.png" alt="Logo EVENTRINET" width="100"/> </a>
                  <br/>© 2019 EVENTRINET gestión de eventos Perú<br/>Todos los derechos reservados.</p>
                </div>

              </div>
              </div>
            </div>
          </footer>
          





        </div>
      );
    }
}
export default BannerBottom;

var styles = {
    banner:{
      backgroundColor: '#002D3D',
      paddintTop: 100,
      paddingBottom: 5,
      color:'#6CDCD6',
    
    }
}