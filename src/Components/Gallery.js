import React, { Component } from "react";
import Image from "./Image";
import NotFound from "./NotFound";
import { withRouter } from 'react-router-dom';
import axios from "axios";
import apiKey from "./config";
import Loading from "./Loading";


class Gallery extends Component{

    state={
        images: [],
        searchedValue: '',
        loading: true
    };

    //Calls performSearch upon loading the component
    componentDidMount() {
        this.performSearch();
    };

    //Calls performSearch if url path changes
    componentDidUpdate(prevProps) {
        if (this.props.match.params.topic !== prevProps.match.params.topic) {
            this.performSearch();
        }
    };

    //Fetches the data from API and sets the state accordingly
    performSearch = ( ) => {
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${this.props.match.params.topic}&content_type=1&per_page=24&sort=relevance&format=json&nojsoncallback=1`)
            .then(response => {
                this.setState({
                    images: response.data.photos.photo,
                    searchedValue: this.props.match.params.topic,
                    loading: false
                })
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render(){
        let images;

        //Renders different components and renders the component accordingly
        if(this.state.loading){
            images = <Loading />
        }
        else if(this.state.images.length > 0 ){
            images = this.state.images.map(img => (
                <Image
                    url={`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
                    key={img.id}
                    title={img.title}
                />
            ))
        }
        else{
            images = <NotFound />
        }

        return(
            <div className="photo-container">
                <h2>{ this.state.loading && this.state.loading ? this.state.searchedValue : ''}</h2>
                <ul>
                    {images}
                </ul>
            </div>
        )
    }
}

export default withRouter(Gallery);