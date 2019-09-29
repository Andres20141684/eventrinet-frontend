import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import EventPage from './Pages/EventPage';
import AnnouncementPage from './Pages/AnnouncementPage';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
//import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<Router>
                    <Route path='/' exact component={App}/>
                    <Route path='/events' exact component={EventPage} />
                    <Route path='/announcements' exact component={AnnouncementPage} />
                </Router>,
                 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
