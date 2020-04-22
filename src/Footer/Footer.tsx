import React from 'react';
import './Footer.css'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <hr />
                <strong>Data sources:</strong>
                <p>Biggest data source is <a rel="noopener noreferrer" href="https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv" target="_blank">this raw csv sheet</a> compiled by <i>Our World in Data</i>. See full documentation in <a target="_blank" rel="noopener noreferrer" href="https://github.com/owid/covid-19-data/tree/master/public/data">their repo</a>. They in turn get their data from the <a rel="noopener noreferrer" target="_blank" href="https://www.ecdc.europa.eu/en/publications-data/download-todays-data-geographic-distribution-covid-19-cases-worldwide"><i>European Centre for Disease Prevention and Control</i></a>.</p>
                <p>Comparison data is aggregate from a variety of sources. You can have a look at the raw data in my manually transpiled, public <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1sAXPISlxdaxPIUAkua6Dxdd5DeWlUQ3fzx6Q9aGzfxY/edit?usp=sharing">Google Sheets document</a>. Specific sources are provided in the sheet notes.</p>
                <p>Additional data</p>
                <ul>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/datasets/weeklyprovisionalfiguresondeathsregisteredinenglandandwales">UK respiratory deaths</a> from the <i>Office for National Statistics</i>
                    </li>
                    {/* <li>
                        <a target="_blank" rel="noopener noreferrer" href=""></a>
                    </li> */}
                </ul>
                <p>Peek at the source code: <a href="https://github.com/SerafinDinges/someta.xyz">https://github.com/SerafinDinges/someta.xyz</a></p>
            </footer>
        );
    }
}

export default Footer;

