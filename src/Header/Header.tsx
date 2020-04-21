import React from 'react';
import './Header.css'

class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>someta.xyz</h1>
                <p>A tool to investigate data relating but not exclusive to Covid-19.</p>
                <p><i>by <a target="_blank" href="http://serafin.tv">Serafin Dinges</a></i></p>
            </header>
        );
    }
}

export default Header;

