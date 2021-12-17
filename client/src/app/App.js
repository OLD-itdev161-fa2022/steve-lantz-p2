/*eslint-disable */
import React from 'react';
import {BrowserRouter as Route, Router, Switch } from 'react-router-dom';
import {Navbar} from '../components';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateMovie from '../components/CreateMovie/addMovie';



/*eslint-disable*/

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
            
               
                <Route path="/movies/create" exact component={CreateMovie} />
                
            </Switch>
        </Router>
    )
}






export default App
