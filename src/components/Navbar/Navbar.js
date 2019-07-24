import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo1.png';
import "./Navbar.css";
import styled from 'styled-components';

//components
import {ButtonContainer} from "../Button/Button";

export default class Navbar extends Component {
    render(){
        return(
            <NavRapper className="navbar navbar-expand-sm 
            navbar-dark px-sm-5">
                {/*https://www.iconfinder.com/icons/1243689/call_phone_icon 
                Creative Commons (Attribution 3.0 Unported);
                https://www.iconfinder.com/Makoto_msk*/}

                <Link to="/">
                    <img id="image" src={logo} alt="store"
                    className="navbar-brand" />
                </Link>
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">
                            products
                        </Link>
                    </li>
                </ul>
                <Link to="/card" className="ml-auto">
                    <ButtonContainer>
                        <span className="mr-2">
                        <i className="fas fa-cart-plus"/>
                        </span>
                        My card 
                    </ButtonContainer>
                </Link>
            </NavRapper>
        )
    }
}


const NavRapper = styled.nav`
    background-color: var(--mainBlue);
    .nav-link{
        color: var(mainwhite)!important;
        font-size: 1.3rem;
        text-transform: capitalize;      
    }
`;