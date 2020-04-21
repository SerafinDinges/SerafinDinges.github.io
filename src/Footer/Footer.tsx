import React from 'react';
import './Footer.css'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <hr />
                <strong>Data sources:</strong>
                <p>Biggest raw data source is <a href="https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv" target="_blank">this raw csv sheet</a> compiled by <i>Our World in Data</i>. See full documentation in <a target="_blank" href="https://github.com/owid/covid-19-data/tree/master/public/data">their repo</a>.</p>
            </footer>
        );
    }
}

export default Footer;

