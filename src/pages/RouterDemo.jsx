import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

const Home = () => <h1>Home</h1>;
const Archive = () => <h1>Archive</h1>;
const About = () => <h1>About</h1>;

const Demo = () => {
    return <BrowserRouter>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/archive" component={Archive}/>
            <Route path="/about" component={About}/>
        </div>
    </BrowserRouter>
};

export default Demo