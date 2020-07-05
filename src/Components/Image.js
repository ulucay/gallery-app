import React, {Component} from "react";

const Image = (props) => {
        return(
            <li>
                <img src={props.url} />
            </li>
        )
}

export default Image;