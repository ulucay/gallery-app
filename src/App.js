import React,{ Component } from 'react';
import './index.css';
import axios from 'axios';
import apiKey from './config';
import Nav from "./Components/Nav";
import Gallery from "./Components/Gallery";
import Search from "./Components/SearchForm";

class App extends Component{

    state = {
        pics: [],
        loading: true
    }

    componentDidMount(){
        this.performSearch();
    }

    performSearch = (query = 'cats')=> {
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
        console.log(this.state.pics);
        return (
            <div className="container">
                <Search onSearch={this.performSearch} />
                <Nav />
                {
                    (this.state.loading)
                    ? <p>Loading...</p>
                    : <Gallery data={this.state.pics}/>
                }
            </div>
        );
    }
}

export default App;
