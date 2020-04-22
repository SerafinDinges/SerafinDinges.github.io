import React from 'react';
import './Footer.css'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <hr />
                <strong>Data sources:</strong>
                <p>Biggest data source is <a rel="noopener noreferrer" href="https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv" target="_blank">this raw csv sheet</a> compiled by <i>Our World in Data</i>. See full documentation in <a target="_blank" rel="noopener noreferrer" href="https://github.com/owid/covid-19-data/tree/master/public/data">their repo</a>. They in turn get their data from the <a rel="noopener noreferrer" target="_blank" href="https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide"><i>European Centre for Disease Prevention and Control</i></a>.</p>
                <p>Additional data from:</p>
                <ul>
                    <li></li>
                </ul>
            </footer>
        );
    }
}

export default Footer;

