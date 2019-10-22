import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import NewEventPage from './Pages/NewEventPage';
import AnnouncementPage from './Pages/AnnouncementPage';
/**************************************/
import OrganActiveEvents from './Pages/OrganActiveEvents';
import PresiCalificacionFinalPapers from './Pages/PresiCalificacionFinalPapers';
import PresidentEvents from './Pages/PresidentEvents';
import EvaluadorEventos from './Pages/EvaluadorEventos';
import Create_EventStep3 from './Pages/Create_EventStep3';
import Prueba from './Pages/Prueba';
import Login from './Pages/Login';
import SelectedEvent from './Pages/SelectedEvent';
import EventInscriptionPage from './Pages/EventInscriptionPage';
import PropoMyProposals from './Pages/ProposerMyProposals';
import ProposerDetailProposal from './Pages/ProposerDetailProposal';
import SignUp from './Pages/SignUp';
/************************************* */
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
//REVISAR NOMENCATLURA DE ROUTES

import $ from 'jquery';


ReactDOM.render(<Router>
                    <Route path='/' exact component={App}/>
                    <Route path='/organizerNewEvent' exact component={NewEventPage} />
                    <Route path='/announcements' exact component={AnnouncementPage} />
                    
                    <Route path='/propoMyProposals' exact component={PropoMyProposals} />
                    <Route path='/propDetailProposal' exact component={ProposerDetailProposal} />
                    
                    <Route path='/organActiveEvents' exact component={OrganActiveEvents} />
                    <Route path='/presidentEvents' exact component={PresidentEvents} />
                    <Route path='/PresiCalificacionFinalPapers' exact component={PresiCalificacionFinalPapers} />
                    
                    <Route path='/EvaluadorEventos' exact component={EvaluadorEventos} />
                    <Route path='/createEventStep3' exact component={Create_EventStep3} />
                    <Route path='/prueba' exact component={Prueba} />                    
                    <Route path='/login' exact component={Login} />
                    <Route path='/SelectedEvent' exact component={SelectedEvent} />
                    <Route path='/EventInscriptionPage' exact component={EventInscriptionPage} />
                    
                    <Route path='/signUp' exact component={SignUp} />
                    </Router>,
                 document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

