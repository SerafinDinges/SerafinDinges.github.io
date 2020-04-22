import React from 'react';
import './Main.css';
import Graph from "./Graph/Graph";
import DataProvider from "../util/DataProvider";
import { dictionary } from "../util/Dictionary";

type MyProps = {};
type MyState = {
    compareCountries: any,
    showDataSets: any,
    showComparisons: any,
    sheetData: Array<any>, customData: any
};

class Main extends React.Component<MyProps, MyState> {
    DataProvider: DataProvider;
    constructor(props) {
        super(props)
        this.state = {
            sheetData: [],
            customData: { data: [], labels: { dataKeys: [] } },
            compareCountries: [],
            showDataSets: [],
            showComparisons: []
        }
        this.DataProvider = new DataProvider();
    }
    processState() {
        if (this.state.showDataSets.length > 0 && this.state.compareCountries.length > 0) {
            this.DataProvider.getCasesByCountryAndDataset(this.state.compareCountries, this.state.showDataSets).then((wrapper) => {
                console.log(wrapper);
                if (this.state.showComparisons.length > 0) {
                    this.DataProvider.getComparisonData(this.state.showComparisons, wrapper).then((wrapper) => {
                        this.setState({
                            customData: wrapper
                        })
                    });
                }
                else
                    this.setState({
                        customData: wrapper
                    })
            });
        }
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
    handleChange3(e) {
        let compareTo = this.state.showComparisons;
        if (e.target.checked)
            compareTo = compareTo.concat([e.target.value]);
        else if (compareTo.indexOf(e.target.value) > -1)
            compareTo.splice(compareTo.indexOf(e.target.value), 1);
        this.setState({
            showComparisons: compareTo
        }, () => this.processState());
    }
    render() {
        return (
            <div className="Main">
                <div className="text">
                    <p>
                        Compare different countries with each other.
                </p>
                    <p>
                        <strong>Choose countries</strong>
                        {Object.keys(dictionary.countries).map((key) => {
                            return <label key={key}><input onChange={this.handleChange.bind(this)} type="checkbox" value={key} />{dictionary.countries[key]}</label>;
                        })}
                    </p>
                    <p>
                        <strong>Choose data</strong>
                        {Object.keys(dictionary.dataSets).map(key => {
                            return <label key={key}><input onChange={this.handleChange2.bind(this)} type="checkbox" value={key} />{dictionary.dataSets[key]}</label>;
                        })}
                    </p>
                    <p>
                        <strong>Compare to</strong>
                        {Object.keys(dictionary.comparisons).map(key => {
                            return <label key={key}><input onChange={this.handleChange3.bind(this)} type="checkbox" value={key} />{dictionary.comparisons[key]}</label>;
                        })}
                    </p>
                </div>
                <Graph dataWrapper={this.state.customData} type="LineChart" />
                {/* <Graph data={this.state.sheetData} keys={["uk_total_sum","uk_respiratory_sum"]} type="LineChart"/> */}
            </div>
        );
    }
}

export default Main;

