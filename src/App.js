import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import './index.css';
import Nav from "./Components/Nav";
import Gallery from "./Components/Gallery";
import NotFound from "./Components/NotFound";
import SearchForm from './Components/SearchForm';

class App extends Component{

    render(){
        return (
                <BrowserRouter>
                    <div className="container">
                        <SearchForm />
                        <Nav />
                        <Switch>
                            <Route exact path="/" render={() => <Redirect to="/cats" />} />
                            <Route exact path="/:topic" render={() => <Gallery />} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;
