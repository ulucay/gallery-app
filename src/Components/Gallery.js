import React from "react";
import Image from "./Image";
import NotFound from "./NotFound";
import { withRouter } from 'react-router-dom';

const Gallery = (props) => {

    const results = props.data;
    let images;

    if(results.length > 0 ){
        images = results.map(img => (
            <Image
                url={`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
                key={img.id}
            />
        ))
    }else{
        images = <NotFound />
    }

    
    return(
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {images}
            </ul>
        </div>
    )

}

export default withRouter(Gallery);