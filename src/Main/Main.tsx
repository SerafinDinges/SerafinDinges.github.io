import React from 'react';
import './Main.css';
import Graph from "./Graph/Graph";
import DataProvider from "../util/DataProvider";
import { dictionary } from "../util/Dictionary";
import CustomSelect from "../SharedComponents/CustomSelect";

type MyProps = {};
type MyState = {
    compareCountries: any,
    showDataSets: any,
    showComparisons: any,
    sheetData: Array<any>, customData: any,
    perMillion: boolean
};

class Main extends React.Component<MyProps, MyState> {
    DataProvider: DataProvider;
    constructor(props) {
        super(props)
        this.state = {
            sheetData: [],
            customData: { data: [], labels: { dataKeys: [] } },
            compareCountries: ["GBR"],
            showDataSets: ["new_deaths"],
            showComparisons: [],
            perMillion: false
        }
        this.DataProvider = new DataProvider();
        this.processState();
    }
    processState() {
        if (this.state.showDataSets.length > 0 && this.state.compareCountries.length > 0) {
            let dataSets = this.state.showDataSets.slice();
            console.log("dataSets", dataSets.slice());

            if (this.state.perMillion) {
                dataSets.forEach((dataSet, key) => {
                    dataSets[key] += "_per_million";
                });
            }

            console.log("dataSets", dataSets);
            this.DataProvider.getCasesByCountryAndDataset(this.state.compareCountries.slice(), dataSets).then((wrapper) => {
                console.log("before comparison", wrapper, wrapper.data.slice());
                if (this.state.showComparisons.length > 0) {
                    this.DataProvider.getComparisonData(this.state.showComparisons, wrapper).then((wrapper) => {
                        this.setState({
                            customData: wrapper
                        })
                    });
                }
                else {
                    wrapper.data = this.DataProvider.getAverage(wrapper.data, 2);
                    this.setState({
                        customData: wrapper
                    })
                }
            });
        }
    }
    handleChange(result, stateKey) {
        console.log(result, stateKey);

        let newState = {}
        newState[stateKey] = result;

        this.setState(newState, () => this.processState());
    }
    render() {
        return (
            <div className="Main">
                <div className="text">
                    <p>
                        Compare different countries with each other.
                    </p>
                    <h3>Choose countries</h3>
                    <CustomSelect options={dictionary.countries} stateKey="compareCountries" value={this.state.compareCountries[0]} onChange={this.handleChange.bind(this)} />
                    <h3>
                        Choose data <label htmlFor="checkbox_per_million">
                            <input type="checkbox" id="checkbox_per_million" onChange={(e) => {
                                this.handleChange.bind(this)(e.target.checked, "perMillion");
                            }} />
                        per million
                        </label>
                    </h3>

                    <CustomSelect options={dictionary.dataSets} stateKey="showDataSets" value={this.state.showDataSets[0]} onChange={this.handleChange.bind(this)} />
                    <p className="footnote">*uses a three day average to better represent the overall trend</p>

                    <h3>Compare to other data</h3>
                    <CustomSelect options={dictionary.comparisons} stateKey="showComparisons" onChange={this.handleChange.bind(this)} />
                    <p className="footnote">†refers to all types of respiratory deaths, see <a href="https://en.wikipedia.org/wiki/ICD-10_Chapter_X:_Diseases_of_the_respiratory_system">ICD-10 J00-J99</a></p>
                </div>
                <Graph dataWrapper={this.state.customData} type="LineChart" />
            </div>
        );
    }
}

export default Main;

