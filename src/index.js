import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter, Route} from 'react-router-dom';

import {Provider} from 'mobx-react';
import stores from './stores'

import Main from './pages/Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'

ReactDOM.render(
    <Provider user={stores.user}>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={Main}/>
                <Route path='/register' component={Register}/>
                <Route path='/login' component={Login}/>
                <Route path='/dashboard' component={Dashboard}/>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
