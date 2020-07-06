import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './index.css';
import axios from 'axios';
import apiKey from './config';
import Nav from "./Components/Nav";
import Gallery from "./Components/Gallery";
import Search from "./Components/SearchForm";
import NotFound from "./Components/NotFound";

class App extends Component{

    state = {
        pics: [],
        loading: true
    }

    componentDidMount(){
        this.performSearch();
    }

    performSearch = (query = 'cats') => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    pics: response.data.photos.photo,
                    loading: false
                })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }


    render(){
        
        return (
                <BrowserRouter>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" >
                                <Search onSearch={this.performSearch} />
                                <Nav />
                                {
                                    (this.state.loading)
                                        ? <p>Loading...</p>
                                        : <Gallery data={this.state.pics}/>
                                }
                            </Route>
                            
                            <Route exact path="/:query" render={() => (
                                <Search onSearch={this.performSearch} />
                            )} />

                            <Route component={NotFound} />

                        </Switch>
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;
