import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
//import NewEventPage from './Pages/NewEventPage';
import AnnouncementPage from './Pages/AnnouncementPage';
/**************************************/
//import OrganActiveEvents from './Pages/OrganActiveEvents';
//import PresiCalificacionFinalPapers from './Pages/PresiCalificacionFinalPapers';
//import PresidentEvents from './Pages/PresidentEvents';
//import EvaluadorEventos from './Pages/EvaluadorEventos';
//import Create_EventStep3 from './Pages/Create_EventStep3';
import LoginPage from './Pages/LoginPage';

//import SelectedEvent from './Pages/SelectedEvent';
//import EventInscriptionPage from './Pages/EventInscriptionPage';
//import ProposerMyProposals from './Pages/ProposerMyProposals';
//import ProposerDetailProposal from './Pages/ProposerDetailProposal';
import SignUp from './Pages/SignUp';
/************************************* */
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from './Components/Dashboard';
//REVISAR NOMENCATLURA DE ROUTES


ReactDOM.render(<Router>

                     <Route path='/'  exact component={App}/>
                     <Route path='/login' exact component={LoginPage} />
                     <Route path='/signUp' exact component={SignUp} />
                     
                  </Router>,
                 document.getElementById('root')
                 );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
