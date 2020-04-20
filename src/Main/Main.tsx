import React from 'react';
import './Main.css';
import Graph from "./Graph/Graph";
import DataProvider from "../util/DataProvider";

type MyProps = {};
type MyState = {
    DataProvider: DataProvider,
    compareCountries: any,
    sheetData: Array<any>, customDeaths: any, ukDeaths: {
        data: Array<any>,
        labels: any
    }
};

class Main extends React.Component<MyProps, MyState> {
    countryOptions = [
        {
            selected: false, value: 'USA', label: 'USA'
        },
        {
            selected: false, value: 'GBR', label: 'United Kingdom'
        },
        {
            selected: false, value: 'DEU', label: 'Germany'
        },
        {
            selected: false, value: 'JPN', label: 'Japan'
        },
        {
            selected: false, value: 'AUT', label: 'Austria'
        }
    ];
    constructor(props) {
        super(props)
        this.state = {
            sheetData: [],
            ukDeaths: { data: [], labels: { dataKeys: [] } },
            customDeaths: { data: [], labels: { dataKeys: [] } },
            DataProvider: new DataProvider(),
            compareCountries: []
        }
    }
    componentDidMount() {
        this.state.DataProvider.getUKDeaths().then((data) => {
            this.setState({
                ukDeaths: data
            })
        });
        // .getSheet("regular_flu_deaths").then((data) => {
        //     console.log("sheetdata", data);

        //     this.setState({
        //         sheetData: data
        //     })
        // });
    }
    handleChange(e) {
        console.log(e.target);
        let countries = this.state.compareCountries.concat(e.target.value);

        this.setState({
            compareCountries: countries
        });

        this.state.DataProvider.getCasesByCountry(countries).then((data) => {
            console.log(data);
            this.setState({
                customDeaths: data
            })
        });
    }
    render() {
        return (
            <div className="Main">
                <p>
                    Compare different countries with each other.
                </p>
                <select value={this.state.compareCountries}
                    onChange={this.handleChange.bind(this)}
                    multiple={true}
                >
                    <option value="">Choose</option>
                    {this.countryOptions.map(el => {
                        return <option key={el.value} value={el.value}>{el.label}</option>
                    })}
                </select>
                <Graph dataWrapper={this.state.customDeaths} type="LineChart" />
                {/* <Graph data={this.state.sheetData} keys={["uk_total_sum","uk_respiratory_sum"]} type="LineChart"/> */}
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo nisi inventore voluptates accusantium, quam beatae obcaecati ex ab quasi? Nobis earum nulla impedit hic quae, corporis eaque voluptate qui culpa.
                </p>
                <Graph dataWrapper={this.state.ukDeaths} type="LineChart" />
            </div>
        );
    }
}

export default Main;

