import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import { withRouter } from 'react-router-dom';

class Nav extends Component{

    //Navigates corresponding NavLinks and fetches data accordingly
    render(){
        return(
            <nav className="main-nav">
                <ul>
                    <li><NavLink to="/cats" >Cats</NavLink></li>
                    <li><NavLink to="/dogs" >Dogs</NavLink></li>
                    <li><NavLink to="/birds" >Birds</NavLink></li>
                </ul>
            </nav>
        )
    }
}

export default withRouter(Nav);