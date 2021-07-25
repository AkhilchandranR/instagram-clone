import React from 'react'
import logo from './logo.png';
import './Header.css';
import { Button } from '@material-ui/core';

function Header() {
    return (
        <div className="app__header">
            <img src={logo} alt="instagram logo"/>
            <Button>Sign Up</Button>
        </div>
    )
}

export default Header
