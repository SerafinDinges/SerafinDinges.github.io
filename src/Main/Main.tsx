import React from 'react';
import './Main.css';
import Graph from "./Graph/Graph";
import DataProvider from "../util/DataProvider";

type MyProps = {};
type MyState = {
    DataProvider: DataProvider,
    compareCountries: any,
    showDataSets: any,
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
        },
        {
            selected: false, value: 'ITA', label: 'Italy'
        }
    ];
    displayOptions = ["total_deaths", "new_deaths", "total_cases", "new_cases","total_cases_per_million","new_cases_per_million","total_deaths_per_million","new_deaths_per_million"];
    constructor(props) {
        super(props)
        this.state = {
            sheetData: [],
            ukDeaths: { data: [], labels: { dataKeys: [] } },
            customDeaths: { data: [], labels: { dataKeys: [] } },
            DataProvider: new DataProvider(),
            compareCountries: [],
            showDataSets: []
        }
    }
    componentDidMount() {
        this.state.DataProvider.getUKDeaths().then((data) => {
            this.setState({
                ukDeaths: data
            });
        });
        // .getSheet("regular_flu_deaths").then((data) => {
        //     console.log("sheetdata", data);

        //     this.setState({
        //         sheetData: data
        //     })
        // });
    }
    processState() {
        if (this.state.showDataSets.length > 0 && this.state.compareCountries.length > 0)
            this.state.DataProvider.getCasesByCountry(this.state.compareCountries).then((data) => {
                let wrapper = data;
                wrapper.labels.dataKeys = [];
                this.state.showDataSets.forEach(dataKey => {
                    this.state.compareCountries.forEach(country => {
                        wrapper.labels.dataKeys.push(country + "_" + dataKey);
                    })
                });
                wrapper.labels.dataKeys.sort();
                console.log(wrapper);

                this.setState({
                    customDeaths: wrapper
                })
            });
    }
    handleChange(e) {
        let countries = this.state.compareCountries;
        if (e.target.checked)
            countries = countries.concat([e.target.value]);
        else if (countries.indexOf(e.target.value) > -1)
            countries.splice(countries.indexOf(e.target.value), 1);

        this.setState({
            compareCountries: countries
        }, () => this.processState());
    }
    handleChange2(e) {
        let dataSets = this.state.showDataSets;
        if (e.target.checked)
            dataSets = dataSets.concat([e.target.value]);
        else if (dataSets.indexOf(e.target.value) > -1)
            dataSets.splice(dataSets.indexOf(e.target.value), 1);
        this.setState({
            showDataSets: dataSets
        }, () => this.processState());
    }
    render() {
        return (
            <div className="Main">
                <p>
                    Compare different countries with each other.
                </p>
                <p>
                    <strong>Choose countries</strong>
                    {this.countryOptions.map(el => {
                        return <label key={el.value}><input onChange={this.handleChange.bind(this)} type="checkbox" value={el.value} />{el.label}</label>;
                    })}
                </p>
                <p>
                    <strong>Choose data</strong>
                    {this.displayOptions.map(el => {
                        return <label key={el}><input onChange={this.handleChange2.bind(this)} type="checkbox" value={el} />{el}</label>;
                    })}
                </p>
                <Graph dataWrapper={this.state.customDeaths} type="LineChart" />
                {/* <Graph data={this.state.sheetData} keys={["uk_total_sum","uk_respiratory_sum"]} type="LineChart"/> */}
            </div>
        );
    }
}

export default Main;

