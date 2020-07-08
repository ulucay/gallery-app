import React, { Component } from "react";
import Image from "./Image";
import NotFound from "./NotFound";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import apiKey from "../config";


class Gallery extends Component{

    state={
        images: [],
        searchedValue: ''
    }

    componentDidMount() {
        this.performSearch();
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.topic !== prevProps.match.params.topic) {
            this.performSearch();
        }
    };

    performSearch = ( ) => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.match.params.topic}&content_type=1&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    images: response.data.photos.photo,
                    searchedValue: this.props.match.params.topic,
                })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render(){
        let images;
        if(this.state.images.length > 0 ){
            images = this.state.images.map(img => (
                <Image
                    url={`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
                    key={img.id}
                />
            ))
        }else{
            this.state.images = <NotFound />
        }

        return(
            <div className="photo-container">
                <h2>{ this.state.searchedValue && images ? this.state.searchedValue : ''}</h2>
                <ul>
                    {images ? images : <NotFound />}
                </ul>
            </div>
        )
    }
}

export default withRouter(Gallery);